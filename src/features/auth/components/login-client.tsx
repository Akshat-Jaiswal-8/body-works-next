'use client';

import { FormError } from '@/components/shared/form-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { useLogin } from '@/features/auth/services/use-login';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader2, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const inputClass =
  'border-black/20 bg-gray-50 pl-10 text-amber-900 placeholder:text-amber-600/40 focus-visible:border-amber-600 focus-visible:ring-amber-400/40 dark:border-gray-800 dark:bg-black dark:text-white dark:placeholder:text-gray-600 dark:focus-visible:border-pink-400 dark:focus-visible:ring-pink-400/30';

const loginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginClient() {
  const router = useRouter();
  const { mutate: login, isPending, error } = useLogin();

  const searchParams = useSearchParams();
  const postLoginRedirectPath = searchParams.get('next') || '/dashboard';

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    login(
      { email: values.email, password: values.password, rememberMe: Boolean(values.rememberMe) },
      {
        onSuccess: () => {
          router.push(postLoginRedirectPath);
        },
      },
    );
  };

  return (
    <section className='h-screen-height flex w-full items-center justify-center'>
      <Card className='flex w-full max-w-md'>
        <CardHeader>
          <BrandHeader tagline='Welcome back. Ready to train?' />
        </CardHeader>

        <CardContent>
          {error && (
            <FormError error={error} fallbackMessage='Registration failed. Please try again.' />
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-montserrat text-sm font-semibold text-amber-800 dark:text-gray-300'>
                      Email address
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Mail className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-amber-600/50 dark:text-pink-500' />
                        <Input
                          type='email'
                          placeholder='you@example.com'
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
                        <Lock className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-amber-600/50 dark:text-pink-500' />
                        <Input
                          type='password'
                          placeholder='*********'
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
                name='rememberMe'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center gap-2 space-y-0'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className='border-amber-900/20 text-amber-600 focus-visible:ring-amber-500 data-[state=checked]:border-amber-600 data-[state=checked]:bg-amber-600 data-[state=checked]:text-white dark:border-gray-700 dark:data-[state=checked]:border-pink-500 dark:data-[state=checked]:bg-pink-500'
                      />
                    </FormControl>
                    <FormLabel className='font-montserrat cursor-pointer text-sm text-amber-700 transition-colors hover:text-amber-900 dark:text-gray-400 dark:hover:text-white'>
                      Remember me
                    </FormLabel>
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
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className='my-6 flex items-center gap-4'>
            <div className='h-px flex-1 bg-black/10 dark:bg-gray-800' />
            <span className='font-montserrat text-xs font-semibold tracking-wider text-amber-600 uppercase dark:text-gray-500'>
              Or continue with
            </span>
            <div className='h-px flex-1 bg-black/10 dark:bg-gray-800' />
          </div>

          <div className='space-y-3'>
            <Button
              type='button'
              variant='outline'
              className='w-full border-black/20 bg-gray-50 text-amber-900 transition-colors hover:bg-amber-50 dark:border-gray-800 dark:bg-black dark:text-white dark:hover:bg-gray-900'
            >
              Continue with Google
            </Button>
          </div>

          <div className='mt-8 text-center'>
            <p className='font-montserrat text-sm text-amber-700 dark:text-gray-400'>
              Don&apos;t have an account?{' '}
              <Link
                href='/register'
                className='font-semibold text-amber-600 transition-colors hover:text-amber-800 dark:text-pink-400 dark:hover:text-pink-300'
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
