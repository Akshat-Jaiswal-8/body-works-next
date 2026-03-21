'use client';

import { DataLoadingSkeleton } from '@/components/data-loading-skeleton';
import { DescriptedCard } from '@/components/descripted-card';
import { PaginationProvidor } from '@/components/pagination-providor';
import type { IExercise } from '@/features/exercises/types';
import { useTargetMuscle } from '@/features/target-muscles/services/use-get-target-muscle';
import { useErrorHandler } from '@/lib/error-utils';
import { useParams, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function TargetMuscleContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const searchTargetMuscle = params?.['target-muscle'] as string;
  const { handleError } = useErrorHandler();

  const page = Number(searchParams?.get('page')) || 1;

  const { targetMuscle, isLoading, error, refetch, isRefetching } = useTargetMuscle(
    searchTargetMuscle,
    9,
    page,
  );

  useEffect(() => {
    if (error) {
      handleError(error, refetch);
    }
  }, [error]);

  if (isLoading || isRefetching) return <DataLoadingSkeleton />;

  return (
    <section className='mb-12 space-y-12'>
      <div className='grid w-full lg:grid-cols-2 xl:grid-cols-3'>
        {targetMuscle?.data.map((targetMuscle: IExercise) => {
          return (
            <DescriptedCard
              id={targetMuscle.id_}
              key={targetMuscle.id_}
              gif={targetMuscle.gifUrl}
              title={targetMuscle.title}
              blog={targetMuscle.blog}
            />
          );
        })}
      </div>
      <PaginationProvidor currentPage={page} totalPages={targetMuscle?.totalPages || 0} />
    </section>
  );
}

export default function TargetMuscleClient() {
  return (
    <Suspense fallback={<DataLoadingSkeleton />}>
      <TargetMuscleContent />
    </Suspense>
  );
}
