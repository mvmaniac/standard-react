import { useOpenProfileEditorModal } from '@/stores/profile-editor-modal.ts';

import { Button } from '@/components/ui/button.tsx';

export default function EditProfileButton() {
  const openProfileEditorModal = useOpenProfileEditorModal();
  return (
    <Button variant="secondary" onClick={openProfileEditorModal} className="cursor-pointer">
      프로필 수정
    </Button>
  );
}
