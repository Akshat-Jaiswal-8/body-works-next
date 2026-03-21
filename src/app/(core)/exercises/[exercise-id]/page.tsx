import { siteUrl } from '@/constants';
import ExerciseClient from '@/features/exercises/components/exercise-client';
import { getExercise } from '@/features/exercises/services/use-get-exercise';
import { getExercises } from '@/features/exercises/services/use-get-exercises';

export const generateStaticParams = async () => {
  const first = await getExercises(1000, 1);

  const allExercises = [...first.data];
  const totalPages = first.totalPages ?? Math.ceil(first.totalExercises / 1000);

  for (let page = 2; page <= totalPages; page++) {
    const next = await getExercises(1000, page);
    allExercises.push(...next.data);
  }

  return allExercises.map((exercise) => ({
    'exercise-id': exercise.id_.toString(),
  }));
};

type Params = {
  'exercise-id'?: string;
};

export const generateMetadata = async ({ params }: { params: Promise<Params> }) => {
  const exerciseId = (await params)?.['exercise-id'];

  const exercise: IExercise = await getExercise(exerciseId);

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
