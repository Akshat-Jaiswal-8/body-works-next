import React, { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useBodyParts } from "@/hooks/useBodyParts";
import useEquipments from "@/hooks/useEquipments";
import useExercises from "@/hooks/useExercises";
import useTargetMuscles from "@/hooks/useTargetMuscles";
import { FeatureContent } from "@/ui/FeatureContent.tsx";
import { motion } from "framer-motion";

export const Features = React.memo((): React.ReactNode => {
  const itemsCount = 5;

  const { exercises, isLoading: exercisesLoading } = useExercises(itemsCount);
  const { equipments, isLoading: equipmentsLoading } = useEquipments(itemsCount);
  const { bodyParts, isLoading: bodyPartsLoading } = useBodyParts(itemsCount);
  const { targetMuscle, isLoading: targetMuscleLoading } = useTargetMuscles(itemsCount);

  const isLoading = useMemo(
    () => exercisesLoading || equipmentsLoading || bodyPartsLoading || targetMuscleLoading,
    [exercisesLoading, equipmentsLoading, bodyPartsLoading, targetMuscleLoading],
  );

  const sectionVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 100 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.2, duration: 0.5, ease: "easeInOut" },
    }),
    [],
  );

  const LoadingSkeleton = useMemo(() => {
    return () => (
      <div className="space-y-8">
        <Skeleton className="h-16 w-1/2" />
        <div className="grid grid-cols-3 gap-x-4">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-80 w-full" />
          ))}
        </div>
      </div>
    );
  }, []);

  return (
    <motion.section {...sectionVariants}>
      <h1
        className={
          "xs:text-4xl my-10 bg-linear-to-br from-amber-800 to-amber-600 bg-clip-text py-3 font-bold text-transparent md:text-6xl lg:text-7xl dark:from-slate-200 dark:to-slate-300"
        }>
        Body Works at a glance
      </h1>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="space-y-20">
          <FeatureContent type="exercises" data={exercises?.data || []} heading="1300+ Exercises" />
          <FeatureContent type="bodyParts" data={bodyParts?.data || []} heading="10+ Body Parts" />
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
        </div>
      )}
    </motion.section>
  );
});
