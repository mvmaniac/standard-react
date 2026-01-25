import { useQuery } from '@tanstack/react-query';

import { fetchPosts } from '@/api/posts-api.ts';

import { POST_PAGE_SIZE, QUERY_KEYS } from '@/shared/constants';

export function usePostsDataQuery(pageParam = 0) {
  return useQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: async () => {
      const from = pageParam * POST_PAGE_SIZE;
      const to = from + POST_PAGE_SIZE - 1;
      return await fetchPosts({ from, to });
    },
  });
}
