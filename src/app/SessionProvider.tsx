import { type ReactNode, useEffect } from 'react';

import { useIsSessionLoaded, useSession, useSetSession } from '@/stores/session.ts';

import GlobalLoader from '@/components/GlobalLoader.tsx';

import { useProfileQuery } from '@/queries/profiles/use-profile-query.ts';

import supabase from '@/shared/supabase.ts';

interface SessionProvidersProps {
  children: ReactNode;
}

export default function SessionProvider({ children }: SessionProvidersProps) {
  const session = useSession();
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  const { isLoading: isProfileLoading } = useProfileQuery(session?.user.id ?? '');

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('[dev] onAuthStateChange called...', _event, session);
      setSession(session);
    });
  }, [setSession]);

  if (!isSessionLoaded) return <GlobalLoader />;
  if (isProfileLoading) return <GlobalLoader />;

  return children;
}
