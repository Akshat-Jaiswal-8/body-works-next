import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiCaller } from "@/lib/apiCaller";

const getEquipment = async (
  equipment: string | undefined,
  limit: number,
  page: number
): Promise<IExercise> => {
  const Equipment = await apiCaller.get<IExerciseResponse>("exercises", {
    params: { equipment, limit, page },
  });
  return Equipment.data.data;
};

export const useEquipment = (
  equipment: string | undefined,
  limit: number = 9,
  page: number = 1
) => {
  const {
    isLoading,
    data: Equipment,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["equipment", limit, page],
    queryFn: () => getEquipment(equipment, limit, page),
    placeholderData: keepPreviousData,
  });
  return { isLoading, Equipment, error, refetch, isRefetching };
};
