import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Post, UseMutationCallback } from '@/shared/types';

import { togglePostLike } from '@/api/posts.ts';

import { QUERY_KEYS } from '@/shared/constants';

export default function useTogglePostLike(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePostLike,
    onMutate: async ({ postId }) => {
      // 낙관적 업데이트
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.post.byId(postId),
      });

      const prevPost = queryClient.getQueryData<Post>(QUERY_KEYS.post.byId(postId));

      queryClient.setQueryData<Post>(QUERY_KEYS.post.byId(postId), (post) => {
        if (!post) throw new Error('포스트가 존재하지 않습니다.');
        return {
          ...post,
          isLiked: !post.isLiked,
          like_count: post.isLiked ? post.like_count - 1 : post.like_count + 1,
        };
      });

      return { prevPost };
    },
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error, { postId }, context) => {
      if (context?.prevPost) {
        queryClient.setQueryData<Post>(QUERY_KEYS.post.byId(postId), context.prevPost);
      }

      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
