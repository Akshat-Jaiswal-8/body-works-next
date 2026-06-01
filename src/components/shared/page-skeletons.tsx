import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { memo } from 'react';

function SearchBarSkeleton() {
  return (
    <div className='mx-auto w-full max-w-4xl'>
      <Skeleton className='h-14 w-full rounded-xl' />
    </div>
  );
}

function FilterSectionSkeleton({ filterCount = 3 }: { filterCount?: number }) {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-2xl border border-black/20 bg-white/90 p-5 md:p-6',
      )}
    >
      <div className='space-y-4'>
        <div className='flex items-center justify-between gap-4'>
          <Skeleton className='h-6 w-24 rounded-md' />
          <Skeleton className='h-8 w-24 rounded-md' />
        </div>
        <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-3'>
          {Array.from({ length: filterCount }).map((_, i) => (
            <div key={i} className='space-y-2'>
              <Skeleton className='h-4 w-16 rounded-md' />
              <Skeleton className='h-11 w-full rounded-full' />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const RoutineCardSkeleton = memo(() => {
  return (
    <div className='xs:max-w-[16rem] min-h-fit sm:max-w-80 lg:max-w-70'>
      <div className='relative mt-10 flex h-auto flex-col items-center justify-center space-y-6 overflow-hidden rounded-xl border border-black/20 bg-gray-50 p-6'>
        <Skeleton className='h-7 w-3/4 rounded-md' />
        <Skeleton className='h-60 w-full rounded-xl' />
        <div className='w-full space-y-2'>
          <Skeleton className='h-4 w-full rounded-md' />
          <Skeleton className='h-4 w-5/6 rounded-md' />
          <Skeleton className='h-4 w-2/3 rounded-md' />
        </div>
      </div>
    </div>
  );
});

export const ExerciseCardSkeleton = memo(() => {
  return (
    <div className='xs:max-w-[16rem] h-full min-h-fit sm:max-w-80 lg:max-w-70'>
      <div className='relative mt-10 flex h-full flex-col items-center justify-center space-y-6 overflow-hidden rounded-xl border border-black/20 bg-gray-50 p-6'>
        <Skeleton className='h-7 w-3/4 rounded-md' />
        <Skeleton className='h-60 w-full rounded-xl' />
        <div className='w-full space-y-2'>
          <Skeleton className='h-4 w-full rounded-md' />
          <Skeleton className='h-4 w-5/6 rounded-md' />
          <Skeleton className='h-4 w-2/3 rounded-md' />
        </div>
      </div>
    </div>
  );
});

export const PaginationSkeleton = memo(() => {
  return (
    <div className='mt-10 flex justify-center'>
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

export const RoutinesSkeleton = memo(() => {
  return (
    <section className='mb-12 space-y-12'>
      <SearchBarSkeleton />
      <FilterSectionSkeleton filterCount={8} />
      <div className='w-full lg:grid lg:grid-cols-2 2xl:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <RoutineCardSkeleton key={i} />
        ))}
      </div>
      <PaginationSkeleton />
    </section>
  );
});

export const ExercisesSkeleton = memo(() => {
  return (
    <section className='mb-12 space-y-12'>
      <SearchBarSkeleton />
      <FilterSectionSkeleton filterCount={3} />
      <div className='h-full w-full md:grid md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <ExerciseCardSkeleton key={i} />
        ))}
      </div>
      <PaginationSkeleton />
    </section>
  );
});

RoutineCardSkeleton.displayName = 'RoutineCardSkeleton';
ExerciseCardSkeleton.displayName = 'ExerciseCardSkeleton';
PaginationSkeleton.displayName = 'PaginationSkeleton';
RoutinesSkeleton.displayName = 'RoutinesSkeleton';
ExercisesSkeleton.displayName = 'ExercisesSkeleton';
