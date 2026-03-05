'use client';
import { useBodyPart } from '@/hooks/useBodyPart';
import { useErrorHandler } from '@/lib/error-utils';
import { useParams, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

import { DataLoadingSkeleton } from '@/components/data-loading-skeleton';
import { DescriptedCard } from '@/components/descripted-card';
import { PaginationProvidor } from '@/components/pagination-providor';

function BodyPartContent() {
  const { handleError } = useErrorHandler();
  const params = useParams();
  const searchParams = useSearchParams();

  const bodypart = params?.['body-part'] as string;
  const page = Number(searchParams?.get('page')) || 1;

  const { isLoading, bodyPart, error, refetch, isRefetching } = useBodyPart(bodypart, 9, page);

  useEffect(() => {
    if (error) {
      handleError(error, refetch);
    }
  }, [error]);

  if (isLoading || isRefetching) return <DataLoadingSkeleton />;

  return (
    <section className='mb-12 space-y-12'>
      <div className='grid w-full lg:grid-cols-2 xl:grid-cols-3'>
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
      <PaginationProvidor currentPage={page} totalPages={bodyPart?.totalPages || 0} />
    </section>
  );
}

function BodyPart() {
  return (
    <Suspense fallback={<DataLoadingSkeleton />}>
      <BodyPartContent />
    </Suspense>
  );
}

export default BodyPart;
