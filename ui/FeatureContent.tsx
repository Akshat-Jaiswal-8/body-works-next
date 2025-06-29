import * as motion from "motion/react-client";
import React, { useCallback, useMemo } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "./Card";
import { DescriptedCard } from "./DescriptedCard";
import type { Easing } from "motion/react";

type FeatureContentProps =
  | { type: "exercises"; data: IExercise[]; heading: string }
  | { type: "bodyParts"; data: IBodyPart[]; heading: string }
  | { type: "targetMuscles"; data: ITargetMuscle[]; heading: string }
  | { type: "equipments"; data: IEquipment[]; heading: string };

const useFeatureAnimations = () => {
  return useMemo(
    () => ({
      component: {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
        transition: {
          delay: 0.4,
          duration: 0.5,
          ease: "easeInOut" as Easing,
        },
      },
      heading: {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: 0.4, duration: 0.5, ease: "easeInOut" as Easing },
      },
      underline: {
        initial: { width: 0 },
        animate: { width: "100%" },
        transition: { delay: 0.5, duration: 0.8, ease: "easeInOut" as Easing },
      },
    }),
    []
  );
};

export const FeatureContent = React.memo(
  ({ heading, data, type }: FeatureContentProps): React.ReactNode => {
    const animations = useFeatureAnimations();

    // const getExploreLink = useCallback(() => {
    //   const linkMap = {
    //     exercises: "/exercises",
    //     equipments: "/equipments",
    //     bodyParts: "/body-parts",
    //     targetMuscles: "/target-muscle",
    //   };
    //   return linkMap[type];
    // }, [type]);

    const renderContent = useCallback(() => {
      switch (type) {
        case "exercises":
          return data.map((exercise: IExercise) => (
            <CarouselItem
              key={exercise.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <DescriptedCard
                key={exercise.id}
                id={exercise.id}
                gif={exercise.gifUrl}
                title={exercise.title}
                blog={exercise.blog}
              />
            </CarouselItem>
          ));
        case "targetMuscles":
          return data.map((muscle: ITargetMuscle) => (
            <CarouselItem
              key={muscle.targetMuscle}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card
                key={muscle.targetMuscle}
                name={muscle.targetMuscle}
                image={muscle.imageUrl}
                path="target-muscle"
              />
            </CarouselItem>
          ));
        case "bodyParts":
          return data.map((part: IBodyPart) => (
            <CarouselItem
              key={part.bodyPart}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card
                key={part.bodyPart}
                name={part.bodyPart}
                image={part.imageUrl}
                path="body-parts"
              />
            </CarouselItem>
          ));
        case "equipments":
          return data.map((equipment: IEquipment) => (
            <CarouselItem
              key={equipment.equipment}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card
                key={equipment.equipment}
                name={equipment.equipment}
                image={equipment.imageUrl}
                path="equipments"
              />
            </CarouselItem>
          ));
        default:
          return null;
      }
    }, [type, data]);

    return (
      <motion.div {...animations.component} className="space-y-10">
        {heading && (
          <motion.div {...animations.heading} className="mt-10 md:mt-20">
            <h2 className="mobile-sm:text-2xl w-fit text-xl font-semibold text-amber-700 md:text-5xl dark:text-slate-200">
              {heading}
              <motion.div
                {...animations.underline}
                className="h-1 bg-amber-700 dark:bg-slate-200"
              />
            </h2>
          </motion.div>
        )}

        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="py-10">{renderContent()}</CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* <div className="xs:pb-10 xs:pl-3 flex items-center justify-between gap-x-20 overflow-x-auto">
          {renderContent()}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={getExploreLink()}>
                  <CircleChevronRight className="cursor-pointer transition-colors duration-100 hover:scale-110 hover:text-amber-700 md:h-10 md:w-10 dark:hover:text-pink-500" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="dark:bg-white dark:text-black">
                <p>Explore more</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div> */}
      </motion.div>
    );
  }
);

FeatureContent.displayName = "FeatureContent";
