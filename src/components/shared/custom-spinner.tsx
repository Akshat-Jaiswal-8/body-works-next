import { Loader } from 'lucide-react';
import { memo } from 'react';

export const CustomSpinner = memo(() => {
  return <Loader className='mx-auto mt-5 size-8 animate-spin text-amber-600 dark:text-pink-500' />;
});

CustomSpinner.displayName = 'CustomSpinner';
