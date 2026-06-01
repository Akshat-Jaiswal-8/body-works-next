import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';
import { memo } from 'react';

export type ButtonWithLoaderProps = React.ComponentProps<typeof Button> & {
  text: React.ReactNode;
  isPending?: boolean;
  loaderClassName?: string;
  loaderSize?: number;
};

export const ButtonWithLoader = memo(
  ({ text, isPending, loaderClassName, loaderSize, ...props }: ButtonWithLoaderProps) => {
    return (
      <Button {...props}>
        {isPending ? (
          <Loader size={loaderSize ?? 24} className={cn('animate-spin', loaderClassName)} />
        ) : (
          text
        )}
      </Button>
    );
  },
);

ButtonWithLoader.displayName = 'ButtonWithLoader';
