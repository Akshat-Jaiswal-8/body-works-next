'use client';

import { resolveError } from '@/lib/error';
import { useCallback } from 'react';
import { toast } from 'sonner';

interface HandleErrorOptions {
  fallbackMessage?: string;
  retry?: () => void | Promise<unknown>;
  retryLabel?: string;
  title?: string;
}

export const useError = () => {
  const handleError = useCallback((error: unknown, options: HandleErrorOptions = {}) => {
    const appError = resolveError(error, options.fallbackMessage);

    toast.error(options.title ?? 'Uh oh! Something went wrong.', {
      description: appError.message,
      action: options.retry
        ? {
            label: options.retryLabel ?? 'Retry',
            onClick: () => void options.retry?.(),
          }
        : undefined,
    });

    return appError;
  }, []);

  const handleQueryError = useCallback(
    (error: unknown, refetch?: () => void | Promise<unknown>, fallbackMessage?: string) => {
      return handleError(error, {
        fallbackMessage,
        retry: refetch,
        retryLabel: 'Refetch',
      });
    },
    [handleError],
  );

  return { handleError, handleQueryError };
};
