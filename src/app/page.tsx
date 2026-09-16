import { loginDemoUser } from "@/app/actions";
import { ArrowRight, Leaf, ShieldCheck, Wallet } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="flex items-center justify-center gap-3 text-primary mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl"><Leaf className="w-10 h-10" /></div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900">FlexPay</h1>
        </div>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">AI-Powered Occupation-Aware Flexible Loan Repayment System. Matching debt obligations to real human cash flow.</p>
        <div className="grid sm:grid-cols-3 gap-6 pt-8 pb-12">
          <div className="flex flex-col items-center gap-2 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <Wallet className="w-8 h-8 text-emerald-500" /><h3 className="font-semibold text-slate-900">Flexible Payments</h3><p className="text-sm text-slate-500 text-center">Pay less during low-income periods, catch up later.</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <ShieldCheck className="w-8 h-8 text-blue-500" /><h3 className="font-semibold text-slate-900">Explainable AI</h3><p className="text-sm text-slate-500 text-center">Transparent calculations. No black-box rejections.</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <Leaf className="w-8 h-8 text-amber-500" /><h3 className="font-semibold text-slate-900">Financial Stress GPS</h3><p className="text-sm text-slate-500 text-center">Predicts cash crunches before they happen.</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Select Demo Persona</h2>
          <div className="space-y-4">
            <form action={async () => { 'use server'; await loginDemoUser('farmer@flexpay.com') }}><button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-primary/5 hover:border-primary/20 border border-slate-200 transition-all group"><div className="text-left"><div className="font-semibold text-slate-900">Borrower: Farmer A</div><div className="text-sm text-slate-500">Highly seasonal income</div></div><ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" /></button></form>
            <form action={async () => { 'use server'; await loginDemoUser('vendor@flexpay.com') }}><button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-primary/5 hover:border-primary/20 border border-slate-200 transition-all group"><div className="text-left"><div className="font-semibold text-slate-900">Borrower: Vendor B</div><div className="text-sm text-slate-500">Steady low income</div></div><ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" /></button></form>
            <form action={async () => { 'use server'; await loginDemoUser('lender@flexpay.com') }}><button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all group mt-6"><div className="text-left"><div className="font-semibold">Lender Dashboard</div><div className="text-sm text-slate-300">Portfolio & Risk Analytics</div></div><ArrowRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" /></button></form>
          </div>
        </div>
      </div>
    </div>
  );
}
