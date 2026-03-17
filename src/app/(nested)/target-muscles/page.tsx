'use client';
import { DataLoadingSkeleton } from '@/components/data-loading-skeleton';
import { Card } from '@/components/exercise-card';
import useTargetMuscles from '@/hooks/use-target-muscles';
import { useErrorHandler } from '@/lib/error-utils';
import { useEffect } from 'react';

function TargetMuscles() {
  const { isLoading, targetMuscle, error, refetch, isRefetching } = useTargetMuscles();

  const { handleError } = useErrorHandler();

  useEffect(() => {
    if (error) {
      handleError(error, refetch);
    }
  }, [error]);

  if (isLoading || isRefetching) {
    return <DataLoadingSkeleton />;
  }

  return (
    <div className={'w-full md:grid md:grid-cols-2 lg:grid-cols-3'}>
      {targetMuscle?.data.map((targetMuscle: ITargetMuscle) => {
        return (
          <Card
            name={targetMuscle.targetMuscle}
            image={targetMuscle.imageUrl}
            key={targetMuscle.targetMuscle}
            path={'target-muscles'}
          />
        );
      })}
    </div>
  );
}

export default TargetMuscles;
