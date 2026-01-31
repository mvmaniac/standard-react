import { useState } from 'react';
import { useNavigate } from 'react-router';

import { toast } from 'sonner';

import type { ChangeEvent } from 'react';

import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';

import { useUpdatePassword } from '@/queries/auth/use-update-password.ts';

import { generateErrorMessage } from '@/shared/utils';

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const { mutate: updatePassword, isPending: isUpdatePasswordPending } = useUpdatePassword({
    onSuccess: () => {
      toast.info('비밀번호가 성공적으로 변경되었습니다.', {
        position: 'top-center',
      });
      void navigate('/');
    },
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, {
        position: 'top-center',
      });
      setPassword('');
    },
  });

  const [password, setPassword] = useState('');

  const handleUpdatePasswordClick = () => {
    if (password.trim() === '') return;
    updatePassword(password);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold">비밀번호 재설정하기</div>
        <div className="text-muted-foreground">새로운 비밀번호를 입력하세요</div>
      </div>
      <Input
        type="password"
        value={password}
        placeholder="password"
        disabled={isUpdatePasswordPending}
        onChange={(e) => setPassword(e.target.value)}
        className="py-6"
      />
      <Button
        disabled={isUpdatePasswordPending}
        onClick={handleUpdatePasswordClick}
        className="w-full"
      >
        비밀번호 변경하기
      </Button>
    </div>
  );
}
