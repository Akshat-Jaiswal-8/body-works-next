'use client';

import { exerciseNavItems, routineNavItems } from '@/components/navbar-data';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { CalendarCheck2, Dumbbell } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

export const DesktopNavigationMenu = memo(() => {
  return (
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
  );
});

DesktopNavigationMenu.displayName = 'DesktopNavigationMenu';
