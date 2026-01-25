import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/react/shallow';

import { EMPTY_ARRAY } from '@/shared/constants/variables.ts';

interface CreateMode {
  type: 'CREATE';
  isOpen: true;
  postId?: never;
  content?: never;
  imageUrls?: never;
}

interface EditMode {
  type: 'EDIT';
  isOpen: true;
  postId: number;
  content: string;
  imageUrls: string[] | null;
}

type OpenState = CreateMode | EditMode;
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type CloseState = { type: 'CLOSE', isOpen: false };

type State = OpenState | CloseState;

interface PostEditorModalStore {
  state: State;
  actions: {
    openCreate: () => void;
    openEdit: (param: Omit<EditMode, 'isOpen' | 'type'>) => void;
    close: () => void;
  };
}

const initialState: CloseState = { isOpen: false, type: 'CLOSE' };

const usePostEditorModalStore = create<PostEditorModalStore>()(
  devtools(
    immer((set) => ({
      state: initialState,
      actions: {
        openCreate: () => {
          set((draft) => {
            draft.state = { type: 'CREATE', isOpen: true };
          });
        },
        openEdit: (param) => {
          set((draft) => {
            draft.state = { ...param, type: 'EDIT', isOpen: true };
          });
        },
        close: () => {
          set((draft) => {
            draft.state = initialState;
          });
        },
      },
    })),
    {
      name: 'PostEditorModalStore',
    },
  ),
);

const isEditMode = (s: State): s is EditMode => s.isOpen && s.type === 'EDIT';

export const usePostEditorModal = () => {
  return usePostEditorModalStore(
    useShallow((store) => {
      const s = store.state;
      return {
        isOpen: s.isOpen,
        type: s.type,
        postId: isEditMode(s) ? s.postId : 0,
        content: isEditMode(s) ? s.content : '',
        imageUrls: isEditMode(s) ? s.imageUrls : EMPTY_ARRAY,
        close: store.actions.close,
      };
    }),
  );
};

export const useOpenCreatePostModal = () => {
  return usePostEditorModalStore((store) => store.actions.openCreate);
};

export const useOpenEditPostModal = () => {
  return usePostEditorModalStore((store) => store.actions.openEdit);
};
