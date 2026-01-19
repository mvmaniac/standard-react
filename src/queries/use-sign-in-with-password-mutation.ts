import { useMutation } from '@tanstack/react-query';

import type { UseMutationCallback } from '@/shared/types';

import { signInWithPassword } from '@/api/auth-api';

export function useSignInWithPasswordMutation(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
