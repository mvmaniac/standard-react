import { createPortal } from 'react-dom';

import type { ReactNode } from 'react';

import AlertModal from '@/components/modals/AlertModal.tsx';
import { PostEditorModal } from '@/components/modals/PostEditorModal.tsx';
import ProfileEditorModal from '@/components/modals/ProfileEditorModal.tsx';

interface ModalProvidersProps {
  children: ReactNode;
}

export default function ModalProvider({ children }: ModalProvidersProps) {
  const modalRoot = document.getElementById('modal-root')!;
  return (
    <>
      {createPortal(
        <>
          <PostEditorModal />
          <ProfileEditorModal />
          <AlertModal />
        </>,
        modalRoot,
      )}
      {children}
    </>
  );
}
