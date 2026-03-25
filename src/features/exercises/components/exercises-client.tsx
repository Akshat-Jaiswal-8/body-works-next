'use client';

import { DataLoadingSkeleton } from '@/components/data-loading-skeleton';
import { DescriptedCard } from '@/components/descripted-card';
import { PaginationProvidor } from '@/components/pagination-providor';
import { SearchBar } from '@/components/search-bar';
import { useExercises } from '@/features/exercises/services/use-get-exercises';
import type { IExercise } from '@/features/exercises/types';
import { useQueryErrorHandler } from '@/hooks/use-query-error-handler';
import { cn } from '@/lib/utils';
import { useDebounce } from '@uidotdev/usehooks';
import { useSearchParams } from 'next/navigation';
import { useQueryState } from 'nuqs';

export const ExercisesClient = () => {
  const searchParams = useSearchParams();
  const [searchQuery] = useQueryState('search');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const page = Number(searchParams?.get('page')) || 1;

  const { isLoading, exercises, error, refetch, isRefetching } = useExercises(
    9,
    page,
    debouncedSearchQuery ?? undefined,
  );

  useQueryErrorHandler(error, refetch);

  return (
    <>
      <SearchBar />
      {isLoading || isRefetching ? (
        <DataLoadingSkeleton />
      ) : (
        <div className='h-full'>
          {exercises && exercises.data.length > 0 ? (
            <div className={cn('h-full w-full lg:grid lg:grid-cols-2 2xl:grid-cols-3')}>
              {exercises?.data.map((exercise: IExercise) => (
                <DescriptedCard
                  key={exercise.id_}
                  id={exercise.id_}
                  gif={exercise.gifUrl}
                  title={exercise.title}
                  blog={exercise.blog}
                />
              ))}
            </div>
          ) : (
            <h1 className='mt-20 text-center text-2xl font-bold text-amber-600 dark:text-pink-500'>
              No exercises found.
            </h1>
          )}
        </div>
      )}

      {exercises && exercises.data.length > 0 && (
        <PaginationProvidor currentPage={page} totalPages={exercises.totalPages} />
      )}
    </>
  );
};
