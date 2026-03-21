'use client';

import { FooterNavbar } from '@/components/footer-navbar';
import useDevice from '@/hooks/use-device';
import React, { memo } from 'react';

export const Footer = memo((): React.ReactNode => {
  const { isMobile } = useDevice();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section className='h-[3rem]'>
        {isMobile && (
          <div className={'fixed right-0 bottom-5'}>
            <FooterNavbar />
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
