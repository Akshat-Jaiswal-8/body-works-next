'use client';

import { withTaxonomyCardsClient } from '@/components/with-taxonomy-cards-client';
import useTargetMuscles from '@/features/target-muscles/services/use-get-target-muscles';
import type { ITargetMuscle } from '@/features/target-muscles/types';

const useTargetMusclesData = () => {
  const { isLoading, targetMuscle, error, refetch, isRefetching } = useTargetMuscles();

  return {
    items: targetMuscle?.data,
    isLoading,
    isRefetching,
    error,
    refetch,
  };
};

const TargetMusclesClient = withTaxonomyCardsClient<ITargetMuscle>({
  useData: useTargetMusclesData,
  getKey: (item) => item.targetMuscle,
  getName: (item) => item.targetMuscle,
  getImage: (item) => item.imageUrl,
  path: 'target-muscles',
  gridClassName: 'md:grid md:grid-cols-2 lg:grid-cols-3',
});

export default TargetMusclesClient;
