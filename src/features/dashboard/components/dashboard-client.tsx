'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { BmiCard } from '@/features/dashboard/components/bmi-card';
import { GoalCard } from '@/features/dashboard/components/goal-card';
import { InsightCard } from '@/features/dashboard/components/insight-card';
import { StatCard } from '@/features/dashboard/components/stat-card';
import { useDashboardStats } from '@/features/dashboard/services/use-get-dashboard-stats';
import { useQueryErrorHandler } from '@/hooks/use-query-error-handler';
import { Droplets, Scale } from 'lucide-react';

export default function DashboardClient() {
  const { isLoading, data: stats, error, refetch, isRefetching } = useDashboardStats();

  useQueryErrorHandler(error, refetch);

  if (isLoading || isRefetching) {
    return (
      <div className='mx-auto h-full w-full max-w-7xl pb-12'>
        <Skeleton className='mb-4 h-10 w-1/3 rounded-xl' />
        <Skeleton className='mb-8 h-6 w-1/2 rounded-xl' />
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className='h-40 w-full rounded-2xl' />
          ))}
        </div>
        <div className='mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3'>
          <Skeleton className='col-span-2 h-64 w-full rounded-2xl' />
          <Skeleton className='h-64 w-full rounded-2xl' />
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className='mx-auto h-full w-full max-w-7xl pb-12'>
      <header className='mb-8'>
        <h1 className='font-poppins text-3xl font-bold text-amber-900 dark:text-white'>Overview</h1>
        <p className='font-montserrat mt-1 text-amber-700 dark:text-gray-400'>
          Your latest body composition and goals.
        </p>
      </header>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          icon={Scale}
          label='Weight'
          value={stats.weight}
          unit='kg'
          change={stats.weightChange}
        />
        <StatCard
          icon={Droplets}
          label='Body Fat'
          value={stats.bodyFat}
          unit='%'
          change={stats.bodyFatChange}
        />
        <BmiCard bmi={stats.bmi} bmiStatus={stats.bmiStatus} />
        <GoalCard stats={stats} />
      </div>

      <div className='mt-10'>
        <h3 className='font-poppins mb-4 text-xl font-bold text-amber-900 dark:text-white'>
          Latest Scan Insights
        </h3>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {stats.insights.map((insight) => (
            <InsightCard key={insight.label} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  );
}
