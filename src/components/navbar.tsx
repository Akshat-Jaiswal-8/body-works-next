'use client';

import { ModeToggle } from '@/components/mode-toggle';
import useDevice from '@/hooks/use-device';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '../../public/logo.webp';

const DesktopNavigationMenu = dynamic(
  () => import('@/components/desktop-navigation-menu').then((mod) => mod.DesktopNavigationMenu),
  { ssr: false },
);

export const Navbar = React.memo(() => {
  const { isMobile, customQuery: showLogoText } = useDevice('only screen and (max-width : 540px)');

  return (
    <section className='fixed top-0 z-50 w-full bg-transparent backdrop-blur-sm'>
      <div className='xs:px-4 container flex w-full items-center justify-between py-4 sm:px-8'>
        <Link href='/' className='flex animate-pulse cursor-pointer items-center'>
          <Image src={logo} className='mr-2 h-8 w-10 rounded-lg' alt='Body Works logo' />
          {!showLogoText && (
            <p className='font-poppins bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 ease-in-out dark:bg-linear-to-r dark:from-pink-500 dark:to-violet-500'>
              Works
            </p>
          )}
        </Link>

        {!isMobile && <DesktopNavigationMenu />}

        <div className='focus:outline-hidden'>
          <ModeToggle />
        </div>
      </div>
    </section>
  );
});

Navbar.displayName = 'Navbar';
