'use client';

import { DataLoadingSkeleton } from '@/components/shared/data-loading-skeleton';
import { DescriptedCard } from '@/components/shared/descripted-card';

import { PaginationProvider } from '@/components/shared/pagination-provider';
import type { IExerciseData } from '@/features/exercises/types';
import { useQueryErrorHandler } from '@/hooks/use-query-error-handler';
import { cn } from '@/lib/utils';
import { useParams, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { PaginationSkeleton } from './pagination-skeleton';

type RefetchFn = () => void | Promise<unknown>;

type FilteredExercisesQueryResult = {
  data: IExerciseData | undefined;
  isLoading: boolean;
  isRefetching: boolean;
  error: Error | null;
  refetch?: RefetchFn;
};

type FilteredExercisesConfig = {
  paramKey: string;
  useData: (
    filterValue: string | undefined,
    limit: number,
    page: number,
  ) => FilteredExercisesQueryResult;
  limit?: number;
  gridClassName?: string;
};

function resolveParamValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function withFilteredExercisesClient({
  paramKey,
  useData,
  limit = 9,
  gridClassName,
}: FilteredExercisesConfig) {
  function FilteredExercisesContent() {
    const params = useParams();
    const searchParams = useSearchParams();

    const filterValue = resolveParamValue(params?.[paramKey]);
    const page = Number(searchParams?.get('page')) || 1;

    const { data, isLoading, isRefetching, error, refetch } = useData(filterValue, limit, page);

    useQueryErrorHandler(error, refetch);

    if (isLoading || isRefetching) {
      return (
        <section className='mb-12 space-y-12'>
          <DataLoadingSkeleton gridClassName={gridClassName} />
          <PaginationSkeleton />
        </section>
      );
    }

    return (
      <section className='mb-12 space-y-12'>
        <div className={cn('w-full', gridClassName)}>
          {data?.data.map((exercise) => {
            return (
              <DescriptedCard
                id={exercise.id_}
                key={exercise.id_}
                gif={exercise.gifUrl}
                title={exercise.title}
                blog={exercise.blog}
              />
            );
          })}
        </div>
        <PaginationProvider currentPage={page} totalPages={data?.totalPages || 0} />
      </section>
    );
  }

  function FilteredExercisesClient() {
    return (
      <Suspense
        fallback={
          <section className='mb-12 space-y-12'>
            <DataLoadingSkeleton gridClassName={gridClassName} />
            <PaginationSkeleton />
          </section>
        }
      >
        <FilteredExercisesContent />
      </Suspense>
    );
  }

  FilteredExercisesClient.displayName = 'FilteredExercisesClient';

  return FilteredExercisesClient;
}
