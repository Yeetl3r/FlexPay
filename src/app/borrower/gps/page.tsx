import { getBorrowerDashboardData, runOptimiserSimulation } from "@/app/actions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Map, MapPin, CheckCircle2 } from "lucide-react"

export default async function GPSPage() {
  const { loan } = await getBorrowerDashboardData()
  if (!loan) return null
  const result = await runOptimiserSimulation(loan.id)

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Repayment GPS</h1>
        <p className="text-slate-500 mt-2">Your turn-by-turn route to becoming debt-free without financial stress.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full text-primary"><Map className="w-6 h-6" /></div>
            <div>
              <CardTitle>Current Route</CardTitle>
              <CardDescription>Optimized path based on predicted income</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pb-4">
            {result.schedule.map((item, i) => (
              <div key={i} className="relative pl-8">
                <span className="absolute -left-3 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white border-2 border-primary">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </span>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-slate-900">Month {item.month}/{item.year}</h4>
                    <p className="text-sm text-slate-500 mt-1">{item.reason}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-slate-900">${item.flexibleAmount.toFixed(0)}</div>
                    {item.flexibleAmount < item.fixedAmount && (
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Detour Active</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="relative pl-8 pt-4">
              <span className="absolute -left-[14px] top-4 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <h4 className="font-bold text-slate-900 text-lg">Destination: Debt Free</h4>
              <p className="text-sm text-slate-500">Based on this route, you will complete repayment safely.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
