import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Post, UseMutationCallback } from '@/shared/types';

import { updatePost } from '@/api/posts.ts';

import { QUERY_KEYS } from '@/shared/constants';

export function useUpdatePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      // 캐시 데이터에 완성된 포스트만 추가
      queryClient.setQueryData<Post>(QUERY_KEYS.post.byId(updatedPost.id), (prevPost) => {
        if (!prevPost) throw Error(`${updatedPost.id}에 해당하는 포스트를 캐시 데이터에서 찾을 수 없습니다.`);
        return { ...prevPost, ...updatedPost}
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
