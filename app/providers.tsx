"use client"

import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import posthog from '@/instrumentation-client';
import { PostHogProvider } from 'posthog-js/react';
import PostHogPageView from '@/components/PostHogPageView';
import { Suspense } from 'react';

export function Providers({ children }: PropsWithChildren) {
  return (
    <PostHogProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      <Provider store={store}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <Toaster richColors/>
        </ThemeProvider>
      </Provider>
    </PostHogProvider>
  );
}