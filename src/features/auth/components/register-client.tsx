'use client';

import { FormError } from '@/components/shared/form-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { BrandHeader } from '@/features/auth/components/brand-header';
import { useRegister } from '@/features/auth/services/use-register';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2, Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const inputClass =
  'border-black/20 bg-gray-50 pl-10 text-amber-900 placeholder:text-amber-600/40 focus-visible:border-amber-600 focus-visible:ring-amber-400/40 dark:border-gray-800 dark:bg-black dark:text-white dark:placeholder:text-gray-600 dark:focus-visible:border-pink-400 dark:focus-visible:ring-pink-400/30';

const registerSchema = z
  .object({
    name: z.string().min(1, 'Full name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    agreedToTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterClient() {
  const router = useRouter();
  const { mutate: register, isPending, error } = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreedToTerms: false,
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    register(
      { name: values.name, email: values.email, password: values.password },
      {
        onSuccess: () => {
          router.push('/dashboard');
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <BrandHeader tagline='Begin your journey to a stronger you.' />
      </CardHeader>
      <CardContent>
        {error && (
          <FormError error={error} fallbackMessage='Registration failed. Please try again.' />
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-montserrat text-sm font-semibold text-amber-800 dark:text-gray-300'>
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <User className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-amber-600/50 dark:text-gray-500' />
                      <Input type='text' placeholder='John Doe' {...field} className={inputClass} />
                    </div>
                  </FormControl>
                  <FormMessage className='text-xs text-red-600 dark:text-red-400' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-montserrat text-sm font-semibold text-amber-800 dark:text-gray-300'>
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Mail className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-amber-600/50 dark:text-gray-500' />
                      <Input
                        type='email'
                        placeholder='john@example.com'
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
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-montserrat text-sm font-semibold text-amber-800 dark:text-gray-300'>
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Lock className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-amber-600/50 dark:text-gray-500' />
                      <Input
                        type='password'
                        placeholder='••••••••'
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
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-montserrat text-sm font-semibold text-amber-800 dark:text-gray-300'>
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Lock className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-amber-600/50 dark:text-gray-500' />
                      <Input
                        type='password'
                        placeholder='••••••••'
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
              name='agreedToTerms'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start gap-3 space-y-0 pt-2'>
                  <FormControl>
                    <input
                      type='checkbox'
                      id='terms'
                      checked={field.value}
                      onChange={field.onChange}
                      className='mt-0.5 h-4 w-4 rounded border-amber-900/20 text-amber-600 focus:ring-amber-500 dark:border-gray-700 dark:bg-black dark:text-pink-500'
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel
                      htmlFor='terms'
                      className='font-montserrat text-sm text-amber-700 dark:text-gray-400'
                    >
                      I agree to the{' '}
                      <Link
                        href='#'
                        className='font-semibold text-amber-600 underline transition-colors hover:text-amber-800 dark:text-pink-400 dark:hover:text-pink-300'
                      >
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link
                        href='#'
                        className='font-semibold text-amber-600 underline transition-colors hover:text-amber-800 dark:text-pink-400 dark:hover:text-pink-300'
                      >
                        Privacy Policy
                      </Link>
                      .
                    </FormLabel>
                    <FormMessage className='text-xs text-red-600 dark:text-red-400' />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type='submit'
              disabled={isPending}
              className='w-full bg-amber-700 py-3.5 text-base font-medium text-white shadow-sm transition-all hover:bg-amber-800 active:scale-[0.98] dark:bg-pink-700 dark:hover:bg-pink-800'
            >
              {isPending ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Creating account...
                </>
              ) : (
                <>
                  Join BodyWorks
                  <ArrowRight className='ml-2 h-4 w-4' />
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className='mt-8 border-t border-black/10 pt-6 text-center dark:border-gray-800'>
          <p className='font-montserrat text-sm text-amber-700 dark:text-gray-400'>
            Already have an account?{' '}
            <Link
              href='/login'
              className='font-semibold text-amber-600 transition-colors hover:text-amber-800 dark:text-pink-400 dark:hover:text-pink-300'
            >
              Log In
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
