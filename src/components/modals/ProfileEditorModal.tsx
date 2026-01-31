import { useEffect, useEffectEvent, useRef, useState } from 'react';

import { toast } from 'sonner';

import type { Image } from '@/shared/types';
import type { ChangeEvent } from 'react';

import { useProfileEditorModal } from '@/stores/profile-editor-modal.ts';
import { useSession } from '@/stores/session.ts';

import Fallback from '@/components/Fallback.tsx';
import Loader from '@/components/Loader.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog.tsx';
import { Input } from '@/components/ui/input.tsx';

import { useProfileQuery } from '@/queries/profiles/use-profile-query.ts';
import { useUpdateProfile } from '@/queries/profiles/use-update-profile.ts';

import defaultAvatar from '@/assets/default-avatar.png';

export default function ProfileEditorModal() {
  const session = useSession();

  const {
    data: profile,
    error: profileError,
    isPending: isProfilePending,
  } = useProfileQuery(session?.user.id ?? '');

  const { mutate: updateProfile, isPending: isUpdateProfilePending } = useUpdateProfile({
    onSuccess: () => {
      handleCloseModal();
    },
    onError: () => {
      toast.error('프로필 수정에 실패했습니다', {
        position: 'top-center',
      });
    },
  });

  const { isOpen, close } = useProfileEditorModal();

  const [avatarImage, setAvatarImage] = useState<Image | null>(null);
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewUrlRef = useRef<string>('');
  const wasOpenRef = useRef(false);

  const initFormOnOpen = useEffectEvent(() => {
    if (!profile) return;
    setNickname(profile.nickname);
    setBio(profile.bio);
    setAvatarImage(null);
  });

  const handleCloseModal = () => {
    URL.revokeObjectURL(previewUrlRef.current);
    setAvatarImage(null);
    close();
  };

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (avatarImage) {
      URL.revokeObjectURL(avatarImage.previewUrl);
    }

    const nextUrl = URL.createObjectURL(file);

    setAvatarImage({
      file,
      previewUrl: nextUrl,
    });

    previewUrlRef.current = nextUrl;
    e.target.value = '';
  };

  const handleUpdateClick = () => {
    if (nickname.trim() === '') return;
    updateProfile({
      userId: session!.user.id,
      nickname,
      bio,
      avatarImageFile: avatarImage?.file,
    });
  };

  useEffect(() => {
    previewUrlRef.current = avatarImage?.previewUrl ?? '';
  }, [avatarImage]);

  useEffect(() => {
    const wasOpen = wasOpenRef.current;

    // 열리는 순간 (close -> open)
    if (!wasOpen && isOpen && profile) {
      initFormOnOpen();
    }

    // 닫히는 순간 (open -> close)
    if (wasOpen && !isOpen) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    wasOpenRef.current = isOpen;
  }, [isOpen, profile]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleCloseModal();
      }}
    >
      <DialogContent className="flex flex-col gap-5">
        <DialogTitle>프로필 수정하기</DialogTitle>
        <DialogDescription className="sr-only">프로필을 수정해주세요.</DialogDescription>
        {profileError && <Fallback />}
        {isProfilePending && <Loader />}
        {!profileError && !isProfilePending && (
          <>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">프로필 이미지</div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                disabled={isUpdateProfilePending}
                onChange={handleSelectImage}
                className="hidden"
              />
              <img
                src={avatarImage?.previewUrl ?? profile.avatar_url ?? defaultAvatar}
                alt="프로필 이미지"
                onClick={() => fileInputRef.current?.click()}
                className="h-20 w-20 cursor-pointer rounded-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">닉네임</div>
              <Input
                value={nickname}
                disabled={isUpdateProfilePending}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">소개</div>
              <Input
                value={bio}
                disabled={isUpdateProfilePending}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <Button
              disabled={isUpdateProfilePending}
              onClick={handleUpdateClick}
              className="cursor-pointer"
            >
              수정하기
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
