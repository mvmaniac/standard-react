import AppProviders from '@/app/AppProviders';
import SessionProvider from '@/app/SessionProvider';

import { Toaster } from '@/components/ui/sonner';

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
