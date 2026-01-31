import { useQuery } from '@tanstack/react-query';

import { useSession } from '@/stores/session.ts';

import { fetchPosts } from '@/api/posts.ts';

import { POST_PAGE_SIZE, QUERY_KEYS } from '@/shared/constants';

export function usePostsQuery(pageParam = 0) {
  const session = useSession();

  return useQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: async () => {
      const from = pageParam * POST_PAGE_SIZE;
      const to = from + POST_PAGE_SIZE - 1;
      return await fetchPosts({ from, to, userId: session!.user.id });
    },
  });
}
