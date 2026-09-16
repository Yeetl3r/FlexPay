import { getBorrowerDashboardData } from "@/app/actions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award, ShieldAlert, TrendingUp } from "lucide-react"

export default async function CoachPage() {
  const { profile } = await getBorrowerDashboardData()
  const xp = profile.xpPoints;
  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Financial Coach</h1>
        <p className="text-slate-500 mt-2">Learn, earn XP, and unlock better loan terms through good financial habits.</p>
      </div>

      <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <CardContent className="p-8 flex items-center justify-between">
          <div>
            <p className="text-slate-400 font-medium">Current Status</p>
            <h2 className="text-4xl font-bold mt-1">Level {level} Earner</h2>
            <p className="text-sm text-slate-300 mt-2">{100 - progress} XP to next level</p>
          </div>
          <div className="w-1/2">
            <div className="flex justify-between text-sm font-medium mb-2"><span>{xp} XP</span><span>Level {level + 1}</span></div>
            <Progress value={progress} indicatorColor="bg-emerald-400" className="bg-slate-700" />
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card><CardHeader><div className="flex gap-2 items-center"><ShieldAlert className="w-5 h-5 text-amber-500"/><CardTitle>Lesson: Emergency Buffers</CardTitle></div></CardHeader><CardContent><p className="text-sm text-slate-500 mb-4">You spent $30 on discretionary expenses this week. Saving $10 of that amount could increase your emergency buffer.</p><button className="text-primary text-sm font-bold">Start Lesson (+20 XP)</button></CardContent></Card>
        <Card><CardHeader><div className="flex gap-2 items-center"><TrendingUp className="w-5 h-5 text-blue-500"/><CardTitle>Lesson: Interest Mechanics</CardTitle></div></CardHeader><CardContent><p className="text-sm text-slate-500 mb-4">What happens if you pay $5 extra each month? See the simulation.</p><button className="text-primary text-sm font-bold">Start Lesson (+15 XP)</button></CardContent></Card>
      </div>

      <h3 className="text-xl font-bold mt-8 mb-4">Earned Badges</h3>
      <div className="flex gap-4">
        <div className="flex flex-col items-center p-4 bg-emerald-50 text-emerald-700 rounded-2xl w-32 text-center border border-emerald-100"><Award className="w-8 h-8 mb-2"/><span className="text-xs font-bold">First Payment</span></div>
        <div className="flex flex-col items-center p-4 bg-blue-50 text-blue-700 rounded-2xl w-32 text-center border border-blue-100"><ShieldAlert className="w-8 h-8 mb-2"/><span className="text-xs font-bold">Buffer Saver</span></div>
      </div>
    </div>
  )
}
