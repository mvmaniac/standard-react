import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { fetchPosts } from '@/api/posts.ts';

import { POST_PAGE_SIZE, QUERY_KEYS } from '@/shared/constants';

export function useInfinitePostsQuery() {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: async ({ pageParam }) => {
      const from = pageParam * POST_PAGE_SIZE;
      const to = from + POST_PAGE_SIZE - 1;

      // 캐시 정규화
      const posts = await fetchPosts({ from, to });
      posts.forEach((post) => {
        queryClient.setQueryData(QUERY_KEYS.post.byId(post.id), post);
      });

      return posts.map((post) => post.id);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < POST_PAGE_SIZE) return undefined;
      return allPages.length;
    },
    // staleTime으로 안가게 하여 refetching 제외 처리 (수동으로 fetch 처리)
    staleTime: Infinity,
  });
}
