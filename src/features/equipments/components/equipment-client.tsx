'use client';

import { withFilteredExercisesClient } from '@/components/with-filtered-exercises-client';
import { useEquipment } from '@/features/equipments/services/use-get-equipment';

const useEquipmentExercises = (equipment: string | undefined, limit: number, page: number) => {
  const {
    isLoading,
    equipment: data,
    error,
    refetch,
    isRefetching,
  } = useEquipment(equipment, limit, page);

  return {
    data,
    isLoading,
    isRefetching,
    error,
    refetch,
  };
};

const EquipmentClient = withFilteredExercisesClient({
  paramKey: 'equipment',
  useData: useEquipmentExercises,
  gridClassName: 'lg:grid lg:grid-cols-2 2xl:grid-cols-3',
});

export default EquipmentClient;
