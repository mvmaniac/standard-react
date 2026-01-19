import { type ReactNode, useEffect } from 'react';

import { useIsSessionLoaded, useSetSession } from '@/stores/session';

import GlobalLoader from '@/components/GlobalLoader';

import supabase from '@/shared/supabase';

interface SessionProvidersProps {
  children: ReactNode;
}

export default function SessionProvider({ children }: SessionProvidersProps) {
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('[dev] onAuthStateChange called...', _event, session);
      setSession(session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;
  return children;
}
