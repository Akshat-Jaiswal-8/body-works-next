"use client";
import React from "react";

import type { Easing } from "motion/react";
import * as motion from "motion/react-client";

import { useBodyParts } from "@/hooks/useBodyParts";
import useEquipments from "@/hooks/useEquipments";
import useExercises from "@/hooks/useExercises";
import useTargetMuscles from "@/hooks/useTargetMuscles";

import { FeatureContent } from "@/app/(home)/_components/features-content";
import { HeadingPrimary } from "@/app/(home)/_components/heading-primary";
import { Skeleton } from "@/components/ui/skeleton";

export const Features = React.memo((): React.ReactNode => {
  const itemsCount = 3;

  const { exercises, isLoading: exercisesLoading } = useExercises(itemsCount);
  const { bodyParts, isLoading: bodyPartsLoading } = useBodyParts(itemsCount);
  const { equipments, isLoading: equipmentsLoading } =
    useEquipments(itemsCount);
  const { targetMuscle, isLoading: targetMuscleLoading } =
    useTargetMuscles(itemsCount);

  const isLoading =
    exercisesLoading ||
    equipmentsLoading ||
    bodyPartsLoading ||
    targetMuscleLoading;

  const sectionVariants = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: 0.2,
      duration: 0.5,
      ease: "easeInOut" as Easing | Easing[] | undefined,
    },
  };

  const LoadingSkeleton = () => {
    return (
      <div className="space-y-8 mt-5">
        <Skeleton className="h-16 w-1/2" />
        <div className="grid xs:grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="xs:h-40 md:h-80 w-full" />
          ))}
        </div>
      </div>
    );
  };

  return (
    <motion.section {...sectionVariants}>
      <HeadingPrimary heading="Body Works at a glance" />
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <FeatureContent
            type="exercises"
            data={exercises?.data || []}
            heading="1300+ Exercises"
          />
          <FeatureContent
            type="bodyParts"
            data={bodyParts?.data || []}
            heading="10+ Body Parts"
          />
          <FeatureContent
            type="targetMuscles"
            data={targetMuscle?.data || []}
            heading="20+ Target Muscles"
          />
          <FeatureContent
            type="equipments"
            data={equipments?.data || []}
            heading="30+ Equipments"
          />
        </>
      )}
    </motion.section>
  );
});

Features.displayName = "Features";
