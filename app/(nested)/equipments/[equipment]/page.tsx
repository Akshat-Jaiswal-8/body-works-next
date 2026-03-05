'use client';

import { DataLoadingSkeleton } from '@/components/data-loading-skeleton';
import { DescriptedCard } from '@/components/descripted-card';
import { PaginationProvidor } from '@/components/pagination-providor';
import { useEquipment } from '@/hooks/useEquipment';
import { useErrorHandler } from '@/lib/error-utils';
import { useParams, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function EquipmentContent() {
  const { handleError } = useErrorHandler();
  const params = useParams();
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get('page')) || 1;
  const searchedEquipment = params?.equipment as string;

  const { equipment, isLoading, error, refetch, isRefetching } = useEquipment(
    searchedEquipment,
    9,
    page,
  );

  useEffect(() => {
    if (error) {
      handleError(error, refetch);
    }
  }, [error]);

  if (isLoading || isRefetching) return <DataLoadingSkeleton />;

  return (
    <section className='mb-12 space-y-12'>
      <div className={'w-full lg:grid lg:grid-cols-2 2xl:grid-cols-3'}>
        {equipment?.data.map((Equipment: IExercise) => {
          return (
            <DescriptedCard
              id={Equipment.id_}
              key={Equipment.id_}
              gif={Equipment.gifUrl}
              title={Equipment.title}
              blog={Equipment.blog}
            />
          );
        })}
      </div>
      <PaginationProvidor currentPage={page} totalPages={equipment?.totalPages || 0} />
    </section>
  );
}

function Equipment() {
  return (
    <Suspense fallback={<DataLoadingSkeleton />}>
      <EquipmentContent />
    </Suspense>
  );
}

export default Equipment;
