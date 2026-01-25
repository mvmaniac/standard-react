import type { PostEntity } from '@/shared/types';

import { useOpenEditPostModal } from '@/stores/post-editor-modal.ts';

import { Button } from '@/components/ui/button.tsx';

export default function EditPostItemButton(props: PostEntity) {
  const openEditPostModal = useOpenEditPostModal();

  const handleButtonClick = () => {
    openEditPostModal({
      postId: props.id,
      content: props.content,
      imageUrls: props.image_urls,
    });
  };
  return (
    <Button variant="ghost" onClick={handleButtonClick} className="cursor-pointer">
      수정
    </Button>
  );
}
