'use client';

import { withTaxonomyCardsClient } from '@/components/shared/with-taxonomy-cards-client';
import { useRoutinesFilter } from '@/features/routines/services/use-get-routines-filter';
import type { IRoutineCategory } from '@/features/routines/types';

const useRoutineCategoriesData = () => {
  const {
    data: routineFilter,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useRoutinesFilter('category');

  return {
    items: routineFilter,
    isLoading,
    isRefetching,
    error,
    refetch,
  };
};

const RoutineCategoryClient = withTaxonomyCardsClient<IRoutineCategory>({
  useData: useRoutineCategoriesData,
  getKey: (item) => item.title,
  getName: (item) => item.title,
  getImage: (item) => item.imageUrl,
  getSearchName: (item) => `?category=${item.title}`,
  path: 'routines',
  wrapperClassName: 'no-scrollbar container w-full overflow-y-scroll pb-4',
  gridClassName: 'lg:grid lg:grid-cols-2 2xl:grid-cols-3',
});

export default RoutineCategoryClient;
