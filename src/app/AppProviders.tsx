import { BrowserRouter } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { ReactNode } from 'react';

interface AppProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true, // 마운트 시 stale이면 refetch
      refetchOnReconnect: true, // 네트워크 복구 시 refetch
      refetchOnWindowFocus: false, // 탭 전환 시 refetch 끔
      staleTime: 0, // 개발은 0, 그 이외에는 1분간 fresh 유지 (1000 * 60)
      gcTime: 1000 * 60 * 5, // 5분간 캐시 유지 (기본값)
      retry: 1,
    },
  },
});

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        {children}
      </QueryClientProvider>
    </BrowserRouter>
  );
}
