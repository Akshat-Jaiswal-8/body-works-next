import { siteUrl } from '@/constants';
import EquipmentClient from '@/features/equipments/components/equipment-client';
import {
  equipmentExercisesQueryKey,
  getEquipmentExercises,
} from '@/features/equipments/services/use-get-equipment';
import { getEquipments } from '@/features/equipments/services/use-get-equipments';
import { safeDecode, toTitleCase } from '@/lib/utils';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

type Params = {
  equipment?: string;
};

type SearchParams = {
  page?: string;
};

export const generateStaticParams = async () => {
  const equipments = await getEquipments(100);

  return equipments.data.map((item) => ({
    equipment: item.equipment,
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> => {
  const equipment = safeDecode((await params)?.equipment);

  if (!equipment) {
    return {
      title: 'Equipment Not Found',
      description: 'This equipment page could not be found.',
    };
  }

  const result = await getEquipmentExercises(equipment, 9, 1);
  const heading = `${toTitleCase(equipment)} Exercises`;

  return {
    title: heading,
    description:
      result.data.length > 0
        ? `Train with ${equipment} using guided workouts and exercise breakdowns.`
        : `Find workouts that use ${equipment}.`,
    keywords: Array.from(
      new Set([
        `${equipment} exercises`,
        `${equipment} workout`,
        ...result.data.slice(0, 5).map((exercise) => exercise.name),
      ]),
    ),
    alternates: {
      canonical: `${siteUrl}/equipments/${encodeURIComponent(equipment)}`,
    },
    openGraph: {
      title: heading,
      description: `Explore exercises that use ${equipment}.`,
      url: `${siteUrl}/equipments/${encodeURIComponent(equipment)}`,
    },
  };
};

const EquipmentPage = async ({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) => {
  const queryClient = new QueryClient();
  const equipment = safeDecode((await params)?.equipment);
  const page = Number((await searchParams)?.page) || 1;

  if (equipment) {
    await queryClient.prefetchQuery({
      queryKey: equipmentExercisesQueryKey(equipment, 9, page + 1),
      queryFn: () => getEquipmentExercises(equipment, 9, page + 1),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EquipmentClient />
    </HydrationBoundary>
  );
};

export default EquipmentPage;
