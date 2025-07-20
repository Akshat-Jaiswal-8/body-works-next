"use client";
import { useEffect } from "react";
import { useBodyPart } from "@/hooks/useBodyPart";
import { useErrorHandler } from "@/lib/error-utils";
import { useParams, useSearchParams } from "next/navigation";

import { DataLoadingSkeleton } from "@/components/DataLoadingSkeleton";
import { DescriptedCard } from "@/components/DescriptedCard";
import { PaginationProvidor } from "@/components/pagination-providor";

function BodyPart() {
  const { handleError } = useErrorHandler();
  const params = useParams();
  const searchParams = useSearchParams();

  const bodypart = params?.["body-part"] as string;
  const page = Number(searchParams?.get("page")) || 1;

  const { isLoading, bodyPart, error, refetch, isRefetching } = useBodyPart(
    bodypart,
    9,
    page
  );

  useEffect(() => {
    if (error) {
      handleError(error, refetch);
    }
  }, [error]);

  if (isLoading || isRefetching) return <DataLoadingSkeleton />;

  return (
    <section className="space-y-12 mb-12">
      <div className="grid w-full lg:grid-cols-2 xl:grid-cols-3">
        {bodyPart?.data.map((bodyPart: IExercise) => {
          return (
            <DescriptedCard
              id={bodyPart.id_}
              key={bodyPart.id_}
              gif={bodyPart.gifUrl}
              title={bodyPart.title}
              blog={bodyPart.blog}
            />
          );
        })}
      </div>
      <PaginationProvidor
        currentPage={page}
        totalPages={bodyPart?.totalPages || 0}
      />
    </section>
  );
}

export default BodyPart;
