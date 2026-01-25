import { PlusCircleIcon } from 'lucide-react';

import { useOpenCreatePostModal } from '@/stores/post-editor-modal.ts';

export default function CreatePostButton() {
  const openCreatePostModal = useOpenCreatePostModal();

  return (
    <div
      onClick={openCreatePostModal}
      className="bg-muted text-muted-foreground cursor-pointer rounded-xl px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div>나누고 싶은 이미지가 있나요?</div>
        <PlusCircleIcon className="h-5 w-5" />
      </div>
    </div>
  );
}
