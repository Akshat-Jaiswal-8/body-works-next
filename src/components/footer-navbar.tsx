import { FloatingDock } from '@/components/ui/floating-dock';
import { Home } from 'lucide-react';
import React, { memo } from 'react';
import { exerciseNavItems, routineNavItems } from './navbar';

export const FooterNavbar = memo((): React.ReactNode => {
  const footerNavItems = [
    ...exerciseNavItems,
    ...routineNavItems,
    { title: 'Home', icon: <Home />, href: '/' },
  ];
  return (
    <div className='xs:justify-end flex w-full items-center md:h-48 md:justify-center'>
      <FloatingDock items={footerNavItems} />
    </div>
  );
});

FooterNavbar.displayName = 'FooterNavbar';
