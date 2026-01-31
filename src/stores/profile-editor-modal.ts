import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/react/shallow';
import { EMPTY_ARRAY } from '@/shared/constants/variables.ts';

interface ProfileEditorModalState {
  isOpen: boolean;
}

interface ProfileEditorModalActions {
  open: () => void;
  close: () => void;
}

interface ProfileEditorModalStore extends ProfileEditorModalState {
  actions: ProfileEditorModalActions;
}

const initialState: ProfileEditorModalState = { isOpen: false };

const useProfileEditorModalStore = create<ProfileEditorModalStore>()(
  devtools(
    immer((set) => ({
      ...initialState,
      actions: {
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
      },
    })),
    {
      name: 'ProfileEditorModalStore',
    },
  ),
);

export const useProfileEditorModal = () => {
  return useProfileEditorModalStore(
    useShallow((store) => {
      return {
        isOpen: store.isOpen,
        ...store.actions,
      };
    }),
  );
};

export const useOpenProfileEditorModal = () => {
  return useProfileEditorModalStore((store) => store.actions.open);
};
