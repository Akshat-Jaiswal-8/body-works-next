import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { memo } from 'react';

export const DataLoadingSkeleton = memo(
  ({ gridClassName = 'lg:grid lg:grid-cols-2 2xl:grid-cols-3' }: { gridClassName?: string }) => {
    return (
      <div className={cn('grid w-full gap-10', gridClassName)}>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className={'h-100 w-full rounded-xl'} />
        ))}
      </div>
    );
  },
);

DataLoadingSkeleton.displayName = 'DataLoadingSkeleton';
