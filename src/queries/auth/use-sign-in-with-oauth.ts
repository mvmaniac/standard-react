import { useMutation } from '@tanstack/react-query';

import type { UseMutationCallback } from '@/shared/types';

import { signInWithOAuth } from '@/api/auth.ts';

export function useSignInWithOauth(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithOAuth,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
