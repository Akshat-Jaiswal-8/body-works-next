'use client';

import { DataLoadingSkeleton } from '@/components/data-loading-skeleton';
import { Card } from '@/components/exercise-card';
import { useRoutinesCategory } from '@/features/routines/services/use-get-routines-category';
import { useErrorHandler } from '@/lib/error-utils';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

export default function RoutineCategoryClient() {
  const { routineCategory, isLoading, error, refetch, isRefetching } = useRoutinesCategory();
  const { handleError } = useErrorHandler();

  useEffect(() => {
    if (error) {
      handleError(error, refetch);
    }
  }, [error]);

  if (isLoading || isRefetching) return <DataLoadingSkeleton />;

  return (
    <div className={cn('no-scrollbar container w-full overflow-y-scroll pb-4')}>
      <div className={cn('w-full lg:grid lg:grid-cols-2 2xl:grid-cols-3')}>
        {routineCategory?.map((routineCategory: { title: string; imageUrl: string }) => {
          return (
            <Card
              key={routineCategory.title}
              name={routineCategory.title}
              image={routineCategory.imageUrl}
              searchName={routineCategory.title}
              path={'routines'}
            />
          );
        })}
      </div>
    </div>
  );
}
