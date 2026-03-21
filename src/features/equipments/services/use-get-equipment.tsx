import type { IExerciseData } from '@/features/exercises/types';
import { apiCaller } from '@/lib/api-caller';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const equipmentExercisesQueryKey = (
  searchedEquipment: string | undefined,
  limit: number,
  page: number,
) => ['equipment', searchedEquipment, limit, page] as const;

export const getEquipmentExercises = async (
  searchedEquipment: string | undefined,
  limit: number,
  page: number,
): Promise<IExerciseData> => {
  const equipment = await apiCaller.get<IExerciseData>('exercises', {
    params: { equipment: searchedEquipment, limit, page },
  });
  return equipment.data;
};

export const useEquipment = (
  searchedEquipment: string | undefined,
  limit: number = 9,
  page: number = 1,
) => {
  const {
    isLoading,
    data: equipment,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: equipmentExercisesQueryKey(searchedEquipment, limit, page),
    queryFn: () => getEquipmentExercises(searchedEquipment, limit, page),
    placeholderData: keepPreviousData,
  });
  return { isLoading, equipment, error, refetch, isRefetching };
};
