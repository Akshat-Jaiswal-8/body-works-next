import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function useErrorHandler() {
  const handleError = (error: Error, refetch?: () => void | Promise<unknown>) => {
    toast.error('Uh oh! Something went wrong.', {
      description: error.message,
      action: refetch ? (
        <Button variant='destructive' onClick={refetch}>
          Try again
        </Button>
      ) : undefined,
    });
  };

  return { handleError };
}
