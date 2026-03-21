import { siteUrl } from '@/constants';
import EquipmentsClient from '@/features/equipments/components/equipments-client';
import {
  equipmentsQueryKey,
  getEquipments,
} from '@/features/equipments/services/use-get-equipments';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Equipments',
  description: 'Find exercises by equipment and build better training plans.',
  alternates: {
    canonical: `${siteUrl}/equipments`,
  },
};

const EquipmentsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: equipmentsQueryKey(),
    queryFn: () => getEquipments(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EquipmentsClient />
    </HydrationBoundary>
  );
};

export default EquipmentsPage;
