import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { Theme } from '@/shared/types';

interface ThemeState {
  theme: Theme;
}

interface ThemeActions {
  setTheme: (theme: Theme) => void;
}

interface ThemeStore extends ThemeState {
  actions: ThemeActions;
}

const initialState: ThemeState = {
  theme: 'light',
};

const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialState,
        actions: {
          setTheme: (theme: Theme) => {
            const htmlTag = document.documentElement;
            htmlTag.classList.remove('dark', 'light');

            if (theme === 'system') {
              const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
              htmlTag.classList.add(isDarkTheme ? 'dark' : 'light');
            } else {
              htmlTag.classList.add(theme);
            }

            set({ theme });
          },
        },
      })),
      {
        name: 'ThemeStore',
        partialize: (store) => ({
          theme: store.theme,
        }),
      },
    ),
    {
      name: 'ThemeStore',
    },
  ),
);

export const useTheme = () => {
  return useThemeStore((store) => store.theme);
};

export const useSetTheme = () => {
  return useThemeStore((store) => store.actions.setTheme);
};
