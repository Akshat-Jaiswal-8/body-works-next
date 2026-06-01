'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import React, { memo } from 'react';

export interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  unit: string;
  change: number;
}

const topHighlightClass =
  'pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-500/70 to-transparent dark:via-pink-400/60';

export const StatCard = memo(({ icon: Icon, label, value, unit, change }: StatCardProps) => {
  return (
    <Card className='relative overflow-hidden rounded-2xl border-black/20 bg-gray-50 shadow-lg shadow-amber-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-black dark:shadow-pink-500/20'>
      <div className={topHighlightClass} />
      <CardContent className='flex flex-col gap-4 p-5'>
        <div className='flex items-center gap-2 text-amber-800 dark:text-gray-400'>
          <Icon className='h-5 w-5 text-amber-600 dark:text-pink-500' />
          <span className='font-montserrat text-sm font-semibold'>{label}</span>
        </div>
        <div>
          <div className='font-poppins text-3xl font-bold text-amber-900 dark:text-white'>
            {value}{' '}
            <span className='text-lg font-medium text-amber-700 dark:text-gray-400'>{unit}</span>
          </div>
          <div
            className={cn(
              'font-montserrat mt-1 flex items-center gap-1 text-sm font-medium',
              change < 0
                ? 'text-emerald-600 dark:text-emerald-400'
                : change > 0
                  ? 'text-red-500 dark:text-red-400'
                  : 'text-amber-600 dark:text-gray-500',
            )}
          >
            {change !== 0 && (
              <>
                {change < 0 ? <ArrowDown className='h-4 w-4' /> : <ArrowUp className='h-4 w-4' />}
                {Math.abs(change)}
                {unit === '%' ? '%' : 'kg'} this month
              </>
            )}
            {change === 0 && <span>No change</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

StatCard.displayName = 'StatCard';
