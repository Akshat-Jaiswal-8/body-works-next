'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { IDashboardStats } from '@/features/dashboard/types';
import { Dumbbell } from 'lucide-react';
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
        <div className='relative z-10 w-full'>
          <div className='font-montserrat mb-2 flex justify-between text-sm text-amber-800 dark:text-gray-300'>
            <span>Progress</span>
            <span>{stats.goalProgress}%</span>
          </div>
          <Progress
            value={stats.goalProgress}
            className='h-3 overflow-hidden rounded-full bg-amber-100 dark:bg-gray-800 [&>[data-slot=progress-indicator]]:rounded-full [&>[data-slot=progress-indicator]]:bg-linear-to-r [&>[data-slot=progress-indicator]]:from-amber-500 [&>[data-slot=progress-indicator]]:to-amber-700 dark:[&>[data-slot=progress-indicator]]:from-pink-500 dark:[&>[data-slot=progress-indicator]]:to-violet-600'
          />
          <div className='font-montserrat mt-2 flex justify-between text-xs text-amber-700 dark:text-gray-500'>
            <span>Target: {stats.goalTarget}</span>
            <span>{stats.goalWeeksLeft} weeks left</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

GoalCard.displayName = 'GoalCard';
