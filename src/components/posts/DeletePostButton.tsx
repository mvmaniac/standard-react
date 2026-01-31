import { useNavigate } from 'react-router';

import { toast } from 'sonner';

import { useOpenAlertModal } from '@/stores/alert-modal.ts';

import { Button } from '@/components/ui/button.tsx';

import { useDeletePost } from '@/queries/posts/use-delete-post.ts';

export default function DeletePostButton({ id }: { id: number }) {
  const navigate = useNavigate();

  const { mutate: deletePost, isPending: isDeletePostPending } = useDeletePost({
    onSuccess: () => {
      const pathname = window.location.pathname;
      if (pathname.startsWith(`/post/${id}`)) {
        void navigate('/', { replace: true });
      }
    },
    onError: () => {
      toast.error('포스트 삭제에 실패 했습니다', {
        position: 'top-center',
      });
    },
  });

  const openAlertModal = useOpenAlertModal();

  const handleDeleteClick = () => {
    openAlertModal({
      title: '포스트 삭제',
      description: '삭제된 포스트는 되돌릴 수 없습니다. 정말 삭제하시겠습니까?',
      onPositive: () => {
        deletePost(id);
      },
    });
  };

  return (
    <Button
      variant="ghost"
      disabled={isDeletePostPending}
      onClick={handleDeleteClick}
      className="cursor-pointer"
    >
      삭제
    </Button>
  );
}
