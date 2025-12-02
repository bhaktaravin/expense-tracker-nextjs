import { Transaction } from '@/types';
import { CATEGORY_COLORS } from '@/types';

interface TransactionListProps {
  transactions: Transaction[];
  limit?: number;
}

export function TransactionList({ transactions, limit }: TransactionListProps) {
  const displayTransactions = limit ? transactions.slice(0, limit) : transactions;

  return (
    <div className="space-y-3">
      {displayTransactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
        >
          <div className="flex items-center gap-4">
            <div
              className="w-2 h-12 rounded-full"
              style={{ backgroundColor: CATEGORY_COLORS[transaction.category] }}
            />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {transaction.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {transaction.category} • {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
          <div className={`font-bold text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}
