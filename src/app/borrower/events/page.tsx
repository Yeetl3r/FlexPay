import { getBorrowerDashboardData, declareLifeEvent } from "@/app/actions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function EventsPage() {
  const { lifeEvents } = await getBorrowerDashboardData()

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Life Events</h1>
        <p className="text-slate-500 mt-2">Declare emergencies or income interruptions to automatically adjust your repayment route.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Declare New Event</CardTitle><CardDescription>This will be reviewed by the AI optimiser and a human loan officer.</CardDescription></CardHeader>
        <CardContent>
          <form action={declareLifeEvent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Event Type</label>
              <select name="type" className="w-full rounded-xl border-slate-200 p-3 text-sm focus:ring-primary focus:border-primary border">
                <option value="MEDICAL">Medical Emergency</option>
                <option value="NATURAL_DISASTER">Natural Disaster / Weather</option>
                <option value="JOB_LOSS">Job Loss / Income Stop</option>
                <option value="FAMILY_EMERGENCY">Family Emergency</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea name="description" rows={3} className="w-full rounded-xl border-slate-200 p-3 text-sm border focus:ring-primary focus:border-primary" placeholder="Briefly describe what happened..." required />
            </div>
            <Button type="submit" className="w-full">Submit Event</Button>
          </form>
        </CardContent>
      </Card>
      
      <h3 className="text-xl font-bold mt-8 mb-4">Past Declarations</h3>
      <div className="space-y-4">
        {lifeEvents.map(e => (
          <Card key={e.id}><CardContent className="p-4 flex justify-between items-center">
            <div><p className="font-semibold">{e.type.replace('_', ' ')}</p><p className="text-sm text-slate-500">{new Date(e.date).toLocaleDateString()}</p></div>
            <div className="text-right"><span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded-full">{e.status}</span></div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  )
}
