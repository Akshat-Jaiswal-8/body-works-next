import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { memo } from 'react';

export const DataLoadingSkeleton = memo(() => {
  return (
    <div
      className={cn(
        'mx-auto mt-16 grid w-full justify-items-center gap-10 md:grid-cols-2 lg:grid-cols-3',
      )}
    >
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className={'h-100 w-72 rounded-xl'} />
      ))}
    </div>
  );
});

DataLoadingSkeleton.displayName = 'DataLoadingSkeleton';
