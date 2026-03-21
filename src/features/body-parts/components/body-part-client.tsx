'use client';

import { withFilteredExercisesClient } from '@/components/with-filtered-exercises-client';
import { useBodyPart } from '@/features/body-parts/services/use-get-body-part';

const useBodyPartExercises = (bodyPart: string | undefined, limit: number, page: number) => {
  const {
    isLoading,
    bodyPart: data,
    error,
    refetch,
    isRefetching,
  } = useBodyPart(bodyPart, limit, page);

  return {
    data,
    isLoading,
    isRefetching,
    error,
    refetch,
  };
};

const BodyPartClient = withFilteredExercisesClient({
  paramKey: 'body-part',
  useData: useBodyPartExercises,
  gridClassName: 'grid lg:grid-cols-2 xl:grid-cols-3',
});

export default BodyPartClient;
