'use client';

import useDevice from '@/hooks/use-device';
import dynamic from 'next/dynamic';
import React, { memo } from 'react';

const MobileFooterNavbar = dynamic(
  () => import('@/components/footer-navbar').then((mod) => mod.FooterNavbar),
  { ssr: false },
);

export const Footer = memo((): React.ReactNode => {
  const { isMobile } = useDevice();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section className='h-[3rem]'>
        {isMobile && (
          <div className={'fixed right-0 bottom-5'}>
            <MobileFooterNavbar />
          </div>
        )}
        <div
          className={
            'xs:text-base w-full border-t border-dotted border-t-amber-800 bg-transparent py-3 backdrop-blur-sm md:text-base dark:border-t-gray-800'
          }
        >
          <p className='text-center'>Copyright © {currentYear} BodyWorks.</p>
        </div>
      </section>
    </>
  );
});

Footer.displayName = 'Footer';
