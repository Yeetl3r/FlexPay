import { ReactNode } from "react"
import Link from "next/link"
import { logout } from "@/app/actions"
import { LayoutDashboard, Settings2, Map, Activity, LifeBuoy, Award, LogOut, Leaf } from "lucide-react"

export default function BorrowerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Leaf className="w-6 h-6 text-primary mr-2" />
          <span className="text-xl font-bold text-slate-900">FlexPay</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <NavItem href="/borrower" icon={<LayoutDashboard />} label="Dashboard" />
          <NavItem href="/borrower/optimiser" icon={<Settings2 />} label="Repayment Optimiser" />
          <NavItem href="/borrower/gps" icon={<Map />} label="Repayment GPS" />
          <NavItem href="/borrower/events" icon={<LifeBuoy />} label="Life Events" />
          <NavItem href="/borrower/consolidation" icon={<Activity />} label="Consolidation" />
          <NavItem href="/borrower/coach" icon={<Award />} label="Financial Coach" />
        </nav>
        <div className="p-4 border-t border-slate-100">
          <form action={logout}>
            <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"><LogOut className="w-5 h-5 mr-3 text-slate-400" />Sign Out</button>
          </form>
        </div>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-end px-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">B</div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  )
}
function NavItem({ href, icon, label }: { href: string, icon: ReactNode, label: string }) {
  return ( <Link href={href} className="flex items-center px-3 py-2.5 text-sm font-medium rounded-xl text-slate-700 hover:bg-primary/5 hover:text-primary transition-colors group"><span className="w-5 h-5 mr-3 text-slate-400 group-hover:text-primary">{icon}</span>{label}</Link> )
}
