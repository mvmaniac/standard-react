import { HeartIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useSession } from '@/stores/session.ts';

import useTogglePostLike from '@/queries/posts/use-toggle-post-like.ts';

import { cn } from '@/shared/utils';

export default function LikePostButton({
  id,
  likeCount,
  isLiked,
}: {
  id: number;
  likeCount: number;
  isLiked: boolean;
}) {
  const session = useSession();

  const { mutate: togglePostLike } = useTogglePostLike({
    onError: () => {
      toast.error('좋아요 요청에 실패했습니다', {
        position: 'top-center',
      });
    },
  });

  const handleLikeClick = () => {
    void togglePostLike({
      postId: id,
      userId: session!.user.id,
    });
  };

  return (
    <div
      onClick={handleLikeClick}
      className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border p-2 px-4 text-sm"
    >
      <HeartIcon className={cn('h-4 w-4', isLiked && 'fill-foreground border-foreground')} />
      <span>{likeCount}</span>
    </div>
  );
}
