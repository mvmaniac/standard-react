import { Link } from 'react-router';

import { PopoverClose } from '@radix-ui/react-popover';

import { useSession } from '@/stores/session.ts';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';

import { useProfileQuery } from '@/queries/profiles/use-profile-query.ts';

import { signOut } from '@/api/auth.ts';

import defaultAvatar from '@/assets/default-avatar.png';

export default function ProfileButton() {
  const session = useSession();
  const userId = session?.user.id ?? '';

  const { data: profile } = useProfileQuery(userId);

  const handleSignOut = () => {
    void signOut();
  };

  if (!session) return null;

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        <img
          src={profile?.avatar_url ?? defaultAvatar}
          alt="기본 프로필 이미지"
          className="h-6 w-6 rounded-full object-cover"
        />
      </PopoverTrigger>
      <PopoverContent className="flex w-40 flex-col p-0">
        <PopoverClose asChild>
          <Link to={`/profile/${userId}`}>
            <div className="hover:bg-muted cursor-pointer px-4 py-3 text-sm">프로필</div>
          </Link>
        </PopoverClose>

        <PopoverClose asChild>
          <div onClick={handleSignOut} className="hover:bg-muted cursor-pointer px-4 py-3 text-sm">
            로그아웃
          </div>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
