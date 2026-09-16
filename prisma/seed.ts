import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  console.log("Seeding database...")
  await prisma.lifeEvent.deleteMany(); await prisma.repaymentSchedule.deleteMany();
  await prisma.cashflowRecord.deleteMany(); await prisma.loan.deleteMany();
  await prisma.borrowerProfile.deleteMany(); await prisma.user.deleteMany();

  await prisma.user.create({ data: { email: 'admin@flexpay.com', password: 'password123', name: 'System Admin', role: 'ADMIN' } })
  await prisma.user.create({ data: { email: 'lender@flexpay.com', password: 'password123', name: 'Global Finance Co.', role: 'LENDER' } })

  const farmerUser = await prisma.user.create({
    data: {
      email: 'farmer@flexpay.com', password: 'password123', name: 'Farmer A (Demo)', role: 'BORROWER',
      borrowerProfile: { create: { occupation: 'Farmer', location: 'Rural District 4', ageRange: '35-45', emergencyBuffer: 100.0, financialStress: 45, xpPoints: 120 } }
    },
    include: { borrowerProfile: true }
  })

  const farmerIncome = [300, 280, 250, 220, 180, 150, 140, 200, 450, 900, 700, 400]
  const farmerExpense = [200, 210, 220, 250, 260, 250, 230, 240, 280, 350, 300, 240]
  const borrowerId = farmerUser.borrowerProfile!.id

  for (let month = 1; month <= 12; month++) {
    await prisma.cashflowRecord.create({ data: { borrowerId, month, year: 2023, income: farmerIncome[month - 1] * 0.95, essentialExpense: farmerExpense[month - 1] * 0.9, businessExpense: farmerExpense[month - 1] * 0.1, otherDebtPayment: 10, isPredicted: false } })
  }
  for (let month = 1; month <= 12; month++) {
    await prisma.cashflowRecord.create({ data: { borrowerId, month, year: 2024, income: farmerIncome[month - 1], essentialExpense: farmerExpense[month - 1] * 0.85, businessExpense: farmerExpense[month - 1] * 0.15, otherDebtPayment: 10, isPredicted: true } })
  }

  const farmerLoan = await prisma.loan.create({ data: { borrowerId, principal: 600, interestRate: 0.10, remainingBalance: 660, fixedPayment: 55, startDate: new Date('2024-05-01'), maturityDate: new Date('2025-04-30'), status: 'ACTIVE' } })

  const flexSchedule = [
    { m: 6, a: 20, reason: "Predicted income is low ($150). Preserving emergency buffer." },
    { m: 7, a: 20, reason: "Predicted income is lowest ($140). Preserving emergency buffer." },
    { m: 8, a: 30, reason: "Income starting to recover, but expenses remain high." },
    { m: 9, a: 50, reason: "Harvest season approaching. Capacity improving." },
    { m: 10, a: 100, reason: "Strong income period predicted ($900). Safe to pay extra." },
    { m: 11, a: 100, reason: "Continued strong income. Accelerating repayment." },
    { m: 12, a: 70, reason: "Moderate income. Reverting closer to baseline." }
  ]
  for (const item of flexSchedule) {
    await prisma.repaymentSchedule.create({ data: { loanId: farmerLoan.id, month: item.m, year: 2024, expectedDate: new Date(`2024-${item.m.toString().padStart(2, '0')}-05`), fixedAmount: 55, flexibleAmount: item.a, status: item.m < 9 ? (item.m === 6 || item.m === 7 ? 'PAID' : 'PENDING') : 'PENDING', reason: item.reason } })
  }

  await prisma.lifeEvent.create({ data: { borrowerId, type: 'NATURAL_DISASTER', date: new Date('2024-07-15'), description: 'Minor flooding damaged partial harvest of secondary crops.', status: 'APPROVED', suggestedAction: 'Reduced August payment to $30 (originally $55).' } })

  const vendorUser = await prisma.user.create({
    data: {
      email: 'vendor@flexpay.com', password: 'password123', name: 'Vendor B (Demo)', role: 'BORROWER',
      borrowerProfile: { create: { occupation: 'Street Vendor', location: 'Urban District 1', ageRange: '25-35', emergencyBuffer: 50.0, financialStress: 25, xpPoints: 340 } }
    },
    include: { borrowerProfile: true }
  })
  for (let month = 1; month <= 12; month++) {
    await prisma.cashflowRecord.create({ data: { borrowerId: vendorUser.borrowerProfile!.id, month, year: 2024, income: 400 + Math.random() * 50, essentialExpense: 200, businessExpense: 100, otherDebtPayment: 0, isPredicted: true } })
  }
  await prisma.loan.create({ data: { borrowerId: vendorUser.borrowerProfile!.id, principal: 300, interestRate: 0.12, remainingBalance: 336, fixedPayment: 28, startDate: new Date('2024-01-01'), maturityDate: new Date('2024-12-31'), status: 'ACTIVE' } })
  console.log("Database seeded successfully!")
}
main().catch(e => { console.error(e); process.exit(1) }).finally(async () => { await prisma.$disconnect() })
