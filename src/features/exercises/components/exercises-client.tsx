'use client';

import { DescriptedCard } from '@/components/shared/descripted-card';
import { PaginationProvider } from '@/components/shared/pagination-provider';
import { PaginationSkeleton } from '@/components/shared/pagination-skeleton';
import { SearchBar } from '@/components/shared/search-bar';
import { useExercises } from '@/features/exercises/services/use-get-exercises';
import type { IExercise } from '@/features/exercises/types';
import { useQueryErrorHandler } from '@/hooks/use-query-error-handler';
import { cn } from '@/lib/utils';
import { useDebounce } from '@uidotdev/usehooks';
import { useQueryState } from 'nuqs';

export const ExercisesClient = () => {
  const [page] = useQueryState('page', { defaultValue: '1' });
  const [searchQuery] = useQueryState('search');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const pageNumber = Number(page) || 1;

  const {
    isLoading,
    data: exercises,
    error,
    refetch,
    isRefetching,
  } = useExercises(9, pageNumber, debouncedSearchQuery || undefined);

  useQueryErrorHandler(error, refetch);

  return (
    <>
      <SearchBar />
      <div className='h-full'>
        {exercises && exercises.data.length > 0 ? (
          <div className={cn('h-full w-full md:grid md:grid-cols-2 lg:grid-cols-3')}>
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

      {isLoading || isRefetching ? (
        <PaginationSkeleton />
      ) : (
        exercises &&
        exercises.data.length > 0 && (
          <PaginationProvider currentPage={pageNumber} totalPages={exercises.totalPages} />
        )
      )}
    </>
  );
};
