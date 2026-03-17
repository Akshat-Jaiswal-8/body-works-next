'use client';
import * as motion from 'motion/react-client';
import React, { memo, useCallback, useRef } from 'react';

import { DescriptedCard } from '@/components/descripted-card';
import { Card } from '@/components/exercise-card';
import { type Easing } from 'motion/react';
import Link from 'next/link';

type FeatureContentProps =
  | { type: 'exercises'; data: IExercise[]; heading: string }
  | { type: 'bodyParts'; data: IBodyPart[]; heading: string }
  | { type: 'targetMuscles'; data: ITargetMuscle[]; heading: string }
  | { type: 'equipments'; data: IEquipment[]; heading: string };

const animations = {
  component: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.4,
      duration: 0.5,
      ease: 'easeInOut' as Easing,
    },
  },
  heading: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.4, duration: 0.5, ease: 'easeInOut' as Easing },
  },
  underline: {
    initial: { width: 0 },
    animate: { width: '100%' },
    transition: { delay: 0.5, duration: 0.8, ease: 'easeInOut' as Easing },
  },
};

export const FeatureContent = memo(
  ({ heading, data, type }: FeatureContentProps): React.ReactNode => {
    const headerRef = useRef<HTMLAnchorElement>(null);
    const displayedData = data;

    const getExploreLink = useCallback(() => {
      const linkMap = {
        exercises: '/exercises',
        equipments: '/equipments',
        bodyParts: '/body-parts',
        targetMuscles: '/target-muscles',
      };
      return linkMap[type];
    }, [type]);

    const renderContent = useCallback(() => {
      switch (type) {
        case 'exercises': {
          const exercisesData = displayedData as IExercise[];
          return exercisesData.map((exercise) => (
            <DescriptedCard
              key={exercise.id_}
              id={exercise.id_}
              gif={exercise.gifUrl}
              title={exercise.title}
              blog={exercise.blog}
            />
          ));
        }
        case 'targetMuscles': {
          const musclesData = displayedData as ITargetMuscle[];
          return musclesData.map((muscle) => (
            <Card
              key={muscle.targetMuscle}
              name={muscle.targetMuscle}
              image={muscle.imageUrl}
              path='target-muscles'
            />
          ));
        }
        case 'bodyParts': {
          const partsData = displayedData as IBodyPart[];
          return partsData.map((part) => (
            <Card
              key={part.bodyPart}
              name={part.bodyPart}
              image={part.imageUrl}
              path='body-parts'
            />
          ));
        }
        case 'equipments': {
          const equipmentsData = displayedData as IEquipment[];
          return equipmentsData.map((equipment) => (
            <Card
              key={equipment.equipment}
              name={equipment.equipment}
              image={equipment.imageUrl}
              path='equipments'
            />
          ));
        }
        default:
          return null;
      }
    }, [type, displayedData]);

    return (
      <motion.div {...animations.component} className=''>
        {heading && (
          <Link href={getExploreLink()} ref={headerRef}>
            <motion.div
              {...animations.heading}
              className='font-poppins group mt-10 flex items-center gap-4 tracking-tight md:mt-20'
            >
              <h2 className='xs:text-3xl w-fit font-semibold tracking-tighter text-amber-700 transition-colors duration-200 hover:italic sm:text-4xl md:text-5xl dark:text-slate-200 dark:group-hover:bg-transparent dark:hover:bg-clip-text dark:hover:text-pink-500'>
                {heading}
                <motion.div
                  {...animations.underline}
                  className='xs:h-0.5 bg-amber-700 transition-colors duration-200 sm:h-1 dark:bg-slate-200 dark:group-hover:bg-pink-500'
                />
              </h2>
            </motion.div>
          </Link>
        )}

        <div className='flex w-full justify-between gap-10 overflow-x-auto overflow-y-hidden px-4'>
          {renderContent()}
        </div>
      </motion.div>
    );
  },
);

FeatureContent.displayName = 'FeatureContent';
