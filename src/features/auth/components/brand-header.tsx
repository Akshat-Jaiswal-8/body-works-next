import { memo } from 'react';

interface BrandHeaderProps {
  tagline: string;
}

export const BrandHeader = memo(({ tagline }: BrandHeaderProps) => {
  return (
    <div className='mb-8 text-center'>
      <h1 className='font-poppins text-4xl font-extrabold tracking-tight text-amber-900 italic dark:text-white'>
        BodyWorks
      </h1>
      <p className='font-montserrat mt-2 text-amber-700 dark:text-gray-400'>{tagline}</p>
    </div>
  );
});

BrandHeader.displayName = 'BrandHeader';
