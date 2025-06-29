import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiCaller } from "@/lib/apiCaller";

const getBodyPart = async (
  bodyPart: string | undefined,
  limit: number,
  page: number
): Promise<IExercise> => {
  const bodypart = await apiCaller.get<IExerciseResponse>("exercises", {
    params: {
      bodyPart,
      limit,
      page,
    },
  });
  return bodypart.data.data;
};

export const useBodyPart = (
  bodypart: string | undefined,
  limit: number,
  page: number
) => {
  const {
    isLoading,
    data: bodyPart,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["body-part", limit, page],
    queryFn: () => getBodyPart(bodypart, limit, page),
    placeholderData: keepPreviousData,
  });
  return { isLoading, bodyPart, error, refetch, isRefetching };
};
