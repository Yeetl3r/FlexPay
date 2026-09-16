"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '@/lib/utils'
interface CashFlowChartProps { data: { month: number; year: number; income: number; essentialExpense: number; businessExpense: number; }[] }
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
export default function CashFlowChart({ data }: CashFlowChartProps) {
  const chartData = data.map(d => ({ name: `${monthNames[d.month - 1]} ${d.year}`, Income: d.income, Expenses: d.essentialExpense + d.businessExpense, }))
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
          <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value: number) => formatCurrency(value)} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="Income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
          <Bar dataKey="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
