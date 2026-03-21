import { memo } from 'react';

export const HeadingPrimary = memo(({ heading }: { heading: string }) => {
  return (
    <h1
      className={
        'xs:text-4xl font-poppins lg:text67xl bg-linear-to-br from-amber-800 to-amber-600 bg-clip-text pb-3 font-bold text-transparent italic sm:text-5xl md:text-6xl dark:from-slate-200 dark:to-slate-300'
      }
    >
      {heading}
    </h1>
  );
});

HeadingPrimary.displayName = 'HeadingPrimary';
