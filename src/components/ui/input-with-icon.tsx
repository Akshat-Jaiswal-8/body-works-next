'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import * as React from 'react';

interface InputWithIconProps extends Omit<React.ComponentProps<'input'>, 'className'> {
  icon: LucideIcon;
  iconPosition?: 'left' | 'right';
  iconClassName?: string;
  inputClassName?: string;
  className?: string;
}

const inputClass =
  'border-black/20 bg-gray-50 pl-10 text-amber-900 placeholder:text-amber-600/40 focus-visible:border-amber-600 focus-visible:ring-amber-400/40 dark:border-gray-800 dark:bg-black dark:text-white dark:placeholder:text-gray-600 dark:focus-visible:border-pink-400 dark:focus-visible:ring-pink-400/30';

function InputWithIcon({
  icon: Icon,
  iconPosition = 'left',
  iconClassName,
  inputClassName,
  className,
  ...props
}: InputWithIconProps) {
  const iconStyles = cn(
    'absolute top-1/2 h-4 w-4 -translate-y-1/2 text-amber-600/50 dark:text-pink-500',
    iconPosition === 'left' ? 'left-3' : 'right-3',
    iconClassName,
  );

  return (
    <div className='relative'>
      <Icon className={iconStyles} />
      <Input className={cn(inputClass, inputClassName, className)} {...props} />
    </div>
  );
}

export { inputClass, InputWithIcon };
