import { useError } from '@/hooks/use-error';
import { useEffect } from 'react';

type RefetchFn = () => void | Promise<unknown>;

export function useQueryErrorHandler(error: unknown, refetch?: RefetchFn) {
  const { handleQueryError } = useError();

  useEffect(() => {
    if (error) handleQueryError(error, refetch);
  }, [error, refetch, handleQueryError]);
}
