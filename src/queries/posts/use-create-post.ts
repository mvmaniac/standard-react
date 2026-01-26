import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { UseMutationCallback } from '@/shared/types';

import { createPostWithImages } from '@/api/posts.ts';

import { QUERY_KEYS } from '@/shared/constants';

export function useCreatePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostWithImages,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      // 캐시 초기화 invalidateQueries가 아닌 resetQueries 사용
      void queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
