import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/react/shallow';

interface OpenState {
  isOpen: true;
  title: string;
  description: string;
  onPositive?: () => void;
  onNegative?: () => void;
}

interface CloseState {
  isOpen: false;
  title?: never;
  description?: never;
}

type State = OpenState | CloseState;

interface AlertModalStore {
  state: State;
  actions: {
    open: (params: Omit<OpenState, 'isOpen'>) => void;
    close: () => void;
  };
}

const initialState: CloseState = { isOpen: false };

const useAlertModalStore = create<AlertModalStore>()(
  devtools(
    immer((set) => ({
      state: initialState,
      actions: {
        open: (params) => {
          set((draft) => {
            draft.state = { ...params, isOpen: true }
          });
        },
        close: () => {
          set((draft) => {
            draft.state = initialState
          });
        },
      },
    })),
    {
      name: 'AlertModalStore',
    },
  ),
);

const isOpenState = (s: State): s is OpenState => s.isOpen;

export const useAlertModal = () => {
  return useAlertModalStore(
    useShallow((store) => {
      const s = store.state;
      return {
        isOpen: s.isOpen,
        title: isOpenState(s) ? s.title : '',
        description: isOpenState(s) ? s.description : '',
        onPositive: isOpenState(s) ? s.onPositive : undefined,
        onNegative: isOpenState(s) ? s.onNegative : undefined,
        open: store.actions.open,
        close: store.actions.close,
      };
    }),
  );
};

export const useOpenAlertModal = () => {
  return useAlertModalStore((store) => store.actions.open);
};
