import { siteUrl } from '@/constants';
import TargetMuscleClient from '@/features/target-muscles/components/target-muscle-client';
import {
  getTargetMuscleExercises,
  targetMuscleExercisesQueryKey,
} from '@/features/target-muscles/services/use-get-target-muscle';
import { getTargetMuscles } from '@/features/target-muscles/services/use-get-target-muscles';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

type Params = {
  'target-muscle'?: string;
};

type SearchParams = {
  page?: string;
};

function safeDecode(value?: string) {
  if (!value) {
    return undefined;
  }

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function toTitleCase(value: string) {
  return value
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const generateStaticParams = async () => {
  const muscles = await getTargetMuscles(100);

  return muscles.data.map((item) => ({
    'target-muscle': item.targetMuscle,
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> => {
  const targetMuscle = safeDecode((await params)?.['target-muscle']);

  if (!targetMuscle) {
    return {
      title: 'Target Muscle Not Found',
      description: 'This target-muscle page could not be found.',
    };
  }

  const result = await getTargetMuscleExercises(targetMuscle, 9, 1);
  const heading = `${toTitleCase(targetMuscle)} Exercises`;

  return {
    title: heading,
    description:
      result.data.length > 0
        ? `Find exercises that directly train ${targetMuscle} with guided form details.`
        : `Explore workouts that target ${targetMuscle}.`,
    keywords: Array.from(
      new Set([
        `${targetMuscle} exercises`,
        `${targetMuscle} workouts`,
        ...result.data.slice(0, 5).map((exercise) => exercise.name),
      ]),
    ),
    alternates: {
      canonical: `${siteUrl}/target-muscles/${encodeURIComponent(targetMuscle)}`,
    },
    openGraph: {
      title: heading,
      description: `Explore exercises that target ${targetMuscle}.`,
      url: `${siteUrl}/target-muscles/${encodeURIComponent(targetMuscle)}`,
    },
  };
};

const TargetMusclePage = async ({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) => {
  const queryClient = new QueryClient();
  const targetMuscle = safeDecode((await params)?.['target-muscle']);
  const page = Number((await searchParams)?.page) || 1;

  if (targetMuscle) {
    await queryClient.prefetchQuery({
      queryKey: targetMuscleExercisesQueryKey(targetMuscle, 9, page + 1),
      queryFn: () => getTargetMuscleExercises(targetMuscle, 9, page + 1),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TargetMuscleClient />
    </HydrationBoundary>
  );
};

export default TargetMusclePage;
