import { siteUrl } from '@/constants';
import BodyPartClient from '@/features/body-parts/components/body-part-client';
import {
  bodyPartExercisesQueryKey,
  getBodyPartExercises,
} from '@/features/body-parts/services/use-get-body-part';
import { getBodyParts } from '@/features/body-parts/services/use-get-body-parts';
import { safeDecode, toTitleCase } from '@/lib/utils';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

type Params = {
  'body-part'?: string;
};

type SearchParams = {
  page?: string;
};

export const generateStaticParams = async () => {
  const bodyParts = await getBodyParts(100);

  return bodyParts.data.map((item) => ({
    'body-part': item.bodyPart,
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> => {
  const bodyPart = safeDecode((await params)?.['body-part']);

  if (!bodyPart) {
    return {
      title: 'Body Part Not Found',
      description: 'This body-part page could not be found.',
    };
  }

  const result = await getBodyPartExercises(bodyPart, 9, 1);
  const heading = `${toTitleCase(bodyPart)} Exercises`;

  return {
    title: heading,
    description:
      result.data.length > 0
        ? `Explore ${bodyPart} workouts with guided exercise details and muscle targeting.`
        : `Find workouts focused on ${bodyPart}.`,
    keywords: Array.from(
      new Set([
        `${bodyPart} exercises`,
        `${bodyPart} workouts`,
        ...result.data.slice(0, 5).map((exercise) => exercise.name),
      ]),
    ),
    alternates: {
      canonical: `${siteUrl}/body-parts/${encodeURIComponent(bodyPart)}`,
    },
    openGraph: {
      title: heading,
      description: `Discover ${bodyPart} focused exercises and routines.`,
      url: `${siteUrl}/body-parts/${encodeURIComponent(bodyPart)}`,
    },
  };
};

const BodyPartPage = async ({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) => {
  const queryClient = new QueryClient();
  const bodyPart = safeDecode((await params)?.['body-part']);
  const page = Number((await searchParams)?.page) || 1;

  if (bodyPart) {
    await queryClient.prefetchQuery({
      queryKey: bodyPartExercisesQueryKey(bodyPart, 9, page + 1),
      queryFn: () => getBodyPartExercises(bodyPart, 9, page + 1),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BodyPartClient />
    </HydrationBoundary>
  );
};

export default BodyPartPage;
