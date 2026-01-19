import { useMutation } from '@tanstack/react-query';

import type { UseMutationCallback } from '@/shared/types';

import { signUp } from '@/api/auth-api';

export function useSignUpMutation(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signUp,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
