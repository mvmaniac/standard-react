import { useQuery } from '@tanstack/react-query';

import { fetchComments } from '@/api/comment.ts';

import { QUERY_KEYS } from '@/shared/constants';

export function useCommentsQuery(postId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.comment.post(postId),
    queryFn: () => fetchComments(postId),
  });
}
