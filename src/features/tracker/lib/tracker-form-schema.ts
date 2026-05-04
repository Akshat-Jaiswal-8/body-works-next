import { z } from 'zod';

export const trackerFormSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  weight: z
    .string()
    .min(1, 'Weight is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Weight must be a positive number',
    }),
  bmi: z
    .string()
    .refine((val) => val === '' || (!isNaN(Number(val)) && Number(val) > 0), {
      message: 'BMI must be a positive number',
    }),
  bodyFat: z
    .string()
    .refine(
      (val) => val === '' || (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100),
      { message: 'Body fat must be between 0 and 100' },
    ),
});

export type TrackerFormSchema = z.infer<typeof trackerFormSchema>;

export const defaultTrackerFormValues: TrackerFormSchema = {
  date: '',
  weight: '',
  bmi: '',
  bodyFat: '',
};
