import { useQuery } from "@tanstack/react-query";
import { apiCaller } from "@/lib/apiCaller";

const getRoutineCategories = async (): Promise<IRoutineCategory[]> => {
  const routineCategory = await apiCaller.get<IRoutineCategoryResponse>(
    "routines/filters?filter=category"
  );

  return routineCategory.data.data.category;
};

export const useRoutinesCategory = () => {
  const {
    isLoading,
    data: routineCategory,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["routine-categories"],
    queryFn: getRoutineCategories,
  });
  return { isLoading, routineCategory, error, refetch, isRefetching };
};
