'use client';

import { FilterSection, type FilterConfig } from '@/components/shared/filter-section';
import { RoutineCardSkeleton, RoutinesSkeleton } from '@/components/shared/page-skeletons';
import { PaginationProvider } from '@/components/shared/pagination-provider';
import { PaginationSkeleton } from '@/components/shared/pagination-skeleton';
import { RoutineCard } from '@/components/shared/routine-card';
import { SearchBar } from '@/components/shared/search-bar';
import { PAGE_LIMIT, PAGE_SIZE } from '@/constants';
import { useRoutines, type IRoutinesFilters } from '@/features/routines/services/use-get-routines';
import {
  useRoutinesFilter,
  type IRoutineFilterName,
} from '@/features/routines/services/use-get-routines-filter';

import type { IRoutine } from '@/features/routines/types';
import { useQueryErrorHandler } from '@/hooks/use-query-error-handler';
import { useDebounce } from '@uidotdev/usehooks';
import Link from 'next/link';
import { parseAsInteger, parseAsString, useQueryState, useQueryStates } from 'nuqs';
import React, { Suspense, useCallback, useMemo } from 'react';

type FilterKey = Exclude<keyof IRoutinesFilters, 'search'>;

const routinesFilterConfig = [
  { key: 'main_goal', label: 'Goal' },
  { key: 'workout_type', label: 'Type' },
  { key: 'level', label: 'Level' },
  { key: 'duration', label: 'Duration' },
  { key: 'days_per_week', label: 'Days Per Week' },
  { key: 'equipment', label: 'Equipment' },
  { key: 'gender', label: 'Gender' },
  { key: 'category', label: 'Category' },
] as const satisfies ReadonlyArray<{ key: FilterKey; label: string }>;

const getFilterLabel = (filterKey: IRoutineFilterName) => {
  const filter = routinesFilterConfig.find((item) => item.key === filterKey);
  return filter?.label ?? filterKey;
};

const toFilterOptions = (items: { title: string }[] | undefined) =>
  items?.map((item) => ({ label: item.title, value: item.title })) ?? [];

function RoutinesContent(): React.ReactNode {
  const pageParser = parseAsInteger.withDefault(PAGE_SIZE);
  const textParser = parseAsString.withDefault('').withOptions({ history: 'replace' });

  const [page, setPage] = useQueryState('page', pageParser);
  const [search] = useQueryState('search', textParser);
  const debouncedSearch = useDebounce(search, 500);
  const [filters, setFilters] = useQueryStates({
    main_goal: textParser,
    workout_type: textParser,
    level: textParser,
    duration: textParser,
    days_per_week: textParser,
    equipment: textParser,
    gender: textParser,
    category: textParser,
  });

  const mainGoalFilter = useRoutinesFilter('main_goal');
  const workoutTypeFilter = useRoutinesFilter('workout_type');
  const levelFilter = useRoutinesFilter('level');
  const durationFilter = useRoutinesFilter('duration');
  const daysPerWeekFilter = useRoutinesFilter('days_per_week');
  const equipmentFilter = useRoutinesFilter('equipment');
  const genderFilter = useRoutinesFilter('gender');
  const categoryFilter = useRoutinesFilter('category');

  const queryFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [filters, debouncedSearch],
  );

  const routinesFilterData = useMemo(
    () => ({
      main_goal: toFilterOptions(mainGoalFilter.data),
      workout_type: toFilterOptions(workoutTypeFilter.data),
      level: toFilterOptions(levelFilter.data),
      duration: toFilterOptions(durationFilter.data),
      days_per_week: toFilterOptions(daysPerWeekFilter.data),
      equipment: toFilterOptions(equipmentFilter.data),
      gender: toFilterOptions(genderFilter.data),
      category: toFilterOptions(categoryFilter.data),
    }),
    [
      mainGoalFilter.data,
      workoutTypeFilter.data,
      levelFilter.data,
      durationFilter.data,
      daysPerWeekFilter.data,
      equipmentFilter.data,
      genderFilter.data,
      categoryFilter.data,
    ],
  );

  const isFiltersLoading =
    mainGoalFilter.isLoading ||
    workoutTypeFilter.isLoading ||
    levelFilter.isLoading ||
    durationFilter.isLoading ||
    daysPerWeekFilter.isLoading ||
    equipmentFilter.isLoading ||
    genderFilter.isLoading ||
    categoryFilter.isLoading;

  const {
    isLoading,
    data: routines,
    error,
    refetch,
    isRefetching,
  } = useRoutines(PAGE_LIMIT, page, queryFilters);

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
      main_goal: null,
      workout_type: null,
      level: null,
      duration: null,
      days_per_week: null,
      equipment: null,
      gender: null,
      category: null,
    });
    setPage(PAGE_SIZE, { history: 'replace' });
  }, [setFilters, setPage]);

  if (isLoading || isFiltersLoading) return <RoutinesSkeleton />;

  const filterSections: FilterConfig<FilterKey>[] = routinesFilterConfig.map((filter) => ({
    key: filter.key,
    label: getFilterLabel(filter.key),
    options: routinesFilterData[filter.key],
  }));

  return (
    <section className='mb-12 space-y-12'>
      <SearchBar placeholder='Search routines, muscles, or goals...' />
      <FilterSection
        title='Routine Filters'
        filters={filterSections}
        values={filters}
        onChange={onFilterChange}
        onReset={clearAllFilters}
      />
      {isRefetching ? (
        <>
          <div className='w-full lg:grid lg:grid-cols-2 2xl:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <RoutineCardSkeleton key={i} />
            ))}
          </div>
          <PaginationSkeleton />
        </>
      ) : (
        <>
          <div className='w-full lg:grid lg:grid-cols-2 2xl:grid-cols-3'>
            {routines?.data.map((eachroutine: IRoutine) => {
              return (
                <Link key={eachroutine.id_} href={`/routines/${eachroutine.id_}`}>
                  <RoutineCard
                    key={eachroutine.id_}
                    routine_title={eachroutine.routine.routine_title}
                    routine_description={eachroutine.routine.routine_description}
                    routine_imageUrl={eachroutine.routine.routine_imageUrl}
                  />
                </Link>
              );
            })}
          </div>

          {routines && routines.data.length === 0 && (
            <div className='flex h-full w-full items-center justify-center'>
              <h1 className='text-2xl font-bold text-gray-500'>No routines found.</h1>
            </div>
          )}

          <PaginationProvider currentPage={page} totalPages={routines?.totalPages || 0} />
        </>
      )}
    </section>
  );
}

export default function RoutinesClient(): React.ReactNode {
  return (
    <Suspense fallback={<RoutinesSkeleton />}>
      <RoutinesContent />
    </Suspense>
  );
}
