"use client";
import { useEffect } from "react";
import { useTargetMuscle } from "@/hooks/useTargetMuscle";
import { useErrorHandler } from "@/lib/error-utils";
import { useParams, useSearchParams } from "next/navigation";

import { DataLoadingSkeleton } from "@/components/DataLoadingSkeleton";
import { DescriptedCard } from "@/components/DescriptedCard";
import { PaginationProvidor } from "@/components/PaginationProvidor";

function TargetMuscle() {
  const params = useParams();
  const searchParams = useSearchParams();
  const searchTargetMuscle = params?.["target-muscle"] as string;
  const { handleError } = useErrorHandler();

  const page = Number(searchParams?.get("page")) || 1;

  const { targetMuscle, isLoading, error, refetch, isRefetching } =
    useTargetMuscle(searchTargetMuscle, 9, page);

  useEffect(() => {
    if (error) {
      handleError(error, refetch);
    }
  }, [error]);

  if (isLoading || isRefetching) return <DataLoadingSkeleton />;

  return (
    <section className="space-y-12 mb-12">
      <div className="grid w-full lg:grid-cols-2 xl:grid-cols-3">
        {targetMuscle?.data.map((targetMuscle: IExercise) => {
          return (
            <DescriptedCard
              id={targetMuscle.id_}
              key={targetMuscle.id_}
              gif={targetMuscle.gifUrl}
              title={targetMuscle.title}
              blog={targetMuscle.blog}
            />
          );
        })}
      </div>
      <PaginationProvidor
        currentPage={page}
        totalPages={targetMuscle?.totalPages || 0}
      />
    </section>
  );
}

export default TargetMuscle;
