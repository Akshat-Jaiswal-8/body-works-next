'use client';

import { DataLoadingSkeleton } from '@/components/data-loading-skeleton';
import { DescriptedCard } from '@/components/descripted-card';
import { PaginationProvidor } from '@/components/pagination-providor';
import { SearchBar } from '@/components/search-bar';
import { useExercises } from '@/features/exercises/services/use-get-exercises';
import type { IExercise } from '@/features/exercises/types';
import { useQueryErrorHandler } from '@/hooks/use-query-error-handler';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const ExercisesClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const page = Number(searchParams?.get('page')) || 1;

  const { isLoading, exercises, error, refetch, isRefetching } = useExercises(9, page);

  useQueryErrorHandler(error, refetch);

  const getSearchQuery = useCallback(
    (query: string) => {
      if (query) {
        router.push(`/exercises?search=${query}`);
      } else {
        const url = `${pathName}?${searchParams}`;
        router.push(url);
      }
    },
    [router, pathName, searchParams],
  );

  if (isLoading || isRefetching) {
    return <DataLoadingSkeleton />;
  }

  if (exercises && exercises.data.length === 0) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <h1 className='text-2xl font-bold text-gray-500'>No exercises found.</h1>
      </div>
    );
  }

  return (
    <>
      <SearchBar getQuery={getSearchQuery} />
      <div className={cn('w-full lg:grid lg:grid-cols-2 2xl:grid-cols-3')}>
        {exercises?.data.map((exercise: IExercise) => {
          return (
            <DescriptedCard
              key={exercise.id_}
              id={exercise.id_}
              gif={exercise.gifUrl}
              title={exercise.title}
              blog={exercise.blog}
            />
          );
        })}
      </div>

      <PaginationProvidor currentPage={page} totalPages={exercises?.totalPages || 0} />
    </>
  );
};
