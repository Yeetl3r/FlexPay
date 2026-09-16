export interface StressInput { currentIncome: number; previousIncome: number; currentExpense: number; previousExpense: number; missedPayments: number; debtToIncomeRatio: number; }
export function calculateStressScore(input: StressInput): number {
  const { currentIncome, previousIncome, currentExpense, previousExpense, missedPayments, debtToIncomeRatio } = input;
  let score = 0;
  if (currentIncome < previousIncome && previousIncome > 0) { const declinePercent = (previousIncome - currentIncome) / previousIncome; score += Math.min(30, declinePercent * 100); }
  if (currentExpense > previousExpense && previousExpense > 0) { const increasePercent = (currentExpense - previousExpense) / previousExpense; score += Math.min(20, increasePercent * 100); }
  if (missedPayments > 0) { score += Math.min(25, missedPayments * 10); }
  if (debtToIncomeRatio > 0.2) { const burden = (debtToIncomeRatio - 0.2) * 80; score += Math.min(25, burden); }
  return Math.max(0, Math.min(100, Math.round(score)));
}
export function getStressZone(score: number): 'GREEN' | 'YELLOW' | 'RED' {
  if (score < 40) return 'GREEN';
  if (score < 70) return 'YELLOW';
  return 'RED';
}
