import { siteUrl } from '@/constants';
import BodyPartsClient from '@/features/body-parts/components/body-parts-client';
import { bodyPartsQueryKey, getBodyParts } from '@/features/body-parts/services/use-get-body-parts';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Body Parts',
  description: 'Browse workouts by body part and discover targeted exercises.',
  alternates: {
    canonical: `${siteUrl}/body-parts`,
  },
};

const BodyPartsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: bodyPartsQueryKey(),
    queryFn: () => getBodyParts(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BodyPartsClient />
    </HydrationBoundary>
  );
};

export default BodyPartsPage;
