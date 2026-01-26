import { useQuery } from '@tanstack/react-query';

import { fetchPostById } from '@/api/posts.ts';

import { QUERY_KEYS } from '@/shared/constants';

export function usePostByIdQuery({ postId, type = 'FEED' }: { postId: number; type: 'FEED' | 'DETAIL' }) {
  return useQuery({
    queryKey: QUERY_KEYS.post.byId(postId),
    queryFn: () => fetchPostById(postId),
    enabled: type !== 'FEED',
  });
}
