export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: Category;
  type: 'expense' | 'income';
}

export type Category = 
  | 'Food & Dining'
  | 'Shopping'
  | 'Transportation'
  | 'Entertainment'
  | 'Bills & Utilities'
  | 'Healthcare'
  | 'Travel'
  | 'Groceries'
  | 'Salary'
  | 'Other';

export interface CategoryStats {
  category: Category;
  total: number;
  percentage: number;
  count: number;
  color: string;
}

export const CATEGORY_COLORS: Record<Category, string> = {
  'Food & Dining': '#ef4444',
  'Shopping': '#f59e0b',
  'Transportation': '#3b82f6',
  'Entertainment': '#8b5cf6',
  'Bills & Utilities': '#10b981',
  'Healthcare': '#ec4899',
  'Travel': '#06b6d4',
  'Groceries': '#84cc16',
  'Salary': '#22c55e',
  'Other': '#6b7280',
};
