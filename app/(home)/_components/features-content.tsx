"use client";
import React, { useCallback, useRef, memo } from "react";
import * as motion from "motion/react-client";

import { type Easing } from "motion/react";
import Link from "next/link";
import { Card } from "@/components/exercise-card";
import { DescriptedCard } from "@/components/descripted-card";

type FeatureContentProps =
  | { type: "exercises"; data: IExercise[]; heading: string }
  | { type: "bodyParts"; data: IBodyPart[]; heading: string }
  | { type: "targetMuscles"; data: ITargetMuscle[]; heading: string }
  | { type: "equipments"; data: IEquipment[]; heading: string };

const animations = {
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
};

export const FeatureContent = memo(
  ({ heading, data, type }: FeatureContentProps): React.ReactNode => {
    const headerRef = useRef<HTMLAnchorElement>(null);
    const displayedData = data;

    const getExploreLink = useCallback(() => {
      const linkMap = {
        exercises: "/exercises",
        equipments: "/equipments",
        bodyParts: "/body-parts",
        targetMuscles: "/target-muscle",
      };
      return linkMap[type];
    }, [type]);

    const renderContent = useCallback(() => {
      switch (type) {
        case "exercises": {
          const exercisesData = displayedData as IExercise[];
          return exercisesData.map((exercise) => (
            <DescriptedCard
              key={exercise.id}
              id={exercise.id}
              gif={exercise.gifUrl}
              title={exercise.title}
              blog={exercise.blog}
            />
          ));
        }
        case "targetMuscles": {
          const musclesData = displayedData as ITargetMuscle[];
          return musclesData.map((muscle) => (
            <Card
              key={muscle.targetMuscle}
              name={muscle.targetMuscle}
              image={muscle.imageUrl}
              path="target-muscle"
            />
          ));
        }
        case "bodyParts": {
          const partsData = displayedData as IBodyPart[];
          return partsData.map((part) => (
            <Card
              key={part.bodyPart}
              name={part.bodyPart}
              image={part.imageUrl}
              path="body-parts"
            />
          ));
        }
        case "equipments": {
          const equipmentsData = displayedData as IEquipment[];
          return equipmentsData.map((equipment) => (
            <Card
              key={equipment.equipment}
              name={equipment.equipment}
              image={equipment.imageUrl}
              path="equipments"
            />
          ));
        }
        default:
          return null;
      }
    }, [type, displayedData]);

    return (
      <motion.div {...animations.component} className="">
        {heading && (
          <Link href={getExploreLink()} ref={headerRef}>
            <motion.div
              {...animations.heading}
              className="mt-10 font-poppins tracking-tight group flex gap-4 items-center md:mt-20"
            >
              <h2 className="dark:group-hover:bg-transparent tracking-tighter hover:italic dark:hover:bg-clip-text transition-colors duration-200 dark:hover:text-pink-500 w-fit xs:text-3xl sm:text-4xl font-semibold text-amber-700 md:text-5xl dark:text-slate-200">
                {heading}
                <motion.div
                  {...animations.underline}
                  className="sm:h-1 xs:h-0.5 bg-amber-700 dark:group-hover:bg-pink-500 dark:bg-slate-200 transition-colors duration-200"
                />
              </h2>
            </motion.div>
          </Link>
        )}

        <div className="flex w-full px-4 overflow-x-auto overflow-y-hidden gap-10 justify-between">
          {renderContent()}
        </div>
      </motion.div>
    );
  }
);

FeatureContent.displayName = "FeatureContent";
