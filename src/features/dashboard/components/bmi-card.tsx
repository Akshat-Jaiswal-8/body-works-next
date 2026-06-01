'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { IDashboardStats } from '@/features/dashboard/types';
import { cn } from '@/lib/utils';
import { Scale } from 'lucide-react';
import { memo } from 'react';

export type BmiCardProps = Pick<IDashboardStats, 'bmi' | 'bmiStatus'>;

const topHighlightClass =
  'pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-500/70 to-transparent dark:via-pink-400/60';

export const BmiCard = memo(({ bmi, bmiStatus }: BmiCardProps) => {
  return (
    <Card className='relative overflow-hidden rounded-2xl border-black/20 bg-gray-50 shadow-lg shadow-amber-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-black dark:shadow-pink-500/20'>
      <div className={topHighlightClass} />
      <CardContent className='flex flex-col gap-4 p-5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='rounded-full bg-amber-100 p-2 dark:bg-gray-800'>
              <Scale className='h-5 w-5 text-amber-700 dark:text-pink-400' />
            </div>
            <div>
              <div className='font-montserrat text-sm text-amber-700 dark:text-gray-400'>
                Current BMI
              </div>
              <div className='font-poppins text-3xl font-bold text-amber-900 dark:text-white'>
                {bmi}
              </div>
            </div>
          </div>
          <span
            className={cn(
              'font-montserrat inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-bold dark:bg-gray-800',
              bmiStatus === 'Normal'
                ? 'text-emerald-600 dark:text-emerald-400'
                : bmiStatus === 'Overweight'
                  ? 'text-red-500 dark:text-red-400'
                  : 'text-amber-800 dark:text-pink-400',
            )}
          >
            {bmiStatus}
          </span>
        </div>
      </CardContent>
    </Card>
  );
});

BmiCard.displayName = 'BmiCard';
