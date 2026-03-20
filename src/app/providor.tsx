'use client';
import { ThemeProvider } from '@/components/theme-provider';
import { getQueryClient } from '@/lib/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

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
