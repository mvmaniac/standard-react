import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { Session } from '@supabase/supabase-js';

interface SessionState {
  isLoaded: boolean;
  session: Session | null;
}

const initialState: SessionState = {
  isLoaded: false,
  session: null,
};

const useSessionStore = create(
  devtools(
    immer(
      combine(initialState, (set, _get) => ({
        actions: {
          setSession: (session: SessionState['session']) => {
            set({ session, isLoaded: true });
          },
        },
      })),
    ),
    {
      name: 'sessionStore',
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
