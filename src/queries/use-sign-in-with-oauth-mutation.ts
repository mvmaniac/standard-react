import { useMutation } from '@tanstack/react-query';

import type { UseMutationCallback } from '@/shared/types';

import { signInWithOAuth } from '@/api/auth-api';

export function useSignInWithOauthMutation(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithOAuth,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
