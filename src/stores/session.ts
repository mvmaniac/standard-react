import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { Session } from '@supabase/supabase-js';

interface SessionState {
  isLoaded: boolean;
  session: Session | null;
}

interface SessionActions {
  setSession: (session: Session | null) => void;
}

interface SessionStore extends SessionState {
  actions: SessionActions;
}

const initialState: SessionState = {
  isLoaded: false,
  session: null,
};

const useSessionStore = create<SessionStore>()(
  devtools(
    immer((set) => ({
      ...initialState,
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
