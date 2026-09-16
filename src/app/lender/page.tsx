import { prisma } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

export default async function LenderDashboard() {
  const loans = await prisma.loan.findMany({ include: { borrower: { include: { user: true } } } })
  const totalOutstanding = loans.reduce((sum, l) => sum + l.remainingBalance, 0)
  
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Portfolio Overview</h1>
        <p className="text-slate-500 mt-2">Aggregate risk and flexible repayment performance.</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Total Outstanding</p><p className="text-2xl font-bold mt-1">{formatCurrency(totalOutstanding)}</p></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Active Loans</p><p className="text-2xl font-bold mt-1">{loans.length}</p></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Portfolio Stress Index</p><p className="text-2xl font-bold mt-1 text-emerald-600">Low (22/100)</p></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Predicted Defaults</p><p className="text-2xl font-bold mt-1 text-emerald-600">0%</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Borrower Portfolio</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Borrower</th>
                <th className="px-4 py-3">Occupation</th>
                <th className="px-4 py-3">Balance</th>
                <th className="px-4 py-3">Stress Score</th>
                <th className="px-4 py-3 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {loans.map(loan => (
                <tr key={loan.id} className="border-b last:border-0 hover:bg-slate-50">
                  <td className="px-4 py-4 font-medium">{loan.borrower.user.name}</td>
                  <td className="px-4 py-4 text-slate-500">{loan.borrower.occupation}</td>
                  <td className="px-4 py-4 font-bold">{formatCurrency(loan.remainingBalance)}</td>
                  <td className="px-4 py-4">
                    <Badge variant={loan.borrower.financialStress > 40 ? 'warning' : 'success'}>
                      {loan.borrower.financialStress}/100
                    </Badge>
                  </td>
                  <td className="px-4 py-4"><button className="text-primary hover:underline font-medium">View AI Profile</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
