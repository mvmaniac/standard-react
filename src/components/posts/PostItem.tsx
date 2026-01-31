import { Link } from 'react-router';

import { MessageCircle } from 'lucide-react';

import { useSession } from '@/stores/session.ts';

import Fallback from '@/components/Fallback.tsx';
import Loader from '@/components/Loader.tsx';
import DeletePostButton from '@/components/posts/DeletePostButton.tsx';
import EditPostButton from '@/components/posts/EditPostItemButton.tsx';
import LikePostButton from '@/components/posts/LikePostButton.tsx';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel.tsx';

import { usePostByIdQuery } from '@/queries/posts/use-post-by-id-query.ts';

import { cn, formatTimeAgo } from '@/shared/utils';

import defaultAvatar from '@/assets/default-avatar.png';

type PostListTye = 'FEED' | 'DETAIL';

export interface PostItemProps {
  postId: number;
  type: PostListTye;
}

export default function PostItem({ postId, type }: PostItemProps) {
  const session = useSession();
  const userId = session?.user.id;

  const {
    data: post,
    isPending,
    error,
  } = usePostByIdQuery({
    postId,
    type,
  });

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  const isMine = post.author.id === userId;
  const isFeed = type === 'FEED';

  return (
    <div className={cn('flex flex-col gap-4 pb-8', isFeed && 'border-b')}>
      <div className="flex justify-between">
        <div className="flex items-start gap-4">
          <Link to={`/profile/${post.author_id}`}>
            <img
              src={post.author.avatar_url ?? defaultAvatar}
              alt={`${post.author.nickname}의 프로필 이미지`}
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>

          <div>
            <div className="font-bold hover:underline">{post.author.nickname}</div>
            <div className="text-muted-foreground text-sm">{formatTimeAgo(post.created_at)}</div>
          </div>
        </div>

        <div className="text-muted-foreground flex text-sm">
          {isMine && (
            <>
              <EditPostButton {...post} />
              <DeletePostButton id={post.id} />
            </>
          )}
        </div>
      </div>
      <div className="flex cursor-pointer flex-col gap-5">
        {isFeed ? (
          <Link to={`/post/${post.id}`}>
            <div className="line-clamp-2 wrap-break-word whitespace-pre-wrap">{post.content}</div>
          </Link>
        ) : (
          <div className="wrap-break-word whitespace-pre-wrap">{post.content}</div>
        )}

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
        <LikePostButton id={post.id} likeCount={post.like_count} isLiked={post.isLiked} />

        {isFeed && (
          <Link to={`/post/${post.id}`}>
            <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border p-2 px-4 text-sm">
              <MessageCircle className="h-4 w-4" />
              <span>댓글 달기</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
