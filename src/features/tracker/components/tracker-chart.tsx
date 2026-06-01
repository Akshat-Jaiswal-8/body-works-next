'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { useChartData } from '@/features/tracker/services/use-get-chart-data';
import {
  CHART_METRICS,
  CHART_RANGES,
  type ChartMetric,
  type ChartRange,
} from '@/features/tracker/types/chart';
import { useQueryErrorHandler } from '@/hooks/use-query-error-handler';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

const chartConfig = {
  weight: {
    label: 'Weight (kg)',
    color: 'var(--chart-1)',
  },
  bmi: {
    label: 'BMI',
    color: 'var(--chart-2)',
  },
  bodyFat: {
    label: 'Body Fat %',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig;

const cardBaseClass =
  'relative overflow-hidden rounded-2xl border border-black/20 bg-gray-50 shadow-lg shadow-amber-900/20 transition-all duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-black dark:shadow-pink-500/20';

const topHighlightClass =
  'pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-500/70 to-transparent dark:via-pink-400/60';

export default function TrackerChart() {
  const [range, setRange] = useState<ChartRange>('30d');
  const [activeMetrics, setActiveMetrics] = useState<Set<ChartMetric>>(
    new Set(['weight', 'bmi', 'bodyFat']),
  );

  const { isLoading, data, error, refetch, isRefetching } = useChartData(range);

  useQueryErrorHandler(error, refetch);

  const toggleMetric = (metric: ChartMetric) => {
    setActiveMetrics((prev) => {
      const next = new Set(prev);
      if (next.has(metric)) {
        if (next.size > 1) next.delete(metric);
      } else {
        next.add(metric);
      }
      return next;
    });
  };

  if (isLoading || isRefetching) {
    return (
      <Card className={cn(cardBaseClass, 'mb-8')}>
        <div className={topHighlightClass} />
        <CardHeader className='pb-4'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <Skeleton className='h-6 w-40 rounded-md' />
            <div className='flex flex-wrap gap-1'>
              {CHART_RANGES.map((r) => (
                <Skeleton key={r.value} className='h-8 w-16 rounded-md' />
              ))}
            </div>
          </div>
          <div className='flex flex-wrap gap-2 pt-2'>
            {CHART_METRICS.map((m) => (
              <Skeleton key={m.value} className='h-8 w-24 rounded-md' />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[300px] w-full rounded-xl' />
        </CardContent>
      </Card>
    );
  }

  const entries = data?.entries ?? [];
  const hasEnoughData = entries.length >= 2;

  return (
    <Card className={cn(cardBaseClass, 'mb-8')}>
      <div className={topHighlightClass} />
      <CardHeader className='pb-4'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <CardTitle className='font-poppins text-xl font-bold text-amber-900 dark:text-white'>
            Progress Trends
          </CardTitle>
          <div className='flex flex-wrap gap-1'>
            {CHART_RANGES.map((r) => (
              <Button
                key={r.value}
                variant={range === r.value ? 'default' : 'outline'}
                size='sm'
                onClick={() => setRange(r.value)}
                className={cn(
                  'font-montserrat text-xs',
                  range === r.value
                    ? 'bg-amber-700 text-white hover:bg-amber-800 dark:bg-pink-700 dark:hover:bg-pink-800'
                    : 'border-black/20 text-amber-700 hover:bg-amber-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-900',
                )}
              >
                {r.label}
              </Button>
            ))}
          </div>
        </div>
        <div className='flex flex-wrap gap-2 pt-2'>
          {CHART_METRICS.map((metric) => (
            <Button
              key={metric.value}
              variant='outline'
              size='sm'
              onClick={() => toggleMetric(metric.value)}
              className={cn(
                'font-montserrat text-xs transition-all',
                activeMetrics.has(metric.value)
                  ? 'border-amber-600 bg-amber-50 text-amber-900 dark:border-pink-500 dark:bg-gray-900 dark:text-white'
                  : 'border-black/20 text-amber-600/50 hover:border-amber-400 dark:border-gray-800 dark:text-gray-500 dark:hover:border-pink-400',
              )}
            >
              <span
                className='mr-2 h-2 w-2 rounded-full'
                style={{ backgroundColor: metric.color }}
              />
              {metric.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {!hasEnoughData ? (
          <div className='font-montserrat flex h-[300px] items-center justify-center text-center text-amber-700 dark:text-gray-400'>
            Log at least 2 entries to see trends.
          </div>
        ) : (
          <ChartContainer config={chartConfig} className='h-[300px] w-full'>
            <LineChart
              accessibilityLayer
              data={entries}
              margin={{ left: 12, right: 12, top: 20, bottom: 10 }}
            >
              <CartesianGrid vertical={false} stroke='var(--border)' strokeOpacity={0.3} />
              <XAxis
                dataKey='date'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                width={40}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              {activeMetrics.has('weight') && (
                <Line
                  type='monotone'
                  dataKey='weight'
                  stroke='var(--color-weight)'
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-weight)', r: 4 }}
                  activeDot={{ r: 6 }}
                  connectNulls
                />
              )}
              {activeMetrics.has('bmi') && (
                <Line
                  type='monotone'
                  dataKey='bmi'
                  stroke='var(--color-bmi)'
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-bmi)', r: 4 }}
                  activeDot={{ r: 6 }}
                  connectNulls
                />
              )}
              {activeMetrics.has('bodyFat') && (
                <Line
                  type='monotone'
                  dataKey='bodyFat'
                  stroke='var(--color-bodyFat)'
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-bodyFat)', r: 4 }}
                  activeDot={{ r: 6 }}
                  connectNulls
                />
              )}
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
