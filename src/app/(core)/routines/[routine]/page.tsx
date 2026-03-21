import { siteUrl } from '@/constants';
import RoutineClient from '@/features/routines/components/routine-client';
import { getRoutine, routineQueryKey } from '@/features/routines/services/use-get-routine';
import { getRoutines } from '@/features/routines/services/use-get-routines';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

type Params = {
  routine?: string;
};

export const generateStaticParams = async () => {
  const first = await getRoutines(1000, 1);

  const routines = [...first.data];
  const totalPages = first.totalPages ?? Math.ceil(first.totalRoutines / 1000);

  for (let page = 2; page <= totalPages; page++) {
    const next = await getRoutines(1000, page);
    routines.push(...next.data);
  }

  return routines.map((item) => ({
    routine: item.id_.toString(),
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> => {
  const routineId = (await params)?.routine;

  if (!routineId) {
    return {
      title: 'Routine Not Found',
      description: 'This routine could not be found.',
    };
  }

  const routine = await getRoutine({ routineId });

  if (!routine?.routine?.routine_title) {
    return {
      title: 'Routine Not Found',
      description: 'This routine could not be found.',
    };
  }

  return {
    title: routine.routine.routine_title,
    description: routine.routine.routine_description,
    keywords: Array.from(
      new Set([...routine.category, routine.routine.routine_title, 'workout routine']),
    ),
    alternates: {
      canonical: `${siteUrl}/routines/${routineId}`,
    },
    openGraph: {
      title: routine.routine.routine_title,
      description: routine.routine.routine_description,
      url: `${siteUrl}/routines/${routineId}`,
      images: routine.routine.routine_imageUrl ? [routine.routine.routine_imageUrl] : [],
    },
  };
};

const RoutinePage = async ({ params }: { params: Promise<Params> }) => {
  const queryClient = new QueryClient();
  const routineId = (await params)?.routine;

  if (routineId) {
    await queryClient.prefetchQuery({
      queryKey: routineQueryKey(routineId),
      queryFn: () => getRoutine({ routineId }),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RoutineClient />
    </HydrationBoundary>
  );
};

export default RoutinePage;
