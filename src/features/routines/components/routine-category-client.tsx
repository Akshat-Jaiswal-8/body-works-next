'use client';

import { withTaxonomyCardsClient } from '@/components/with-taxonomy-cards-client';
import { useRoutinesCategory } from '@/features/routines/services/use-get-routines-category';
import type { IRoutineCategory } from '@/features/routines/types';

const useRoutineCategoriesData = () => {
  const { routineCategory, isLoading, error, refetch, isRefetching } = useRoutinesCategory();

  return {
    items: routineCategory,
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
  getSearchName: (item) => item.title,
  path: 'routines',
  wrapperClassName: 'no-scrollbar container w-full overflow-y-scroll pb-4',
  gridClassName: 'lg:grid lg:grid-cols-2 2xl:grid-cols-3',
});

export default RoutineCategoryClient;
