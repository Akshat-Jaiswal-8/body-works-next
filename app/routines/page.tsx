"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import useRoutines from "@/hooks/useRoutines";
import { useErrorHandler } from "@/lib/error-utils";
import { useSearchParams } from "next/navigation";

import { DataLoadingSkeleton } from "@/components/DataLoadingSkeleton";
import { PaginationProvidor } from "@/components/pagination-providor";
import RoutineCard from "@/components/routine-card";

function Routines(): React.ReactNode {
  const { handleError } = useErrorHandler();
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get("page")) || 1;

  const { isLoading, routines, error, refetch, isRefetching } = useRoutines(
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
      <div className={"w-full lg:grid lg:grid-cols-2 2xl:grid-cols-3"}>
        {routines?.data.map((eachroutine: IRoutine) => {
          return (
            <Link key={eachroutine.id_} href={`/routines/${eachroutine.id_}`}>
              <RoutineCard
                key={eachroutine.id_}
                routine_title={eachroutine.routine.routine_title}
                routine_description={eachroutine.routine.routine_description}
                routine_imageUrl={eachroutine.routine.routine_imageUrl}
              />
            </Link>
          );
        })}
      </div>

      <PaginationProvidor
        currentPage={page}
        totalPages={routines?.totalPages || 0}
      />
    </section>
  );
}

export default Routines;
