import { generateFlexibleSchedule } from '../src/lib/optimiser'
import { calculateStressScore } from '../src/lib/stress'

describe('Repayment Optimiser', () => {
  it('should generate a flexible schedule preserving total balance when capacity allows', () => {
    const cashflows = [
      { month: 1, year: 2024, income: 1000, essentialExpense: 300, businessExpense: 100, otherDebtPayment: 0, disposableCash: 600 },
      { month: 2, year: 2024, income: 1000, essentialExpense: 300, businessExpense: 100, otherDebtPayment: 0, disposableCash: 600 }
    ];
    // capacity = max(0, 0.3 * 600 - 50) = 130 per month
    // total capacity = 260
    const result = generateFlexibleSchedule({
      remainingBalance: 200,
      fixedMonthlyPayment: 100,
      cashflows,
      alpha: 0.30,
      emergencyBuffer: 50
    });
    
    expect(result.canRepayInTime).toBe(true);
    expect(result.schedule[0].flexibleAmount + result.schedule[1].flexibleAmount).toBeCloseTo(200);
  });

  it('should cap at max capacity and fail check if balance exceeds total capacity', () => {
    const cashflows = [
      { month: 1, year: 2024, income: 200, essentialExpense: 100, businessExpense: 0, otherDebtPayment: 0, disposableCash: 100 },
    ];
    // capacity = max(0, 0.3 * 100 - 50) = 0
    const result = generateFlexibleSchedule({
      remainingBalance: 100,
      fixedMonthlyPayment: 100,
      cashflows,
      alpha: 0.30,
      emergencyBuffer: 50
    });
    
    expect(result.canRepayInTime).toBe(false);
    expect(result.schedule[0].flexibleAmount).toBe(0);
  });
});

describe('Stress Score', () => {
  it('should calculate healthy score', () => {
    const score = calculateStressScore({
      currentIncome: 1000, previousIncome: 1000,
      currentExpense: 500, previousExpense: 500,
      missedPayments: 0, debtToIncomeRatio: 0.1
    });
    expect(score).toBe(0);
  });

  it('should increase score on income drop', () => {
    const score = calculateStressScore({
      currentIncome: 500, previousIncome: 1000,
      currentExpense: 500, previousExpense: 500,
      missedPayments: 0, debtToIncomeRatio: 0.1
    });
    expect(score).toBeGreaterThan(0);
  });
});
