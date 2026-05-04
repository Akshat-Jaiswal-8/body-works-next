'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { IScanInsight } from '@/features/dashboard/types';
import { Accessibility, Bone, HeartPulse } from 'lucide-react';
import React, { memo } from 'react';
import { StatusBadge } from './status-badge';

export interface InsightCardProps {
  insight: IScanInsight;
}

const icons: Record<string, React.ElementType> = {
  'Muscle Mass': Accessibility,
  'Bone Mass': Bone,
  'Visceral Fat': HeartPulse,
};

const topHighlightClass =
  'pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-500/70 to-transparent dark:via-pink-400/60';

export const InsightCard = memo(({ insight }: InsightCardProps) => {
  const Icon = icons[insight.label] || Accessibility;

  return (
    <Card className='relative overflow-hidden rounded-2xl border-black/20 bg-gray-50 shadow-lg shadow-amber-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-black dark:shadow-pink-500/20'>
      <div className={topHighlightClass} />
      <CardContent className='flex flex-col gap-4 p-5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='rounded-lg bg-amber-100 p-3 text-amber-700 dark:bg-gray-800 dark:text-pink-400'>
              <Icon className='h-5 w-5' />
            </div>
            <div>
              <div className='font-montserrat text-sm text-amber-700 dark:text-gray-400'>
                {insight.label}
              </div>
              <div className='font-poppins text-lg font-semibold text-amber-900 dark:text-white'>
                {insight.value}
              </div>
            </div>
          </div>
          <StatusBadge status={insight.status} color={insight.statusColor} />
        </div>
      </CardContent>
    </Card>
  );
});

InsightCard.displayName = 'InsightCard';
