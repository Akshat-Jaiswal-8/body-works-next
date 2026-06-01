import { getBodyFatAssessment } from '@/features/tracker/lib/utils';
import type { IBodyStatEntry } from '@/features/tracker/types';
import { cn } from '@/lib/utils';
import { memo } from 'react';

export type HistoryRowProps = {
  entry: IBodyStatEntry;
  index: number;
};

export const HistoryRow = memo(({ entry, index }: HistoryRowProps) => {
  const date = new Date(entry.loggedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const { label: assessment, colorClass } = getBodyFatAssessment(entry.bodyFatPct);

  return (
    <div
      className={cn(
        'group grid grid-cols-5 items-center gap-4 border-dashed px-4 py-4 transition-colors hover:bg-amber-50/50 dark:hover:bg-gray-900/50',
        index !== 0 && 'border-t border-black/10 dark:border-gray-800',
      )}
    >
      <span className='font-poppins text-sm font-medium text-amber-900 dark:text-white'>
        {date}
      </span>
      <span className='font-montserrat text-sm text-amber-800 group-hover:text-amber-600 dark:text-gray-300 dark:group-hover:text-pink-400'>
        {entry.weightKg} kg
      </span>
      <span className='font-montserrat text-sm text-amber-800 dark:text-gray-300'>
        {entry.bmi ?? '-'}
      </span>
      <span className='font-montserrat text-sm text-amber-800 dark:text-gray-300'>
        {entry.bodyFatPct ?? '-'}
      </span>
      <span className={cn('font-montserrat text-sm font-medium', colorClass)}>{assessment}</span>
    </div>
  );
});

HistoryRow.displayName = 'HistoryRow';
