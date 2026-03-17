import { apiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const getEquipments = async (limit?: number): Promise<IEquipmentData> => {
  const equipments = await apiCaller.get<IEquipmentData>('equipments', {
    params: {
      limit,
    },
  });
  return equipments.data;
};

const useEquipments = (limit?: number) => {
  const {
    isLoading,
    data: equipments,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['equipments', limit],
    queryFn: () => getEquipments(limit),
    placeholderData: keepPreviousData,
  });
  return { isLoading, equipments, error, refetch, isRefetching };
};

export default useEquipments;
