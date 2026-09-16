import { getBorrowerDashboardData } from "@/app/actions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { calculateStressScore, getStressZone } from "@/lib/stress"
import dynamic from "next/dynamic"
import { Wallet, AlertTriangle, ShieldCheck, CalendarClock } from "lucide-react"

const CashFlowChart = dynamic(() => import("@/components/dashboard/CashFlowChart"), { ssr: false })

export default async function BorrowerDashboard() {
  const { profile, loan, historicalCashflows, lifeEvents } = await getBorrowerDashboardData()
  if (!loan) return <div>No active loan found.</div>

  const sortedCashflows = [...historicalCashflows].sort((a, b) => (b.year * 12 + b.month) - (a.year * 12 + a.month))
  const currentMonth = sortedCashflows[0]
  const prevMonth = sortedCashflows[1]
  let stressScore = profile.financialStress
  if (currentMonth && prevMonth) {
    const totalDebt = currentMonth.otherDebtPayment + loan.fixedPayment
    stressScore = calculateStressScore({
      currentIncome: currentMonth.income, previousIncome: prevMonth.income,
      currentExpense: currentMonth.essentialExpense + currentMonth.businessExpense, previousExpense: prevMonth.essentialExpense + prevMonth.businessExpense,
      missedPayments: 0, debtToIncomeRatio: totalDebt / (currentMonth.income || 1)
    })
  }
  const stressZone = getStressZone(stressScore)

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, {profile.occupation}</h1>
        <p className="text-slate-500 mt-2">Here is your financial overview and repayment status.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card><CardContent className="p-6"><div className="flex items-center justify-between space-y-0 pb-2"><p className="text-sm font-medium text-slate-600">Total Loan Balance</p><Wallet className="w-4 h-4 text-slate-400" /></div><div className="text-2xl font-bold text-slate-900">{formatCurrency(loan.remainingBalance)}</div><p className="text-xs text-slate-500 mt-1">Matures {loan.maturityDate.toISOString().split('T')[0]}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center justify-between space-y-0 pb-2"><p className="text-sm font-medium text-slate-600">Fixed Next Payment</p><CalendarClock className="w-4 h-4 text-slate-400" /></div><div className="text-2xl font-bold text-slate-900">{formatCurrency(loan.fixedPayment)}</div><p className="text-xs text-primary font-medium mt-1 cursor-pointer hover:underline">See flexible options</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center justify-between space-y-0 pb-2"><p className="text-sm font-medium text-slate-600">Financial Stress</p><AlertTriangle className="w-4 h-4 text-slate-400" /></div><div className="flex items-center gap-3 mt-1"><span className="text-2xl font-bold text-slate-900">{stressScore}/100</span><Badge variant={stressZone === 'GREEN' ? 'success' : stressZone === 'YELLOW' ? 'warning' : 'danger'}>{stressZone}</Badge></div><p className="text-xs text-slate-500 mt-1">Based on recent cash flow</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center justify-between space-y-0 pb-2"><p className="text-sm font-medium text-slate-600">Emergency Buffer</p><ShieldCheck className="w-4 h-4 text-emerald-500" /></div><div className="text-2xl font-bold text-slate-900">{formatCurrency(profile.emergencyBuffer)}</div><p className="text-xs text-slate-500 mt-1">Protected minimum cash</p></CardContent></Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Historical Cash Flow</CardTitle><CardDescription>Your income vs expenses over the last 12 months</CardDescription></CardHeader><CardContent><CashFlowChart data={historicalCashflows} /></CardContent></Card>
        <div className="space-y-6">
          <Card><CardHeader><CardTitle>Recent Life Events</CardTitle><CardDescription>Impacts on your repayment</CardDescription></CardHeader><CardContent className="space-y-4">
              {lifeEvents.length === 0 ? (<p className="text-sm text-slate-500">No recent events.</p>) : (
                lifeEvents.map(event => (
                  <div key={event.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex justify-between items-start mb-2"><span className="text-sm font-semibold text-slate-900">{event.type.replace('_', ' ')}</span><Badge variant={event.status === 'APPROVED' ? 'success' : 'secondary'}>{event.status}</Badge></div>
                    <p className="text-xs text-slate-500 mb-2">{event.description}</p>
                    <div className="text-xs font-medium text-primary bg-primary/10 p-2 rounded-lg">{event.suggestedAction}</div>
                  </div>
                ))
              )}
            </CardContent></Card>
        </div>
      </div>
    </div>
  )
}
