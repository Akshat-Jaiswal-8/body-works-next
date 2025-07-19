import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiCaller } from "@/lib/apiCaller";

const getEquipment = async (
  searchedEquipment: string | undefined,
  limit: number,
  page: number
): Promise<IExerciseData> => {
  const equipment = await apiCaller.get<IExerciseData>("exercises", {
    params: { equipment: searchedEquipment, limit, page },
  });
  return equipment.data;
};

export const useEquipment = (
  searchedEquipment: string | undefined,
  limit: number = 9,
  page: number = 1
) => {
  const {
    isLoading,
    data: equipment,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["equipment", limit, page],
    queryFn: () => getEquipment(searchedEquipment, limit, page),
    placeholderData: keepPreviousData,
  });
  return { isLoading, equipment, error, refetch, isRefetching };
};
