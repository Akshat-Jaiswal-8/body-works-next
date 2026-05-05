import {
  BicepsFlexed,
  CalendarCheck2,
  Dumbbell,
  LayoutDashboard,
  LineChart,
  PersonStanding,
  UserCircle,
  Zap,
} from 'lucide-react';
import type React from 'react';

export interface NavItemProps {
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

export const authNavItems: NavItemProps[] = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard className='h-4 w-4' />,
    href: '/dashboard',
    description: 'View your fitness stats, BMI, and workout goals.',
  },
  {
    title: 'Profile',
    icon: <UserCircle className='h-4 w-4' />,
    href: '/profile',
    description: 'Manage your account settings and preferences.',
  },
  {
    title: 'Tracker',
    icon: <LineChart className='h-4 w-4' />,
    href: '/tracker',
    description: 'Track your body stats like weight and body fat over time.',
  },
];
