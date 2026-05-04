'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { HistoryRow } from '@/features/tracker/components/history-row';
import {
  defaultTrackerFormValues,
  trackerFormSchema,
  type TrackerFormSchema,
} from '@/features/tracker/lib/tracker-form-schema';
import { useTrackerEntries } from '@/features/tracker/services/use-get-tracker-entries';
import { useCreateBodyStat } from '@/features/tracker/services/use-post-body-stat';
import { useError } from '@/hooks/use-error';
import { useQueryErrorHandler } from '@/hooks/use-query-error-handler';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowRight,
  Calculator,
  Calendar,
  Lightbulb,
  Percent,
  PlusCircle,
  Scale,
} from 'lucide-react';
import { useForm } from 'react-hook-form';

const cardBaseClass =
  'relative overflow-hidden rounded-2xl border border-black/20 bg-gray-50 shadow-lg shadow-amber-900/20 transition-all duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-black dark:shadow-pink-500/20';

const topHighlightClass =
  'pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-500/70 to-transparent dark:via-pink-400/60';

const inputClass =
  'border-black/20 bg-white pl-10 text-amber-900 placeholder:text-amber-600/40 focus-visible:border-amber-600 focus-visible:ring-amber-400/40 dark:border-gray-800 dark:bg-black dark:text-white dark:placeholder:text-gray-600 dark:focus-visible:border-pink-400 dark:focus-visible:ring-pink-400/30';

const labelClass = 'font-montserrat text-sm font-semibold text-amber-800 dark:text-gray-300';

export default function TrackerClient() {
  const { isLoading, data: trackerData, error, refetch, isRefetching } = useTrackerEntries(1, 20);
  const createBodyStat = useCreateBodyStat();
  const { handleError } = useError();

  const form = useForm<TrackerFormSchema>({
    resolver: zodResolver(trackerFormSchema),
    defaultValues: defaultTrackerFormValues,
  });

  useQueryErrorHandler(error, refetch);

  const onSubmit = (values: TrackerFormSchema) => {
    createBodyStat.mutate(
      {
        weightKg: Number(values.weight),
        bodyFatPct: values.bodyFat === '' ? undefined : Number(values.bodyFat),
        loggedAt: new Date(values.date).toISOString(),
      },
      {
        onSuccess: () => {
          form.reset();
        },
        onError: (err) => handleError(err, { title: 'Failed to save entry' }),
      },
    );
  };

  if (isLoading || isRefetching) {
    return (
      <div className='mx-auto h-full w-full max-w-7xl pb-12'>
        <Skeleton className='mb-4 h-10 w-1/3 rounded-xl' />
        <Skeleton className='mb-8 h-6 w-1/2 rounded-xl' />
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <Skeleton className='h-96 w-full rounded-2xl' />
          <Skeleton className='col-span-2 h-96 w-full rounded-2xl' />
        </div>
      </div>
    );
  }

  const entries = trackerData?.entries ?? [];

  return (
    <div className='mx-auto h-full w-full max-w-7xl pb-12'>
      <header className='mb-8'>
        <h1 className='font-poppins text-3xl font-bold text-amber-900 dark:text-white'>
          Body Stats Tracker
        </h1>
        <p className='font-montserrat mt-1 text-amber-700 dark:text-gray-400'>
          Log your latest metrics and review your historical progress.
        </p>
      </header>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        <div className='flex flex-col gap-6 lg:col-span-1'>
          <div className={`${cardBaseClass} p-6`}>
            <div className={topHighlightClass} />
            <h2 className='font-poppins mb-6 text-xl font-bold text-amber-900 dark:text-white'>
              Log New Stats
            </h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                <FormField
                  control={form.control}
                  name='date'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Date</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Calendar className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-amber-600/50 dark:text-gray-500' />
                          <Input type='date' {...field} className={inputClass} />
                        </div>
                      </FormControl>
                      <FormMessage className='text-xs text-red-600 dark:text-red-400' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='weight'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Weight (kg)</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Scale className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-amber-600/50 dark:text-gray-500' />
                          <Input
                            type='number'
                            step='0.1'
                            placeholder='e.g. 72.5'
                            {...field}
                            className={inputClass}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-xs text-red-600 dark:text-red-400' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='bmi'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>BMI</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Calculator className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-amber-600/50 dark:text-gray-500' />
                          <Input
                            type='number'
                            step='0.1'
                            placeholder='e.g. 22.4'
                            {...field}
                            className={inputClass}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-xs text-red-600 dark:text-red-400' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='bodyFat'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Body Fat %</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Percent className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-amber-600/50 dark:text-gray-500' />
                          <Input
                            type='number'
                            step='0.1'
                            placeholder='e.g. 15.2'
                            {...field}
                            className={inputClass}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className='text-xs text-red-600 dark:text-red-400' />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  disabled={createBodyStat.isPending}
                  className='mt-2 flex items-center justify-center gap-2 bg-amber-700 text-white transition-all hover:bg-amber-800 active:scale-95 dark:bg-pink-700 dark:hover:bg-pink-800'
                >
                  <PlusCircle className='h-4 w-4' />
                  {createBodyStat.isPending ? 'Saving...' : 'Save Entry'}
                </Button>
              </form>
            </Form>
          </div>

          <div className={`${cardBaseClass} p-5`}>
            <div className={topHighlightClass} />
            <div className='flex items-start gap-3'>
              <Lightbulb className='mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-pink-500' />
              <div>
                <h4 className='font-montserrat text-sm font-semibold text-amber-900 dark:text-white'>
                  Consistency is Key
                </h4>
                <p className='font-montserrat mt-1 text-xs leading-relaxed text-amber-700 dark:text-gray-400'>
                  For the most accurate trends, weigh yourself at the same time each day under
                  similar conditions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col lg:col-span-2'>
          <div className={`${cardBaseClass} flex flex-1 flex-col p-6`}>
            <div className={topHighlightClass} />
            <div className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
              <h2 className='font-poppins text-xl font-bold text-amber-900 dark:text-white'>
                Measurement History
              </h2>
            </div>

            <div className='overflow-x-auto'>
              <div className='min-w-[500px]'>
                <div className='grid grid-cols-4 gap-4 border-b-2 border-black/10 px-4 py-3 dark:border-gray-800'>
                  <span className='font-montserrat text-xs font-semibold tracking-wider text-amber-700 uppercase dark:text-gray-500'>
                    Date
                  </span>
                  <span className='font-montserrat text-xs font-semibold tracking-wider text-amber-700 uppercase dark:text-gray-500'>
                    Weight (kg)
                  </span>
                  <span className='font-montserrat text-xs font-semibold tracking-wider text-amber-700 uppercase dark:text-gray-500'>
                    Body Fat %
                  </span>
                  <span className='font-montserrat text-xs font-semibold tracking-wider text-amber-700 uppercase dark:text-gray-500'>
                    Assessment
                  </span>
                </div>
                <div>
                  {entries.length > 0 ? (
                    entries.map((entry, index) => (
                      <HistoryRow key={entry.id} entry={entry} index={index} />
                    ))
                  ) : (
                    <div className='font-montserrat py-12 text-center text-amber-700 dark:text-gray-400'>
                      No entries yet. Log your first measurement above.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='mt-6 flex justify-center'>
              <Button
                variant='ghost'
                className='flex items-center gap-1 text-amber-700 transition-colors hover:text-amber-900 dark:text-pink-400 dark:hover:text-pink-300'
              >
                View Full History
                <ArrowRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
