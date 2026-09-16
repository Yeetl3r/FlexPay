import { ReactNode } from "react"
import { LogOut, PieChart, Users, Leaf } from "lucide-react"
import { logout } from "@/app/actions"

export default function LenderLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <header className="h-16 bg-slate-900 text-white flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-2"><Leaf className="w-5 h-5 text-emerald-400"/><span className="font-bold text-lg">FlexPay Lender Portal</span></div>
        <div className="flex gap-6 items-center text-sm font-medium">
          <span className="flex items-center gap-2 text-emerald-400"><PieChart className="w-4 h-4"/> Portfolio</span>
          <span className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer"><Users className="w-4 h-4"/> Borrowers</span>
          <form action={logout}><button className="text-slate-400 hover:text-white flex items-center gap-2 ml-4"><LogOut className="w-4 h-4"/> Sign Out</button></form>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  )
}
