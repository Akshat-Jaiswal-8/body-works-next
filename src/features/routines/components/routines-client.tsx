'use client';

import { DataLoadingSkeleton } from '@/components/data-loading-skeleton';
import { PaginationProvidor } from '@/components/pagination-providor';
import { RoutineCard } from '@/components/routine-card';
import useRoutines from '@/features/routines/services/use-get-routines';
import type { IRoutine } from '@/features/routines/types';
import { useQueryErrorHandler } from '@/hooks/use-query-error-handler';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

function RoutinesContent(): React.ReactNode {
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get('page')) || 1;

  const { isLoading, routines, error, refetch, isRefetching } = useRoutines(9, page);

  useQueryErrorHandler(error, refetch);

  if (isLoading || isRefetching) return <DataLoadingSkeleton />;

  return (
    <section className='mb-12 space-y-12'>
      <div className={'w-full lg:grid lg:grid-cols-2 2xl:grid-cols-3'}>
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

      <PaginationProvidor currentPage={page} totalPages={routines?.totalPages || 0} />
    </section>
  );
}

export default function RoutinesClient(): React.ReactNode {
  return (
    <Suspense fallback={<DataLoadingSkeleton />}>
      <RoutinesContent />
    </Suspense>
  );
}
