'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { parseAsString, useQueryState } from 'nuqs';
import React, { ChangeEventHandler, memo } from 'react';

type SearchBarProps = {
  placeholder?: string;
  className?: string;
  queryKey?: string;
};

export const SearchBar = memo(
  ({
    placeholder = 'Search by name',
    className,
    queryKey = 'search',
  }: SearchBarProps): React.ReactNode => {
    const textParser = parseAsString.withDefault('').withOptions({ history: 'replace' });
    const [searchQuery, setSearchQuery] = useQueryState(queryKey, textParser);

    const onSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setSearchQuery(event.target.value);
    };

    return (
      <div className={cn('mx-auto w-full max-w-4xl', className)}>
        <div className='group relative'>
          <div className='relative flex h-14 items-center rounded-xl bg-white/95 px-4 shadow-md shadow-amber-800/50 backdrop-blur-xl dark:bg-black dark:shadow-2xl dark:shadow-pink-500/50'>
            <Search className='mr-3 size-5 text-amber-700 dark:text-pink-400' />
            <Input
              placeholder={placeholder}
              className='font-montserrat h-full border-none px-0 text-base text-amber-800 shadow-none placeholder:text-amber-800/50 focus-visible:ring-0 dark:bg-black dark:text-slate-100 dark:placeholder:text-slate-100/50'
              value={searchQuery}
              onChange={onSearchChange}
            />
          </div>
        </div>
      </div>
    );
  },
);

SearchBar.displayName = 'SearchBar';
