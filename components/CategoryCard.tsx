import { CATEGORY_COLORS } from '@/types';

interface CategoryCardProps {
  category: string;
  total: number;
  percentage: number;
  count: number;
}

export function CategoryCard({ category, total, percentage, count }: CategoryCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || '#6b7280' }}
          />
          <h3 className="font-semibold text-gray-900 dark:text-white">{category}</h3>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">{count} transactions</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${total.toFixed(2)}
          </span>
          <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
            {percentage.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              backgroundColor: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || '#6b7280',
            }}
          />
        </div>
      </div>
    </div>
  );
}
