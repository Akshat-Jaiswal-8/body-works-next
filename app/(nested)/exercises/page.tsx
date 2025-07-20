"use client";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import useExercises from "@/hooks/useExercises";

import { useErrorHandler } from "@/lib/error-utils";
import { DataLoadingSkeleton } from "@/components/DataLoadingSkeleton";
import { DescriptedCard } from "@/components/DescriptedCard";
import { PaginationProvidor } from "@/components/pagination-providor";
import { SearchBar } from "@/components/search-bar";

function Exercises() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { handleError } = useErrorHandler();

  const page = Number(searchParams?.get("page")) || 1;

  const { isLoading, exercises, error, refetch, isRefetching } = useExercises(
    50,
    page
  );

  useEffect(() => {
    if (error) {
      handleError(error, refetch);
    }
  }, [error]);

  const getSearchQuery = useCallback(
    (query: string) => {
      console.log("rendered on the page change.");

      if (query) {
        router.push(`/exercises?search=${query}`);
      } else {
        const url = `${pathName}?${searchParams}`;
        router.push(url);
      }
    },
    [router, pathName, searchParams]
  );

  if (isLoading || isRefetching) {
    return <DataLoadingSkeleton />;
  }

  if (exercises && exercises.data.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-500">
          No exercises found.
        </h1>
      </div>
    );
  }

  return (
    <>
      <SearchBar getQuery={getSearchQuery} />
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

      <PaginationProvidor
        currentPage={page}
        totalPages={exercises?.totalPages || 0}
      />
    </>
  );
}
export default Exercises;
