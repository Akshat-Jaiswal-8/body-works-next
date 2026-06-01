import { getErrorMessage } from '@/lib/error-utils';

interface FormErrorProps {
  error: unknown;
  fallbackMessage: string;
}

export function FormError({ error, fallbackMessage }: FormErrorProps) {
  return (
    <div className='mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400'>
      {getErrorMessage(error, fallbackMessage)}
    </div>
  );
}
