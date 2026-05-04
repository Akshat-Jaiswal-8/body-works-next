'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useBodyParts } from '@/features/body-parts/services/use-get-body-parts';
import { useEquipments } from '@/features/equipments/services/use-get-equipments';

import { useExercises } from '@/features/exercises/services/use-get-exercises';
import { useRoutines } from '@/features/routines/services/use-get-routines';
import { useTargetMuscles } from '@/features/target-muscles/services/use-get-target-muscles';
import type { Easing } from 'motion/react';
import { motion } from 'motion/react';
import React from 'react';
import { FeatureContent } from './features-content';
import { HeadingPrimary } from './heading-primary';

export const Features = React.memo((): React.ReactNode => {
  const itemsCount = 3;

  const {
    data: exercises,
    isLoading: exercisesLoading,
    refetch: refetchExercises,
  } = useExercises(itemsCount);
  const {
    data: bodyParts,
    isLoading: bodyPartsLoading,
    refetch: refetchBodyParts,
  } = useBodyParts(itemsCount);
  const {
    data: equipments,
    isLoading: equipmentsLoading,
    refetch: refetchEquipments,
  } = useEquipments(itemsCount);
  const {
    data: targetMuscle,
    isLoading: targetMuscleLoading,
    refetch: refetchTargetMuscle,
  } = useTargetMuscles(itemsCount);
  const {
    data: routines,
    isLoading: routinesLoading,
    refetch: refetchRoutines,
  } = useRoutines(itemsCount);

  const refetchAll = () => {
    refetchExercises();
    refetchBodyParts();
    refetchEquipments();
    refetchTargetMuscle();
    refetchRoutines();
  };

  const isLoading =
    exercisesLoading ||
    equipmentsLoading ||
    bodyPartsLoading ||
    targetMuscleLoading ||
    routinesLoading;

  const sectionVariants = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: 0.2,
      duration: 0.5,
      ease: 'easeInOut' as Easing | Easing[] | undefined,
    },
  };

  const LoadingSkeleton = () => {
    return (
      <div className='mt-5 space-y-8'>
        <Skeleton className='h-16 w-1/2' />
        <div className='xs:grid-cols-1 grid gap-4 md:grid-cols-3'>
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className='xs:h-40 w-full md:h-80' />
          ))}
        </div>
      </div>
    );
  };

  return (
    <motion.section {...sectionVariants}>
      <HeadingPrimary heading='Body Works at a glance' />
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {!exercises && !bodyParts && !targetMuscle && !equipments && !routines ? (
            <div className='flex flex-col items-center justify-center space-y-8 py-10 text-center text-gray-500'>
              <h1 className='xs:text-xl mb-2 font-semibold xl:text-2xl'>
                Oops! Something went wrong while fetching the features.
              </h1>
              <p className='mb-4'>
                Please check your internet connection and try again. If the problem persists,
                contact support.
              </p>
              <Button onClick={refetchAll} variant='outline'>
                Retry
              </Button>
            </div>
          ) : (
            <>
              {exercises && (
                <FeatureContent
                  type='exercises'
                  data={exercises?.data || []}
                  heading='1300+ Exercises'
                />
              )}
              {routines && (
                <FeatureContent
                  type='routines'
                  data={routines?.data || []}
                  heading='600+ Routines'
                />
              )}
              {bodyParts && (
                <FeatureContent
                  type='bodyParts'
                  data={bodyParts?.data || []}
                  heading='10+ Body Parts'
                />
              )}
              {targetMuscle && (
                <FeatureContent
                  type='targetMuscles'
                  data={targetMuscle?.data || []}
                  heading='20+ Target Muscles'
                />
              )}
              {equipments && (
                <FeatureContent
                  type='equipments'
                  data={equipments?.data || []}
                  heading='30+ Equipments'
                />
              )}
            </>
          )}
        </>
      )}
    </motion.section>
  );
});

Features.displayName = 'Features';
