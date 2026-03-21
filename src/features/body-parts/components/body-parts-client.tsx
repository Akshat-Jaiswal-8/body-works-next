'use client';

import { DataLoadingSkeleton } from '@/components/data-loading-skeleton';
import { Card } from '@/components/exercise-card';
import { useBodyParts } from '@/features/body-parts/services/use-get-body-parts';
import type { IBodyPart } from '@/features/body-parts/types';
import { useErrorHandler } from '@/lib/error-utils';
import { useEffect } from 'react';

export default function BodyPartsClient() {
  const { isLoading, bodyParts, error, isRefetching, refetch } = useBodyParts();

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
    <div className={'w-full lg:grid lg:grid-cols-2 2xl:grid-cols-3'}>
      {bodyParts?.data.map((bodyPart: IBodyPart) => {
        return (
          <Card
            key={bodyPart.bodyPart}
            name={bodyPart.bodyPart}
            image={bodyPart.imageUrl}
            path={'body-parts'}
          />
        );
      })}
    </div>
  );
}
