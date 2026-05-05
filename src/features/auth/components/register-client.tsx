'use client';

import { FormError } from '@/components/shared/form-error';
import { ButtonWithLoader } from '@/components/ui/button-with-loader';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { BrandHeader } from '@/features/auth/components/brand-header';
import type { RegisterFormValues } from '@/features/auth/lib/register-form-schema';
import { registerFormSchema } from '@/features/auth/lib/register-form-schema';
import { useRegister } from '@/features/auth/services/use-register';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function RegisterClient() {
  const router = useRouter();
  const { mutate: register, isPending, error } = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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
    <section className='min-h-screen-height mt-navbar-height flex w-full items-center justify-center py-8'>
      <Card className='flex w-full max-w-md'>
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
                      <InputWithIcon type='text' placeholder='John Doe' icon={User} {...field} />
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
                      <InputWithIcon
                        type='email'
                        placeholder='john@example.com'
                        icon={Mail}
                        {...field}
                      />
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
                      <InputWithIcon
                        type='password'
                        placeholder='••••••••'
                        icon={Lock}
                        {...field}
                      />
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
                      <InputWithIcon
                        type='password'
                        placeholder='••••••••'
                        icon={Lock}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-xs text-red-600 dark:text-red-400' />
                  </FormItem>
                )}
              />

              <ButtonWithLoader
                type='submit'
                disabled={isPending}
                isPending={isPending}
                text={
                  <>
                    Join BodyWorks <ArrowRight className='ml-2 h-4 w-4' />
                  </>
                }
                className='w-full bg-amber-700 py-3.5 text-base font-medium text-white shadow-sm transition-all hover:bg-amber-800 active:scale-[0.98] dark:bg-pink-700 dark:hover:bg-pink-800'
              />
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
    </section>
  );
}
