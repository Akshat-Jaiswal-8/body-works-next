'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { IDashboardStats } from '@/features/dashboard/types';
import { Dumbbell, Target } from 'lucide-react';
import { memo } from 'react';

export interface GoalCardProps {
  stats: IDashboardStats;
}

const topHighlightClass =
  'pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-500/70 to-transparent dark:via-pink-400/60';

export const GoalCard = memo(({ stats }: GoalCardProps) => {
  return (
    <Card className='relative overflow-hidden rounded-2xl border-black/20 bg-gray-50 shadow-lg shadow-amber-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-black dark:shadow-pink-500/20'>
      <div className={topHighlightClass} />
      <CardContent className='relative flex flex-col gap-4 p-5'>
        <div className='absolute -top-4 -right-4 opacity-5'>
          <Dumbbell className='h-32 w-32 text-amber-900 dark:text-pink-500' />
        </div>
        <div className='relative z-10'>
          <h2 className='font-poppins text-xl font-bold text-amber-900 dark:text-white'>
            Current Goal
          </h2>
          <p className='font-montserrat mt-1 text-lg font-semibold text-amber-600 dark:text-pink-500'>
            {stats.currentGoal}
          </p>
        </div>
        <div className='relative z-10 flex items-center gap-2 rounded-lg border border-black/10 bg-white p-3 dark:border-gray-800 dark:bg-gray-900'>
          <Target className='h-4 w-4 text-amber-600 dark:text-pink-500' />
          <span className='font-montserrat text-sm text-amber-700 dark:text-gray-400'>
            Track your progress over time to see how you&apos;re doing.
          </span>
        </div>
      </CardContent>
    </Card>
  );
});

GoalCard.displayName = 'GoalCard';
