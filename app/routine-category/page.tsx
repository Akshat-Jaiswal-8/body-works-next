"use client";
import { cn } from "@/lib/utils";
import { useRoutinesCategory } from "@/hooks/useRoutinesCategory";
import { Card } from "@/components/exercise-card";
import { DataLoadingSkeleton } from "@/components/data-loading-skeleton";
import { useEffect } from "react";
import { useErrorHandler } from "@/lib/error-utils";

function RoutineCategory() {
  const { routineCategory, isLoading, error, refetch, isRefetching } =
    useRoutinesCategory();
  const { handleError } = useErrorHandler();

  useEffect(() => {
    if (error) {
      handleError(error, refetch);
    }
  }, [error]);

  if (isLoading || isRefetching) return <DataLoadingSkeleton />;

  return (
    <div className={cn("no-scrollbar container w-full overflow-y-scroll pb-4")}>
      <div className={cn("w-full lg:grid lg:grid-cols-2 2xl:grid-cols-3")}>
        {routineCategory?.map(
          (routineCategory: { title: string; imageUrl: string }) => {
            return (
              <Card
                key={routineCategory.title}
                name={routineCategory.title}
                image={routineCategory.imageUrl}
                searchName={routineCategory.title}
                path={"routines"}
              />
            );
          }
        )}
      </div>
    </div>
  );
}

export default RoutineCategory;
