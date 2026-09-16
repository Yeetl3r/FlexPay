'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { predictFutureCashflow } from '@/lib/prediction'
import { generateFlexibleSchedule } from '@/lib/optimiser'

export async function loginDemoUser(email: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error("User not found")
  cookies().set('flexpay_session', user.id, { httpOnly: true, path: '/' })
  if (user.role === 'BORROWER') redirect('/borrower')
  if (user.role === 'LENDER') redirect('/lender')
  if (user.role === 'ADMIN') redirect('/admin')
}
export async function logout() {
  cookies().delete('flexpay_session')
  redirect('/')
}
export async function getCurrentUser() {
  const userId = cookies().get('flexpay_session')?.value
  if (!userId) return null
  return await prisma.user.findUnique({ where: { id: userId }, include: { borrowerProfile: true } })
}
export async function getBorrowerDashboardData() {
  const user = await getCurrentUser()
  if (!user || !user.borrowerProfile) throw new Error("Unauthorized or not a borrower")
  const profileId = user.borrowerProfile.id
  const [loan, historicalCashflows, lifeEvents] = await Promise.all([
    prisma.loan.findFirst({ where: { borrowerId: profileId, status: 'ACTIVE' } }),
    prisma.cashflowRecord.findMany({ where: { borrowerId: profileId, isPredicted: false }, orderBy: [{ year: 'asc' }, { month: 'asc' }] }),
    prisma.lifeEvent.findMany({ where: { borrowerId: profileId }, orderBy: { date: 'desc' } })
  ])
  return { profile: user.borrowerProfile, loan, historicalCashflows, lifeEvents }
}
export async function runOptimiserSimulation(loanId: string) {
  const loan = await prisma.loan.findUnique({ where: { id: loanId }, include: { borrower: { include: { cashflows: true } } } })
  if (!loan) throw new Error("Loan not found")
  const history = loan.borrower.cashflows.filter(c => !c.isPredicted)
  const today = new Date()
  const startMonth = today.getMonth() + 2 > 12 ? 1 : today.getMonth() + 2
  const startYear = today.getMonth() + 2 > 12 ? today.getFullYear() + 1 : today.getFullYear()
  const predictedCashflows = predictFutureCashflow(history, startMonth, startYear)
  return generateFlexibleSchedule({
    remainingBalance: loan.remainingBalance, fixedMonthlyPayment: loan.fixedPayment,
    cashflows: predictedCashflows, alpha: 0.30, emergencyBuffer: loan.borrower.emergencyBuffer
  })
}
export async function declareLifeEvent(formData: FormData) {
  const user = await getCurrentUser()
  if (!user || !user.borrowerProfile) throw new Error("Unauthorized")
  const type = formData.get('type') as string
  const description = formData.get('description') as string
  let suggestedAction = "Under review by loan officer."
  if (type === 'NATURAL_DISASTER' || type === 'MEDICAL') {
    suggestedAction = "Auto-approved: Payment paused for 1 month to preserve emergency buffer."
  }
  await prisma.lifeEvent.create({ data: { borrowerId: user.borrowerProfile.id, type, description, date: new Date(), status: 'PENDING', suggestedAction } })
  redirect('/borrower/events')
}
