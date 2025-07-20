"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useExercise } from "@/hooks/useExercise";
import { useErrorHandler } from "@/lib/error-utils";
import { markdownToHtml } from "@/actions/markdown-to-html";

import ExerciseHeaders from "@/app/exercises/_components/exercise-header";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useDevice from "@/hooks/useDevice";

export default function ExerciseClient() {
  const params = useParams();
  const exerciseId = params?.exerciseId as string;

  const { exercise, isLoading, error, refetch, isRefetching } =
    useExercise(exerciseId);

  const { isMobile } = useDevice();

  const { handleError } = useErrorHandler();

  if (error) {
    handleError(error, refetch);
  }

  if (isLoading || isRefetching) {
    return (
      <div
        className={
          "container mx-auto h-screen w-full pt-[calc(var(--navbar-height)+4rem)]"
        }
      >
        <div className={"my-10"}>
          <Skeleton className={"h-20 w-1/2"} />
          <Skeleton className={"mt-10 min-h-[60vh] w-full"} />
        </div>
      </div>
    );
  }
  return (
    <>
      {exercise && (
        <div className={"sm:space-y-40 space-y-20 h-full w-full "}>
          <div className="mt-16 justify-center gap-5 lg:grid lg:grid-cols-2">
            <div className="col-span-1 py-10 border-b border-t border-double border-amber-900 dark:border-pink-500 ">
              <div className="flex flex-col justify-center h-full xs:gap-8 md:gap-4 lg:gap-8">
                <h1 className="bg-linear-to-r from-amber-800 to-amber-500 bg-clip-text font-bold text-transparent dark:from-pink-500 dark:to-violet-700 xs:text-3xl md:text-4xl xl:text-5xl">
                  {exercise?.title?.charAt(0).toUpperCase() +
                    exercise?.title?.slice(1)}
                </h1>
                <ExerciseHeaders
                  title={"Target Muscle"}
                  content={exercise?.target}
                />
                <ExerciseHeaders
                  title={"Body Part"}
                  content={exercise?.bodyPart}
                />
                <ExerciseHeaders
                  title={"Equipment"}
                  content={exercise?.equipment}
                />
                <ExerciseHeaders
                  title={"Muscle Worked"}
                  content={exercise?.["muscles_worked"]}
                />
              </div>
            </div>
            <div className="mx-auto py-10 flex justify-between lg:col-span-1">
              <Image
                src={exercise?.gifUrl}
                height={1000}
                width={1000}
                quality={100}
                className="rounded-3xl h-80 sm:h-96 md:w-full w-fit mx-auto drop-shadow-2xl"
                alt="exercise gif"
              />
            </div>
          </div>
          {exercise.images?.length > 0 && (
            <div className="space-y-6 px-8 md:space-y-10">
              <h1 className="font-bold underline underline-offset-4 md:underline-offset-8 dark:text-gray-200 text-lg xs:text-xl md:text-2xl lg:text-3xl">
                Reference Images
              </h1>
              <Carousel
                className="w-full xs:mt-20 xs:mx-auto lg:mx-0"
                orientation={isMobile ? "vertical" : "horizontal"}
                opts={{
                  align: "start",
                }}
              >
                <CarouselContent className="w-full h-[24rem]">
                  {exercise?.images?.map((image: string) => (
                    <CarouselItem
                      className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 inline-flex justify-center"
                      key={image}
                    >
                      <Image
                        src={image}
                        quality={100}
                        height={1000}
                        width={1000}
                        objectFit="contain"
                        className="rounded-2xl border-2 md:rounded-3xl h-[23rem] object-contain"
                        alt={"exercise image"}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="sm:flex" />
                <CarouselNext className="sm:flex" />
              </Carousel>
            </div>
          )}
          {exercise.videos?.length > 0 && (
            <div className="space-y-6 px-8 md:space-y-10">
              <h1 className="font-bold underline underline-offset-4 md:underline-offset-8 dark:text-gray-200 text-lg xs:text-xl md:text-2xl lg:text-3xl">
                Reference Videos
              </h1>
              <Carousel
                className="w-full xs:mt-20 xs:mx-auto lg:mx-0"
                orientation={isMobile ? "vertical" : "horizontal"}
                opts={{
                  align: "start",
                }}
              >
                <CarouselContent className="w-full h-[24rem]">
                  {exercise?.videos?.map((video: string) => (
                    <CarouselItem
                      className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 inline-flex justify-center"
                      key={video}
                    >
                      <iframe
                        key={video}
                        className="h-[23rem] border-2 w-full rounded-lg md:rounded-xl"
                        src={
                          video.includes("youtube.com/watch")
                            ? video.replace(
                                /youtube\.com\/watch\?v=([^&]+)/,
                                "youtube.com/embed/$1"
                              )
                            : video
                        }
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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

          <div className="mb-16 text-left">
            <div
              className="markdown-content rounded-2xl border border-amber-700 p-4 text-amber-800 dark:border-gray-700 dark:text-gray-200"
              dangerouslySetInnerHTML={{
                __html: markdownToHtml(exercise?.blog),
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
