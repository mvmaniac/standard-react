import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { Session } from '@supabase/supabase-js';

interface SessionStore {
  isLoaded: boolean;
  session: Session | null;
  actions: {
    setSession: (session: Session | null) => void;
  };
}

const useSessionStore = create<SessionStore>()(
  devtools(
    immer((set) => ({
      isLoaded: false,
      session: null,
      actions: {
        setSession: (session) => {
          set({ session, isLoaded: true });
        },
      },
    })),
    {
      name: 'SessionStore',
    },
  ),
);

export const useSession = () => {
  return useSessionStore((store) => store.session);
};

export const useIsSessionLoaded = () => {
  return useSessionStore((store) => store.isLoaded);
};

export const useSetSession = () => {
  return useSessionStore((store) => store.actions.setSession);
};
