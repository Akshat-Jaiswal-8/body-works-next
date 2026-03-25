'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { ExerciseHeader } from '@/features/exercises/components/exercise-header';
import { useExercise } from '@/features/exercises/services/use-get-exercise';
import useDevice from '@/hooks/use-device';
import { useQueryErrorHandler } from '@/hooks/use-query-error-handler';
import { markdownToHtml } from '@/lib/markdown-to-html';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function ExerciseClient() {
  const params = useParams();
  const exerciseId = params?.['exercise-id'] as string;

  const { exercise, isLoading, refetch, error, isRefetching } = useExercise(exerciseId);

  const { isMobile } = useDevice();

  useQueryErrorHandler(error, refetch);

  const sanitizedBlog = exercise?.blog ? DOMPurify.sanitize(exercise.blog) : null;

  if (isLoading || isRefetching) {
    return (
      <div className={'container mx-auto h-screen w-full pt-[calc(var(--navbar-height)+4rem)]'}>
        <div className={'my-10'}>
          <Skeleton className={'h-20 w-1/2'} />
          <Skeleton className={'mt-10 min-h-[60vh] w-full'} />
        </div>
      </div>
    );
  }

  return (
    <section className='container'>
      {exercise && (
        <div className={'h-full w-full space-y-20 sm:space-y-40'}>
          <div className='mt-16 justify-center gap-5 lg:grid lg:grid-cols-2'>
            <div className='col-span-1 border-t border-b border-double border-amber-900 py-10 dark:border-pink-500'>
              <div className='xs:gap-8 flex h-full flex-col justify-center md:gap-4 lg:gap-8'>
                <h1 className='xs:text-3xl bg-linear-to-r from-amber-800 to-amber-500 bg-clip-text font-bold text-transparent md:text-4xl xl:text-5xl dark:from-pink-500 dark:to-violet-700'>
                  {exercise?.title?.charAt(0).toUpperCase() + exercise?.title?.slice(1)}
                </h1>
                <ExerciseHeader title={'Target Muscle'} content={exercise?.target} />
                <ExerciseHeader title={'Body Part'} content={exercise?.bodyPart} />
                <ExerciseHeader title={'Equipment'} content={exercise?.equipment} />
                <ExerciseHeader title={'Muscle Worked'} content={exercise?.['muscles_worked']} />
              </div>
            </div>
            <div className='mx-auto flex justify-between py-10 lg:col-span-1'>
              <Image
                src={exercise?.gifUrl}
                alt='exercise gif'
                className='mx-auto h-80 w-fit rounded-3xl drop-shadow-2xl sm:h-96 md:w-full'
                height={1000}
                width={1000}
                quality={75}
                unoptimized
              />
            </div>
          </div>
          {exercise.images?.length > 0 && (
            <div className='space-y-6 px-8 md:space-y-10'>
              <h1 className='xs:text-xl text-lg font-bold underline underline-offset-4 md:text-2xl md:underline-offset-8 lg:text-3xl dark:text-gray-200'>
                Reference Images
              </h1>
              <Carousel
                className='xs:mt-20 xs:mx-auto w-full lg:mx-0'
                orientation={isMobile ? 'vertical' : 'horizontal'}
                opts={{
                  align: 'start',
                }}
              >
                <CarouselContent className='h-[24rem] w-full'>
                  {exercise?.images?.map((image: string) => (
                    <CarouselItem
                      className='inline-flex basis-full justify-center sm:basis-1/2 md:basis-1/2 lg:basis-1/3'
                      key={image}
                    >
                      <Image
                        src={image}
                        alt={'exercise image'}
                        className='h-[23rem] rounded-2xl border-2 object-contain md:rounded-3xl'
                        height={1000}
                        width={1000}
                        quality={100}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className='sm:flex' />
                <CarouselNext className='sm:flex' />
              </Carousel>
            </div>
          )}
          {exercise.videos?.length > 0 && (
            <div className='space-y-6 px-8 md:space-y-10'>
              <h1 className='xs:text-xl text-lg font-bold underline underline-offset-4 md:text-2xl md:underline-offset-8 lg:text-3xl dark:text-gray-200'>
                Reference Videos
              </h1>
              <Carousel
                className='xs:mt-20 xs:mx-auto w-full lg:mx-0'
                orientation={isMobile ? 'vertical' : 'horizontal'}
                opts={{
                  align: 'start',
                }}
              >
                <CarouselContent className='h-[24rem] w-full'>
                  {exercise?.videos?.map((video: string) => (
                    <CarouselItem
                      className='inline-flex basis-full justify-center sm:basis-1/2 md:basis-1/2 lg:basis-1/3'
                      key={video}
                    >
                      <iframe
                        key={video}
                        className='h-[23rem] w-full rounded-lg border-2 md:rounded-xl'
                        src={
                          video.includes('youtube.com/watch')
                            ? video.replace(
                                /youtube\.com\/watch\?v=([^&]+)/,
                                'youtube.com/embed/$1',
                              )
                            : video
                        }
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}

          <div className='mb-16 text-left'>
            {sanitizedBlog ? (
              <div
                className='markdown-content rounded-2xl border border-amber-700 p-4 text-amber-800 dark:border-gray-700 dark:text-gray-200'
                dangerouslySetInnerHTML={{
                  __html: markdownToHtml(sanitizedBlog || ''),
                }}
              />
            ) : (
              <p className='text-center text-2xl text-amber-800 dark:text-gray-200'>
                No additional information available for this exercise.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
