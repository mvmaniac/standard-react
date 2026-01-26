import { HeartIcon, MessageCircle } from 'lucide-react';

import { useSession } from '@/stores/session.ts';

import Fallback from '@/components/Fallback.tsx';
import Loader from '@/components/Loader.tsx';
import DeletePostButton from '@/components/posts/DeletePostButton.tsx';
import EditPostButton from '@/components/posts/EditPostItemButton.tsx';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel.tsx';

import { usePostByIdQuery } from '@/queries/posts/use-post-by-id-query.ts';

import { formatTimeAgo } from '@/shared/utils';

import defaultAvatar from '@/assets/default-avatar.png';

export default function PostItem({ postId }: { postId: number }) {
  const {
    data: post,
    isPending,
    error,
  } = usePostByIdQuery({
    postId,
    type: 'FEED',
  });

  const session = useSession();
  const userId = session?.user.id;

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  const isMine = post.author.id === userId;

  return (
    <div className="flex flex-col gap-4 border-b pb-8">
      <div className="flex justify-between">
        <div className="flex items-start gap-4">
          <img
            src={post.author.avatar_url ?? defaultAvatar}
            alt={`${post.author.nickname}의 프로필 이미지`}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <div className="font-bold hover:underline">{post.author.nickname}</div>
            <div className="text-muted-foreground text-sm">{formatTimeAgo(post.created_at)}</div>
          </div>
        </div>

        <div className="text-muted-foreground flex text-sm">
          {isMine && (
            <>
              <EditPostButton {...post} />
              <DeletePostButton id={post.id} />{' '}
            </>
          )}
        </div>
      </div>

      <div className="flex cursor-pointer flex-col gap-5">
        <div className="line-clamp-2 wrap-break-word whitespace-pre-wrap">{post.content}</div>
        <Carousel>
          <CarouselContent>
            {post.image_urls?.map((url, index) => (
              <CarouselItem className={`basis-3/5`} key={index}>
                <div className="overflow-hidden rounded-xl">
                  <img src={url} alt={url} className="h-full max-h-87.5 w-full object-cover" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex gap-2">
        <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border p-2 px-4 text-sm">
          <HeartIcon className="h-4 w-4" />
          <span>0</span>
        </div>

        <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border p-2 px-4 text-sm">
          <MessageCircle className="h-4 w-4" />
          <span>댓글 달기</span>
        </div>
      </div>
    </div>
  );
}
