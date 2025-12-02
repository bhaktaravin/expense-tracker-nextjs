import { Transaction } from '@/types';

export const mockTransactions: Transaction[] = [
  // November 2024
  { id: '1', date: '2024-11-28', description: 'Whole Foods Market', amount: 87.42, category: 'Groceries', type: 'expense' },
  { id: '2', date: '2024-11-27', description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', type: 'expense' },
  { id: '3', date: '2024-11-26', description: 'Uber Ride', amount: 24.50, category: 'Transportation', type: 'expense' },
  { id: '4', date: '2024-11-25', description: 'Starbucks', amount: 6.75, category: 'Food & Dining', type: 'expense' },
  { id: '5', date: '2024-11-25', description: 'Amazon Purchase', amount: 145.99, category: 'Shopping', type: 'expense' },
  { id: '6', date: '2024-11-24', description: 'Electric Bill', amount: 120.00, category: 'Bills & Utilities', type: 'expense' },
  { id: '7', date: '2024-11-23', description: 'Monthly Salary', amount: 5000.00, category: 'Salary', type: 'income' },
  { id: '8', date: '2024-11-22', description: 'Chipotle', amount: 12.85, category: 'Food & Dining', type: 'expense' },
  { id: '9', date: '2024-11-21', description: 'Target', amount: 63.21, category: 'Shopping', type: 'expense' },
  { id: '10', date: '2024-11-20', description: 'Gas Station', amount: 45.00, category: 'Transportation', type: 'expense' },
  
  { id: '11', date: '2024-11-19', description: 'Movie Tickets', amount: 28.00, category: 'Entertainment', type: 'expense' },
  { id: '12', date: '2024-11-18', description: 'Trader Joe\'s', amount: 52.30, category: 'Groceries', type: 'expense' },
  { id: '13', date: '2024-11-17', description: 'Doctor Visit', amount: 150.00, category: 'Healthcare', type: 'expense' },
  { id: '14', date: '2024-11-16', description: 'Restaurant Dinner', amount: 78.50, category: 'Food & Dining', type: 'expense' },
  { id: '15', date: '2024-11-15', description: 'Internet Bill', amount: 65.00, category: 'Bills & Utilities', type: 'expense' },
  { id: '16', date: '2024-11-14', description: 'Spotify Premium', amount: 10.99, category: 'Entertainment', type: 'expense' },
  { id: '17', date: '2024-11-13', description: 'Lyft Ride', amount: 18.75, category: 'Transportation', type: 'expense' },
  { id: '18', date: '2024-11-12', description: 'Best Buy', amount: 299.99, category: 'Shopping', type: 'expense' },
  { id: '19', date: '2024-11-11', description: 'Costco', amount: 156.80, category: 'Groceries', type: 'expense' },
  { id: '20', date: '2024-11-10', description: 'Coffee Shop', amount: 5.50, category: 'Food & Dining', type: 'expense' },
  
  { id: '21', date: '2024-11-09', description: 'Pharmacy', amount: 45.20, category: 'Healthcare', type: 'expense' },
  { id: '22', date: '2024-11-08', description: 'Water Bill', amount: 38.00, category: 'Bills & Utilities', type: 'expense' },
  { id: '23', date: '2024-11-07', description: 'Lunch', amount: 15.99, category: 'Food & Dining', type: 'expense' },
  { id: '24', date: '2024-11-06', description: 'IKEA', amount: 187.45, category: 'Shopping', type: 'expense' },
  { id: '25', date: '2024-11-05', description: 'Safeway', amount: 71.23, category: 'Groceries', type: 'expense' },
  { id: '26', date: '2024-11-04', description: 'Concert Tickets', amount: 120.00, category: 'Entertainment', type: 'expense' },
  { id: '27', date: '2024-11-03', description: 'Parking Fee', amount: 12.00, category: 'Transportation', type: 'expense' },
  { id: '28', date: '2024-11-02', description: 'Phone Bill', amount: 80.00, category: 'Bills & Utilities', type: 'expense' },
  { id: '29', date: '2024-11-01', description: 'Brunch', amount: 42.30, category: 'Food & Dining', type: 'expense' },
  { id: '30', date: '2024-11-01', description: 'Nike Store', amount: 95.00, category: 'Shopping', type: 'expense' },

  // Recent December transactions
  { id: '31', date: '2024-12-02', description: 'Grocery Shopping', amount: 93.15, category: 'Groceries', type: 'expense' },
  { id: '32', date: '2024-12-01', description: 'Flight Booking', amount: 450.00, category: 'Travel', type: 'expense' },
  { id: '33', date: '2024-12-01', description: 'Hotel Reservation', amount: 350.00, category: 'Travel', type: 'expense' },
];

export function getCategoryStats(transactions: Transaction[]): { category: string; total: number; percentage: number; count: number }[] {
  const expenses = transactions.filter(t => t.type === 'expense');
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  
  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const categoryCounts = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categoryTotals)
    .map(([category, total]) => ({
      category,
      total,
      percentage: (total / totalExpenses) * 100,
      count: categoryCounts[category] || 0,
    }))
    .sort((a, b) => b.total - a.total);
}

export function getMonthlyTrend(transactions: Transaction[]): { month: string; income: number; expenses: number }[] {
  const monthlyData = transactions.reduce((acc, t) => {
    const month = t.date.substring(0, 7); // YYYY-MM
    if (!acc[month]) {
      acc[month] = { income: 0, expenses: 0 };
    }
    if (t.type === 'income') {
      acc[month].income += t.amount;
    } else {
      acc[month].expenses += t.amount;
    }
    return acc;
  }, {} as Record<string, { income: number; expenses: number }>);

  return Object.entries(monthlyData)
    .map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
}
