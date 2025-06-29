import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiCaller } from "@/lib/apiCaller";

const getTargetMuscle = async (
  targetMuscle: string | undefined,
  limit: number,
  page: number
): Promise<IExercise> => {
  const targetMuscles = await apiCaller.get<IExerciseResponse>("exercises", {
    params: {
      targetMuscle,
      limit,
      page,
    },
  });
  return targetMuscles.data.data;
};

export const useTargetMuscle = (
  targetMuscle: string | undefined,
  limit: number,
  page: number
) => {
  const {
    isLoading,
    data: TargetMuscle,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["target-muscle", limit, page],
    queryFn: () => getTargetMuscle(targetMuscle, limit, page),
    placeholderData: keepPreviousData,
  });
  return { isLoading, TargetMuscle, error, refetch, isRefetching };
};
