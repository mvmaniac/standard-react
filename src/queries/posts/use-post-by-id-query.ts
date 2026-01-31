import { useQuery } from '@tanstack/react-query';

import { useSession } from '@/stores/session.ts';

import { fetchPostById } from '@/api/posts.ts';

import { QUERY_KEYS } from '@/shared/constants';

export function usePostByIdQuery({
  postId,
  type = 'FEED',
}: {
  postId: number;
  type: 'FEED' | 'DETAIL';
}) {
  const session = useSession();

  return useQuery({
    queryKey: QUERY_KEYS.post.byId(postId),
    queryFn: () => fetchPostById({ postId, userId: session!.user.id }),
    enabled: type !== 'FEED',
  });
}
