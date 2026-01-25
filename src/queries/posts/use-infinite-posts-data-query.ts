import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchPosts } from '@/api/posts-api.ts';

import { POST_PAGE_SIZE, QUERY_KEYS } from '@/shared/constants';

export function useInfinitePostsDataQuery() {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: async ({ pageParam }) => {
      const from = pageParam * POST_PAGE_SIZE;
      const to = from + POST_PAGE_SIZE - 1;
      return await fetchPosts({ from, to });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < POST_PAGE_SIZE) return undefined;
      return allPages.length;
    },
  });
}
