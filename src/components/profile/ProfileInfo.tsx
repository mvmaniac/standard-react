import { useSession } from '@/stores/session.ts';

import Fallback from '@/components/Fallback.tsx';
import Loader from '@/components/Loader.tsx';
import EditProfileButton from '@/components/profile/EditProfileButton.tsx';

import { useProfileQuery } from '@/queries/profiles/use-profile-query.ts';

import defaultAvatar from '@/assets/default-avatar.png';

export function ProfileInfo({ userId }: { userId: string }) {
  const session = useSession();

  const {
    data: profile,
    error: profileError,
    isPending: isProfilePending,
  } = useProfileQuery(userId);

  if (profileError) return <Fallback />;
  if (isProfilePending) return <Loader />;

  const isMine = session?.user.id === userId;
  const profileUrl = profile.avatar_url ?? defaultAvatar;

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <img src={profileUrl} alt={profileUrl} className="h-30 w-30 rounded-full object-cover" />
      <div className="flex flex-col items-center gap-2">
        <div className="text-xl font-bold">{profile.nickname}</div>
        <div className="text-muted-foreground">{profile.bio}</div>
      </div>
      {isMine && <EditProfileButton />}
    </div>
  );
}
