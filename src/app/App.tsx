import AppProviders from '@/app/AppProviders.tsx';
import SessionProvider from '@/app/SessionProvider.tsx';

import { Toaster } from '@/components/ui/sonner.tsx';

import AppRoutes from '@/routes';

export default function App() {
  return (
    <AppProviders>
      <Toaster />
      <SessionProvider>
        <AppRoutes />
      </SessionProvider>
    </AppProviders>
  );
}
