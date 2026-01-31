import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ProfileEntity, UseMutationCallback } from '@/shared/types';

import { updateProfile } from '@/api/profile';

import { QUERY_KEYS } from '@/shared/constants';

export function useUpdateProfile(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedProfile) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<ProfileEntity>(
        QUERY_KEYS.profile.byId(updatedProfile.id),
        updatedProfile,
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
