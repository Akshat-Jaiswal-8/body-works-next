'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { memo } from 'react';

type FilterOption = {
  label: string;
  value: string;
};

export type FilterConfig<T extends string = string> = {
  key: T;
  label: string;
  placeholder?: string;
  options: FilterOption[];
};

type FilterSectionProps<T extends string = string> = {
  title?: string;
  filters: FilterConfig<T>[];
  values: Partial<Record<T, string>>;
  onChange: (key: T, value: string) => void;
  onReset?: () => void;
  className?: string;
};

const ALL_FILTER_VALUE = '__all__';

function FilterSectionComponent<T extends string>({
  title = 'Filters',
  filters,
  values,
  onChange,
  onReset,
  className,
}: FilterSectionProps<T>) {
  const hasActiveFilters = Object.values(values).some(Boolean);

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-2xl border border-black/20 bg-white/90 p-5 shadow-lg shadow-amber-900/35 backdrop-blur-xl md:p-6 dark:border-gray-800 dark:bg-zinc-950/80 dark:shadow-2xl dark:shadow-pink-500/20',
        className,
      )}
    >
      <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-500/70 to-transparent dark:via-pink-400/60' />
      <div className='space-y-4'>
        <div className='flex items-center justify-between gap-4'>
          <h2 className='font-montserrat text-lg font-semibold tracking-wide text-amber-900 dark:text-zinc-100'>
            {title}
          </h2>
          {onReset && (
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={onReset}
              disabled={!hasActiveFilters}
              className='font-medium text-amber-700 hover:bg-amber-700/10 hover:text-amber-800 dark:text-pink-500 dark:hover:bg-pink-500/10 dark:hover:text-pink-500'
            >
              Clear Filters
            </Button>
          )}
        </div>

        <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-3'>
          {filters.map((filter) => (
            <label key={filter.key} className='space-y-2'>
              <span className='font-montserrat text-sm font-medium text-amber-800 dark:text-zinc-300'>
                {filter.label}
              </span>
              <Select
                value={values[filter.key] || ALL_FILTER_VALUE}
                onValueChange={(value) =>
                  onChange(filter.key, value === ALL_FILTER_VALUE ? '' : value)
                }
              >
                <SelectTrigger
                  className={cn(
                    'ring-offset-background h-11 w-full rounded-full border border-black/20 bg-amber-50/90 px-4 py-2 text-sm text-amber-950 shadow-sm shadow-amber-900/25 transition outline-none',
                    'focus-visible:border-amber-600 focus-visible:ring-[3px] focus-visible:ring-amber-400/40',
                    'dark:border-gray-800 dark:bg-zinc-950/80 dark:text-zinc-100 dark:shadow-md dark:shadow-pink-500/15 dark:focus-visible:border-pink-400 dark:focus-visible:ring-pink-400/30',
                  )}
                >
                  <SelectValue placeholder={filter.placeholder || `All ${filter.label}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_FILTER_VALUE}>
                    {filter.placeholder || `All ${filter.label}`}
                  </SelectItem>
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}

const FilterSectionMemo = memo(FilterSectionComponent);
FilterSectionMemo.displayName = 'FilterSection';

export const FilterSection = FilterSectionMemo as unknown as <T extends string>(
  props: FilterSectionProps<T>,
) => React.ReactNode;
