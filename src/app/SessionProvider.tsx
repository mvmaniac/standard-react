import { type ReactNode, useEffect } from 'react';

import { useIsSessionLoaded, useSetSession } from '@/stores/session.ts';

import GlobalLoader from '@/components/GlobalLoader.tsx';

import supabase from '@/shared/supabase.ts';

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
  }, [setSession]);

  if (!isSessionLoaded) return <GlobalLoader />;
  return children;
}
