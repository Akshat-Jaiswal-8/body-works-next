'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { forwardRef } from 'react';

export interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ value, onChange, placeholder = 'Pick a date', disabled, className, id }, ref) => {
    const selectedDate = value ? new Date(value) : undefined;

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            id={id}
            variant='outline'
            disabled={disabled}
            className={cn(
              'w-full justify-start text-left font-normal',
              !selectedDate && 'text-muted-foreground',
              className,
            )}
          >
            <CalendarIcon />
            {selectedDate ? format(selectedDate, 'PPP') : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                onChange?.(format(date, 'yyyy-MM-dd'));
              }
            }}
          />
        </PopoverContent>
      </Popover>
    );
  },
);

DatePicker.displayName = 'DatePicker';
