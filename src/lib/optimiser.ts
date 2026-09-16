import { PredictedRecord } from "./prediction";
export interface OptimiserInput { remainingBalance: number; fixedMonthlyPayment: number; cashflows: PredictedRecord[]; alpha?: number; emergencyBuffer: number; }
export interface OptimizedPayment { month: number; year: number; fixedAmount: number; flexibleAmount: number; safeCapacity: number; reason: string; }
export interface OptimiserResult { schedule: OptimizedPayment[]; canRepayInTime: boolean; totalCapacity: number; message: string; }
export function generateFlexibleSchedule(input: OptimiserInput): OptimiserResult {
  const { remainingBalance, fixedMonthlyPayment, cashflows, alpha = 0.30, emergencyBuffer } = input;
  let totalCapacity = 0;
  const capacities = cashflows.map(cf => {
    const capacity = Math.max(0, (alpha * cf.disposableCash) - emergencyBuffer);
    totalCapacity += capacity; return { ...cf, capacity };
  });
  const canRepayInTime = totalCapacity >= remainingBalance;
  const schedule: OptimizedPayment[] = [];
  let balanceToDistribute = remainingBalance;
  for (let i = 0; i < capacities.length; i++) {
    const cf = capacities[i];
    let flexibleAmount = 0;
    if (!canRepayInTime) { flexibleAmount = cf.capacity; } 
    else { const proportion = cf.capacity / totalCapacity; flexibleAmount = remainingBalance * proportion; }
    flexibleAmount = Math.min(flexibleAmount, balanceToDistribute);
    balanceToDistribute -= flexibleAmount;
    let reason = "";
    if (flexibleAmount < 10) { reason = `Payment paused. Predicted disposable income is too low to maintain your $${emergencyBuffer} emergency buffer.`; } 
    else if (flexibleAmount < fixedMonthlyPayment * 0.8) { reason = `Payment reduced by $${(fixedMonthlyPayment - flexibleAmount).toFixed(0)}. Preserving cash buffer during low-income period.`; } 
    else if (flexibleAmount > fixedMonthlyPayment * 1.2) { reason = `Payment increased to $${flexibleAmount.toFixed(0)}. Capitalizing on predicted strong income period to reduce debt faster.`; } 
    else { reason = `Standard payment. Cash flow is stable and within safe limits.`; }
    schedule.push({ month: cf.month, year: cf.year, fixedAmount: fixedMonthlyPayment, flexibleAmount: Math.round(flexibleAmount * 100) / 100, safeCapacity: Math.round(cf.capacity * 100) / 100, reason });
  }
  return { schedule, canRepayInTime, totalCapacity, message: canRepayInTime ? "Flexible schedule generated successfully." : "Current income projections suggest repayment cannot be completed within maturity without exceeding affordability." };
}
