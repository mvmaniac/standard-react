import { useQuery } from '@tanstack/react-query';

import type { PostgrestError } from '@supabase/supabase-js';

import { useSession } from '@/stores/session.ts';

import { createProfile, fetchProfile } from '@/api/profile.ts';

import { QUERY_KEYS } from '@/shared/constants';

export function useProfileQuery(userId: string) {
  const session = useSession();
  const isMine = userId === session?.user.id;

  return useQuery({
    queryKey: QUERY_KEYS.profile.byId(userId),
    queryFn: async () => {
      try {
        return await fetchProfile(userId);
      } catch (error) {
        if (isMine && (error as PostgrestError).code === 'PGRST116') {
          return await createProfile(userId);
        }
        throw error;
      }
    },
    enabled: !!userId,
  });
}
