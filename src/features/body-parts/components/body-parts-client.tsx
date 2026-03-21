'use client';

import { withTaxonomyCardsClient } from '@/components/with-taxonomy-cards-client';
import { useBodyParts } from '@/features/body-parts/services/use-get-body-parts';
import type { IBodyPart } from '@/features/body-parts/types';

const useBodyPartsData = () => {
  const { isLoading, bodyParts, error, isRefetching, refetch } = useBodyParts();

  return {
    items: bodyParts?.data,
    isLoading,
    isRefetching,
    error,
    refetch,
  };
};

const BodyPartsClient = withTaxonomyCardsClient<IBodyPart>({
  useData: useBodyPartsData,
  getKey: (item) => item.bodyPart,
  getName: (item) => item.bodyPart,
  getImage: (item) => item.imageUrl,
  path: 'body-parts',
  gridClassName: 'lg:grid lg:grid-cols-2 2xl:grid-cols-3',
});

export default BodyPartsClient;
