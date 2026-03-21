'use client';

import { DataLoadingSkeleton } from '@/components/data-loading-skeleton';
import { Card } from '@/components/exercise-card';
import useEquipments from '@/features/equipments/services/use-get-equipments';
import type { IEquipment } from '@/features/equipments/types';
import { useErrorHandler } from '@/lib/error-utils';
import { useEffect } from 'react';

export default function EquipmentsClient() {
  const { equipments, isLoading, error, refetch, isRefetching } = useEquipments();
  const { handleError } = useErrorHandler();

  useEffect(() => {
    if (error) {
      handleError(error, refetch);
    }
  }, [error]);

  if (isLoading || isRefetching) return <DataLoadingSkeleton />;

  return (
    <div className={'no-scrollbar container w-full overflow-y-scroll pb-4'}>
      <div className={'w-full lg:grid lg:grid-cols-2 2xl:grid-cols-3'}>
        {equipments?.data.map((equipment: IEquipment) => {
          return (
            <Card
              key={equipment.equipment}
              name={equipment.equipment}
              image={equipment.imageUrl}
              path={'equipments'}
            />
          );
        })}
      </div>
    </div>
  );
}
