import { useMutation } from '@tanstack/react-query';

import type { UseMutationCallback } from '@/shared/types';

import { deleteImageInPath } from '@/api/images.ts';
import { deletePost } from '@/api/posts.ts';

export function useDeletePost(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletePost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      if (!deletePost.image_urls || deletePost.image_urls.length <= 0) return
      await deleteImageInPath(`${deletePost.author_id}/${deletePost.id}`);
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
