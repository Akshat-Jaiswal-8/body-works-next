'use client';
import { ThemeProvider } from '@/components/theme-provider';
import { getQueryClient } from '@/lib/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import React from 'react';

const ReactQueryDevtools =
  process.env.NODE_ENV === 'development'
    ? dynamic(
        () => import('@tanstack/react-query-devtools').then((mod) => mod.ReactQueryDevtools),
        { ssr: false },
      )
    : () => null;

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem enableColorScheme>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
