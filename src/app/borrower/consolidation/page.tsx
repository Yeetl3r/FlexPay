import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Layers } from "lucide-react"

export default function ConsolidationPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Auto Consolidation <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full ml-2">SIMULATION</span></h1>
        <p className="text-slate-500 mt-2">See how merging multiple debts into one flexible payment could improve your cash flow.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-dashed border-2">
          <CardHeader><CardTitle>Current Situation (3 Loans)</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between border-b pb-2"><span>Agri-Loan (Due 5th)</span><span className="font-bold">$55</span></div>
            <div className="flex justify-between border-b pb-2"><span>Tractor EMI (Due 12th)</span><span className="font-bold">$40</span></div>
            <div className="flex justify-between border-b pb-2"><span>Micro-credit (Due 20th)</span><span className="font-bold">$25</span></div>
            <div className="flex justify-between text-red-600 font-bold pt-2"><span>Total Monthly Burden</span><span>$120</span></div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader><div className="flex gap-2 items-center"><Layers className="w-5 h-5 text-primary"/><CardTitle>Proposed FlexPay Consolidation</CardTitle></div></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between border-b border-primary/10 pb-2"><span>Single Monthly Payment</span><span className="font-bold text-primary">Flexible Window (1st - 15th)</span></div>
            <div className="flex justify-between border-b border-primary/10 pb-2"><span>Base Payment</span><span className="font-bold">$85</span></div>
            <div className="flex justify-between border-b border-primary/10 pb-2"><span>Catch-up (High Income Months)</span><span className="font-bold">Up to $150</span></div>
            <div className="flex justify-between text-emerald-600 font-bold pt-2"><span>Cash Flow Freed Up</span><span>$35 / month</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
