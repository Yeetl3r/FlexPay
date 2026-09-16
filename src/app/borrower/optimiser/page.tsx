import { getBorrowerDashboardData, runOptimiserSimulation } from "@/app/actions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { Info } from "lucide-react"

export default async function OptimiserPage() {
  const { loan } = await getBorrowerDashboardData()
  if (!loan) return <div>No active loan found.</div>

  const result = await runOptimiserSimulation(loan.id)

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Repayment Optimiser</h1>
        <p className="text-slate-500 mt-2">Compare your fixed schedule with an AI-optimized flexible plan based on your predicted cash flow.</p>
      </div>

      {!result.canRepayInTime && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3 text-red-800">
          <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold">Repayment Risk Detected</h4>
            <p className="text-sm mt-1">{result.message}</p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Schedule Comparison</CardTitle>
          <CardDescription>Predicted over the next {result.schedule.length} months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Month</th>
                  <th className="px-4 py-3">Fixed Plan</th>
                  <th className="px-4 py-3">Flexible Plan</th>
                  <th className="px-4 py-3">Difference</th>
                  <th className="px-4 py-3 rounded-tr-lg">AI Reasoning</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((item, i) => {
                  const diff = item.flexibleAmount - item.fixedAmount;
                  return (
                    <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                      <td className="px-4 py-4 font-medium">{item.month}/{item.year}</td>
                      <td className="px-4 py-4 text-slate-500">{formatCurrency(item.fixedAmount)}</td>
                      <td className="px-4 py-4 font-bold">{formatCurrency(item.flexibleAmount)}</td>
                      <td className="px-4 py-4">
                        {diff < 0 ? (
                          <Badge variant="success">Saved {formatCurrency(Math.abs(diff))}</Badge>
                        ) : diff > 0 ? (
                          <Badge variant="warning">Catch-up +{formatCurrency(diff)}</Badge>
                        ) : (
                          <span className="text-slate-400">Match</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-600 max-w-xs">{item.reason}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
