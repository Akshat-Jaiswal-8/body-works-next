import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { memo } from 'react';

export const PaginationSkeleton = memo(() => {
  return (
    <div className={cn('mt-10 flex justify-center')}>
      <div className='flex items-center gap-2'>
        <Skeleton className='h-10 w-20 rounded-md' />
        <Skeleton className='h-10 w-10 rounded-md' />
        <Skeleton className='h-10 w-10 rounded-md' />
        <Skeleton className='h-10 w-10 rounded-md' />
        <Skeleton className='h-10 w-20 rounded-md' />
      </div>
    </div>
  );
});

PaginationSkeleton.displayName = 'PaginationSkeleton';
