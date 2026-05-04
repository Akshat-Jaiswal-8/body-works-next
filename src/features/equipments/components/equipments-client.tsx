'use client';

import { withTaxonomyCardsClient } from '@/components/shared/with-taxonomy-cards-client';
import { useEquipments } from '@/features/equipments/services/use-get-equipments';
import type { IEquipment } from '@/features/equipments/types';

const useEquipmentsData = () => {
  const { data: equipments, isLoading, error, refetch, isRefetching } = useEquipments();

  return {
    items: equipments?.data,
    isLoading,
    isRefetching,
    error,
    refetch,
  };
};

const EquipmentsClient = withTaxonomyCardsClient<IEquipment>({
  useData: useEquipmentsData,
  getKey: (item) => item.equipment,
  getName: (item) => item.equipment,
  getImage: (item) => item.imageUrl,
  path: 'equipments',
  wrapperClassName: 'no-scrollbar container w-full overflow-y-scroll pb-4',
  gridClassName: 'lg:grid lg:grid-cols-2 2xl:grid-cols-3',
});

export default EquipmentsClient;
