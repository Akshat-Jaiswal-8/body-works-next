'use client';

import { DescriptedCard } from '@/components/shared/descripted-card';
import { FilterSection, type FilterConfig } from '@/components/shared/filter-section';
import { ExerciseCardSkeleton, ExercisesSkeleton } from '@/components/shared/page-skeletons';
import { PaginationProvider } from '@/components/shared/pagination-provider';
import { PaginationSkeleton } from '@/components/shared/pagination-skeleton';
import { SearchBar } from '@/components/shared/search-bar';
import { PAGE_LIMIT, PAGE_SIZE } from '@/constants';
import { useExercises } from '@/features/exercises/services/use-get-exercises';
import {
  useExerciseFilterOptions,
  type IExerciseFilterName,
} from '@/features/exercises/services/use-get-exercises-filter';
import type { IExercise } from '@/features/exercises/types';
import { useQueryErrorHandler } from '@/hooks/use-query-error-handler';
import { useDebounce } from '@uidotdev/usehooks';
import { parseAsInteger, parseAsString, useQueryState, useQueryStates } from 'nuqs';
import React, { Suspense, useCallback, useMemo } from 'react';

type FilterKey = 'equipment' | 'target' | 'bodyPart';

const exercisesFilterConfig = [
  { key: 'equipment' as const, label: 'Equipment' },
  { key: 'target' as const, label: 'Target Muscle' },
  { key: 'bodyPart' as const, label: 'Body Part' },
] as const satisfies ReadonlyArray<{ key: FilterKey; label: string }>;

const getFilterLabel = (filterKey: IExerciseFilterName) => {
  const filter = exercisesFilterConfig.find((item) => item.key === filterKey);
  return filter?.label ?? filterKey;
};

const toFilterOptions = (items: { title: string }[] | undefined) =>
  items?.map((item) => ({ label: item.title, value: item.title })) ?? [];

function ExercisesContent(): React.ReactNode {
  const pageParser = parseAsInteger.withDefault(PAGE_SIZE);
  const textParser = parseAsString.withDefault('').withOptions({ history: 'replace' });

  const [page, setPage] = useQueryState('page', pageParser);
  const [search] = useQueryState('search', textParser);
  const [filters, setFilters] = useQueryStates({
    equipment: textParser,
    target: textParser,
    bodyPart: textParser,
  });

  const debouncedSearch = useDebounce(search, 500);

  const equipmentFilter = useExerciseFilterOptions('equipment');
  const targetFilter = useExerciseFilterOptions('target');
  const bodyPartFilter = useExerciseFilterOptions('bodyPart');

  const queryFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [filters, debouncedSearch],
  );

  const exercisesFilterData = useMemo(
    () => ({
      equipment: toFilterOptions(equipmentFilter.data),
      target: toFilterOptions(targetFilter.data),
      bodyPart: toFilterOptions(bodyPartFilter.data),
    }),
    [equipmentFilter.data, targetFilter.data, bodyPartFilter.data],
  );

  const isFiltersLoading =
    equipmentFilter.isLoading || targetFilter.isLoading || bodyPartFilter.isLoading;

  const {
    isLoading,
    data: exercises,
    error,
    refetch,
    isRefetching,
  } = useExercises(PAGE_LIMIT, page, queryFilters);

  useQueryErrorHandler(error, refetch);

  const updateRouteQuery = (key: string, value: string) => {
    setFilters({
      [key]: value || null,
    } as Partial<typeof filters>);

    setPage(PAGE_SIZE, { history: 'replace' });
  };

  const onFilterChange = useCallback((key: FilterKey, value: string) => {
    updateRouteQuery(key, value);
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({
      equipment: null,
      target: null,
      bodyPart: null,
    });
    setPage(PAGE_SIZE, { history: 'replace' });
  }, [setFilters, setPage]);

  if (isLoading || isFiltersLoading) return <ExercisesSkeleton />;

  const filterSections: FilterConfig<FilterKey>[] = exercisesFilterConfig.map((filter) => ({
    key: filter.key,
    label: getFilterLabel(filter.key),
    options: exercisesFilterData[filter.key],
  }));

  return (
    <section className='mb-12 space-y-12'>
      <SearchBar placeholder='Search exercises, muscles, or equipment...' />
      <FilterSection
        title='Exercise Filters'
        filters={filterSections}
        values={filters}
        onChange={onFilterChange}
        onReset={clearAllFilters}
      />
      {isRefetching ? (
        <>
          <div className='h-full w-full md:grid md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <ExerciseCardSkeleton key={i} />
            ))}
          </div>
          <PaginationSkeleton />
        </>
      ) : (
        <>
          <div className='h-full'>
            {exercises && exercises.data.length > 0 ? (
              <div className='h-full w-full md:grid md:grid-cols-2 lg:grid-cols-3'>
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

          <PaginationProvider currentPage={page} totalPages={exercises?.totalPages || 0} />
        </>
      )}
    </section>
  );
}

export const ExercisesClient = () => {
  return (
    <Suspense fallback={<ExercisesSkeleton />}>
      <ExercisesContent />
    </Suspense>
  );
};
