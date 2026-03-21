import { useErrorHandler } from '@/lib/error-utils';
import { useEffect } from 'react';

type RefetchFn = () => void | Promise<unknown>;

export function useQueryErrorHandler(error: Error | null, refetch?: RefetchFn) {
  const { handleError } = useErrorHandler();

  useEffect(() => {
    if (!error) {
      return;
    }

    handleError(error, refetch);
  }, [error, refetch, handleError]);
}
