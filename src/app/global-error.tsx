'use client';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body className='font-urbanist'>
        <section className='container flex h-screen flex-col justify-between overflow-x-hidden'>
          <div className='flex grow items-center justify-center px-4 pt-32'>
            <div className='max-w-lg text-center'>
              <div className='mb-6 flex justify-center'>
                <AlertTriangle className='h-24 w-24 text-red-500' />
              </div>

              <h1 className='mb-4 text-[48px] font-extrabold text-red-600 sm:text-[64px] md:text-[80px] lg:text-[96px] dark:text-red-400'>
                Error
              </h1>

              <h2 className='mb-4 text-lg font-medium text-gray-900 sm:text-xl lg:text-2xl dark:text-gray-300'>
                Something went wrong!
              </h2>

              <p className='mb-8 text-sm text-gray-700 sm:text-base lg:text-lg dark:text-gray-400'>
                An unexpected error occurred. We apologize for the inconvenience. Please try
                refreshing the page or return to the home page.
              </p>

              {process.env.NODE_ENV === 'development' && (
                <div className='mb-6 rounded-lg bg-red-50 p-4 text-left dark:bg-red-950'>
                  <h3 className='text-sm font-medium text-red-800 dark:text-red-200'>
                    Error Details (Development)
                  </h3>
                  <p className='mt-2 text-xs break-words text-red-700 dark:text-red-300'>
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className='mt-1 text-xs text-red-600 dark:text-red-400'>
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              )}

              <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
                <Button
                  onClick={reset}
                  className='inline-flex items-center gap-2 rounded-lg bg-amber-700 px-6 py-3 text-white transition hover:bg-amber-800 dark:bg-pink-600 dark:hover:bg-pink-700'
                >
                  <RefreshCw className='h-4 w-4' />
                  Try Again
                </Button>

                <Link href='/'>
                  <Button
                    variant='outline'
                    className='inline-flex w-full items-center gap-2 rounded-lg border border-amber-700 px-6 py-3 text-amber-700 transition hover:bg-amber-700 hover:text-white dark:border-pink-400 dark:text-pink-400 dark:hover:bg-pink-400 dark:hover:text-white'
                  >
                    <Home className='h-4 w-4' />
                    Go to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <Footer />
        </section>
      </body>
    </html>
  );
}
