'use client';

import { WorkoutSummaryTable } from '@/components/shared/workout-summary-table';
import { Skeleton } from '@/components/ui/skeleton';
import { useRoutine } from '@/features/routines/services/use-get-routine';
import { useQueryErrorHandler } from '@/hooks/use-query-error-handler';
import { markdownToHtml } from '@/lib/markdown-to-html';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function RoutineClient() {
  const params = useParams();
  const routineId = params?.routine as string;
  const {
    isLoading,
    data: routine,
    error,
    refetch,
    isRefetching,
  } = useRoutine({
    routineId,
  });

  useQueryErrorHandler(error, refetch);

  if (isLoading || isRefetching)
    return (
      <div className='relative mt-10 h-full min-h-screen w-full overflow-x-hidden'>
        <div className='mt-16 grid justify-center gap-5 lg:grid-cols-2'>
          <div className='col-span-1 border-t border-b border-double border-black/10 py-10 dark:border-gray-800'>
            <div className='flex flex-col gap-4'>
              <Skeleton className='h-10 w-3/4 rounded-md' />
              <Skeleton className='h-6 w-full rounded-md' />
              <Skeleton className='h-6 w-5/6 rounded-md' />
            </div>
          </div>
          <Skeleton className='h-80 w-full rounded-3xl' />
        </div>
        <div className='mt-10 flex gap-4 overflow-x-auto'>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className='h-8 w-24 shrink-0 rounded-md' />
          ))}
        </div>
        <Skeleton className='mt-12 h-8 w-48 rounded-md' />
        <Skeleton className='mt-6 h-64 w-full rounded-2xl' />
        <Skeleton className='mt-12 h-8 w-48 rounded-md' />
        <div className='mt-6 space-y-4'>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className='h-40 w-full rounded-2xl' />
          ))}
        </div>
      </div>
    );

  {
    return (
      routine && (
        <div className={'relative mt-10 h-full min-h-screen w-full overflow-x-hidden'}>
          <div className='mt-16 grid justify-center gap-5 md:mb-12 lg:mb-28 lg:grid-cols-2'>
            <div className='xs:py-6 col-span-1 gap-16 border-t border-b border-double border-amber-900 md:py-12 dark:border-pink-500'>
              <div className='flex flex-col md:gap-4 lg:gap-8'>
                <h1 className='font-poppins xs:text-3xl mb-4 bg-linear-to-r from-amber-800 to-amber-500 bg-clip-text py-2 text-left font-bold text-transparent md:text-4xl xl:text-5xl dark:from-pink-500 dark:to-violet-700'>
                  {routine.routine.routine_title}
                </h1>
                <div className='font-montserrat text-xl font-semibold text-amber-800 dark:text-gray-300'>
                  {routine.routine.routine_description}
                </div>
              </div>
            </div>

            <div className='xs:my-10 mx-auto flex justify-between md:col-span-full lg:col-span-1 lg:my-20'>
              <Image
                height={1000}
                width={1000}
                quality={100}
                alt='exercise gif'
                className='rounded-3xl shadow-sm shadow-amber-900 drop-shadow-2xl'
                src={routine.routine.routine_imageUrl}
              />
            </div>
          </div>
          <div className='xs:mb-16 xs:text-xs flex w-full justify-evenly gap-x-5 overflow-x-auto border-t border-b border-dotted border-amber-900 text-nowrap sm:text-sm md:mb-20 xl:text-xl dark:border-gray-500'>
            {routine.category.map((eachCategory: string) => {
              return (
                <Link
                  href={{
                    pathname: '/routines',
                    search: `?category=${eachCategory}`,
                  }}
                  key={eachCategory}
                  className='my-6 bg-linear-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent dark:from-pink-600 dark:to-violet-400'
                >
                  {eachCategory}
                </Link>
              );
            })}
          </div>
          <div>
            <h1 className='mb-12 text-center text-4xl font-bold text-amber-900 underline decoration-amber-900 decoration-dashed underline-offset-8 dark:text-pink-500 dark:decoration-pink-400'>
              Workout Summary
            </h1>
          </div>
          <div className='col-span-4 mb-12 rounded-2xl border border-dashed border-gray-700'>
            <WorkoutSummaryTable data={routine.routine.workout_summary} />
          </div>
          <div>
            <h1 className='xs:text-center mb-12 text-4xl font-bold text-amber-900 underline decoration-amber-900 decoration-dashed underline-offset-8 dark:text-pink-500 dark:decoration-pink-400'>
              Workout Plan
            </h1>
          </div>
          <div className='col-span-4 mb-12 rounded-2xl border border-amber-900 dark:border-gray-700'>
            {routine.routine.workout_plan.map(
              ({ day_plan, heading }: { day_plan: string; heading: string }) => (
                <div key={heading} className={'px-4 py-4 text-amber-800 dark:text-gray-200'}>
                  <h3 className='xs:mb-4 text-2xl font-semibold text-amber-900 underline decoration-dashed underline-offset-8 lg:mb-8 dark:text-pink-400 dark:decoration-pink-400'>
                    {heading}
                  </h3>
                  <div
                    className='workout-plan-markdown-content rounded-2xl border border-dashed border-amber-900 dark:border-gray-700'
                    dangerouslySetInnerHTML={{
                      __html: markdownToHtml(day_plan),
                    }}
                  />
                </div>
              ),
            )}
          </div>
        </div>
      )
    );
  }
}
