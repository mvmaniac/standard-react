import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { UseMutationCallback } from '@/shared/types';

import { deleteImagesInPath } from '@/api/images.ts';
import { deletePost } from '@/api/posts.ts';

import { QUERY_KEYS } from '@/shared/constants';

export function useDeletePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletePost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      if (deletePost.image_urls && deletePost.image_urls.length > 0) {
        await deleteImagesInPath(`${deletePost.author_id}/${deletePost.id}`);
      }

      await queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
