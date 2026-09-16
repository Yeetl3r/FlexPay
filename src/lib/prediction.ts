export interface HistoricalRecord { month: number; year: number; income: number; essentialExpense: number; businessExpense: number; otherDebtPayment: number; }
export interface PredictedRecord extends HistoricalRecord { disposableCash: number; }
export function predictFutureCashflow(history: HistoricalRecord[], startMonth: number, startYear: number): PredictedRecord[] {
  const predictions: PredictedRecord[] = [];
  const sorted = [...history].sort((a, b) => (a.year * 12 + a.month) - (b.year * 12 + b.month));
  let currentM = startMonth, currentY = startYear;
  for (let i = 0; i < 12; i++) {
    const seasonalMatch = sorted.find(h => h.month === currentM);
    const recent3 = sorted.slice(-3);
    const avgRecentIncome = recent3.reduce((sum, h) => sum + h.income, 0) / (recent3.length || 1);
    const avgRecentExp = recent3.reduce((sum, h) => sum + (h.essentialExpense + h.businessExpense), 0) / (recent3.length || 1);
    let predictedIncome = avgRecentIncome, predictedExp = avgRecentExp;
    if (seasonalMatch) {
      predictedIncome = (seasonalMatch.income * 0.7) + (avgRecentIncome * 0.3);
      predictedExp = ((seasonalMatch.essentialExpense + seasonalMatch.businessExpense) * 0.7) + (avgRecentExp * 0.3);
    }
    const totalExpense = predictedExp, debt = seasonalMatch ? seasonalMatch.otherDebtPayment : 0;
    predictions.push({ month: currentM, year: currentY, income: predictedIncome, essentialExpense: totalExpense * 0.7, businessExpense: totalExpense * 0.3, otherDebtPayment: debt, disposableCash: predictedIncome - totalExpense - debt });
    currentM++; if (currentM > 12) { currentM = 1; currentY++; }
  }
  return predictions;
}
