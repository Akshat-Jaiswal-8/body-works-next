import type { IEquipmentData } from '@/features/equipments/types';
import { publicApiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const equipmentsQueryKey = (limit?: number) => ['equipments', limit] as const;

export const getEquipments = async (limit?: number): Promise<IEquipmentData> => {
  const equipments = await publicApiCaller.get<IEquipmentData>('equipments', {
    params: {
      limit,
    },
  });
  return equipments.data;
};

export const useEquipments = (limit?: number) => {
  return useQuery({
    queryKey: equipmentsQueryKey(limit),
    queryFn: () => getEquipments(limit),
    placeholderData: keepPreviousData,
  });
};
