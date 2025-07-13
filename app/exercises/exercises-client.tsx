"use client";
import { SectionWrapper } from "@/components/SectionWrapper";
import { useEffect, useState } from "react";
import useExercises from "@/hooks/useExercises";
import { useErrorHandler } from "@/lib/error-utils";
import { DataLoadingSkeleton } from "@/components/DataLoadingSkeleton";
import { cn } from "@/lib/utils";
import { DescriptedCard } from "@/ui/DescriptedCard";
import { PaginationProvidor } from "@/components/PaginationProvidor";

export default function ExercisesClient() {
  const [page, setPage] = useState<number>(1);

  const { isLoading, exercises, error, refetch, isRefetching } = useExercises(
    9,
    page
  );

  console.log(exercises);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const { handleError } = useErrorHandler();

  useEffect(() => {
    if (error) {
      handleError(error, refetch);
    }
  }, [error]);

  if (isLoading || isRefetching) {
    return <DataLoadingSkeleton />;
  }
  return (
    <SectionWrapper>
      <div
        className={cn("no-scrollbar container w-full overflow-y-scroll pb-4")}
      >
        <div className={cn("w-full lg:grid lg:grid-cols-2 2xl:grid-cols-3")}>
          {exercises?.data.map((exercise: IExercise) => {
            return (
              <DescriptedCard
                key={exercise.id_}
                id={exercise.id_}
                gif={exercise.gifUrl}
                title={exercise.title}
                blog={exercise.blog}
              />
            );
          })}
        </div>
      </div>
      <PaginationProvidor
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    </SectionWrapper>
  );
}
