'use client';

import { Badge } from '@/components/ui/badge';
import type { IScanInsight } from '@/features/dashboard/types';
import { cn } from '@/lib/utils';
import { memo } from 'react';

export interface StatusBadgeProps {
  status: string;
  color: IScanInsight['statusColor'];
}

const colorClasses: Record<IScanInsight['statusColor'], string> = {
  success:
    'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
  warning:
    'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
  error:
    'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
  info: 'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-400 dark:border-sky-800',
};

export const StatusBadge = memo(({ status, color }: StatusBadgeProps) => {
  return (
    <Badge
      variant='outline'
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase',
        colorClasses[color],
      )}
    >
      {status}
    </Badge>
  );
});

StatusBadge.displayName = 'StatusBadge';
