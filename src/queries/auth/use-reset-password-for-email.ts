import { useMutation } from '@tanstack/react-query';

import type { UseMutationCallback } from '@/shared/types';

import { resetPasswordForEmail } from '@/api/auth.ts';

export function useResetPasswordForEmail(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: resetPasswordForEmail,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
