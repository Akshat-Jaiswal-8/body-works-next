'use client';

import { ModeToggle } from '@/components/mode-toggle';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import useDevice from '@/hooks/use-device';
import { BicepsFlexed, CalendarCheck2, Dumbbell, PersonStanding, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '../../public/logo.webp';

interface NavItemProps {
  title: string;
  icon: React.ReactElement;
  href: string;
  description: string;
}

export const exerciseNavItems: NavItemProps[] = [
  {
    title: 'All Exercises',
    icon: <Dumbbell className='h-4 w-4' />,
    href: '/exercises',
    description: 'Browse all available exercises in our database.',
  },
  {
    title: 'Equipment',
    icon: <BicepsFlexed className='h-4 w-4' />,
    href: '/equipments',
    description: 'Find exercises by gym equipment and tools.',
  },
  {
    title: 'Body Parts',
    icon: <PersonStanding className='h-4 w-4' />,
    href: '/body-parts',
    description: 'Explore exercises organized by body parts and muscle groups.',
  },
  {
    title: 'Target Muscles',
    icon: <Zap className='h-4 w-4' />,
    href: '/target-muscles',
    description: 'Find exercises that target specific muscles for focused training.',
  },
];

export const routineNavItems: NavItemProps[] = [
  {
    title: 'Browse Routines',
    icon: <CalendarCheck2 className='h-4 w-4' />,
    href: '/routines',
    description: 'Explore pre-built workout routines for all fitness levels.',
  },
  {
    title: 'Routine Categories',
    icon: <CalendarCheck2 className='h-4 w-4' />,
    href: '/routine-category',
    description: 'Browse routines by categories like strength, cardio, and more.',
  },
];

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

        {!isMobile && (
          <NavigationMenu>
            <NavigationMenuList className='flex items-center gap-x-4'>
              <NavigationMenuItem>
                <NavigationMenuTrigger className='bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent'>
                  <div className='flex items-center gap-x-2'>
                    <Dumbbell className='h-4 w-4' />
                    Exercises
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                    {exerciseNavItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className='hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none'
                          >
                            <div className='flex items-center gap-2 text-sm leading-none font-medium'>
                              {item.icon}
                              {item.title}
                            </div>
                            <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className='bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent'>
                  <div className='flex items-center gap-x-2'>
                    <CalendarCheck2 className='h-4 w-4' />
                    Routines
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid w-[400px] gap-3 p-4'>
                    {routineNavItems.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className='hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none'
                          >
                            <div className='flex items-center gap-2 text-sm leading-none font-medium'>
                              {item.icon}
                              {item.title}
                            </div>
                            <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}

        <div className='focus:outline-hidden'>
          <ModeToggle />
        </div>
      </div>
    </section>
  );
});

Navbar.displayName = 'Navbar';
