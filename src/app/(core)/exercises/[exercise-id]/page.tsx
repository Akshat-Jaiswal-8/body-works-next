import { siteUrl } from '@/constants';
import ExerciseClient from '@/features/exercises/components/exercise-client';
import { getExercise } from '@/features/exercises/services/use-get-exercise';
import { getExercises } from '@/features/exercises/services/use-get-exercises';
import type { IExercise } from '@/features/exercises/types';

export const generateStaticParams = async () => {
  const first = await getExercises(1000, 1);
  const totalPages = first.totalPages ?? Math.ceil(first.totalExercises / 1000);

  const remainingPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) => getExercises(1000, i + 2)),
  );

  const allExercises = [...first.data, ...remainingPages.flatMap((r) => r.data)];

  return allExercises.map((exercise) => ({
    'exercise-id': exercise.id_.toString(),
  }));
};

type Params = {
  'exercise-id'?: string;
};

export const generateMetadata = async ({ params }: { params: Promise<Params> }) => {
  const resolvedParams = await params;
  const exerciseId = resolvedParams?.['exercise-id'];

  if (!exerciseId) {
    return {
      title: 'Exercise Not Found',
      description: 'This exercise could not be found.',
    };
  }

  let exercise: IExercise | null = null;
  try {
    exercise = await getExercise(exerciseId);
  } catch {
    return {
      title: 'Exercise Not Found',
      description: 'This exercise could not be found.',
    };
  }
  if (!exercise || !exercise.title) {
    return {
      title: 'Exercise Not Found',
      description: 'This exercise could not be found.',
    };
  }

  const basicMetadata = {
    title: exercise.title,
    description: `Learn how to do ${exercise.name}, plus target muscles and equipment.`,
    keywords: Array.from(
      new Set([
        ...exercise.keywords.slice(0, 8),
        exercise.name,
        `${exercise.name} exercise`,
        `${exercise.bodyPart} workouts`,
        `${exercise.target} exercises`,
        `${exercise.equipment} exercises`,
      ]),
    ).filter(Boolean),
  };

  return {
    ...basicMetadata,
    openGraph: {
      title: exercise.title,
      description: basicMetadata.description,
      url: `${siteUrl}/exercises/${exerciseId}`,
      images: exercise.images?.[0] ? [exercise.images[0]] : [],
    },
    alternates: {
      canonical: `${siteUrl}/exercises/${exerciseId}`,
    },
  };
};

const ExercisePage = () => {
  return <ExerciseClient />;
};

export default ExercisePage;
