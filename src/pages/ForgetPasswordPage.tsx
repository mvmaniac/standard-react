import { useState } from 'react';

import { toast } from 'sonner';

import type { ChangeEvent } from 'react';

import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';

import { useResetPasswordForEmail } from '@/queries/auth/use-reset-password-for-email.ts';

import { generateErrorMessage } from '@/shared/utils';

export default function ForgetPasswordPage() {
  const { mutate: resetPasswordForEmail, isPending: isResetPasswordForEmailPending } =
    useResetPasswordForEmail({
      onSuccess: () => {
        toast.info('인증 메일이 잘 발송되었습니다.', {
          position: 'top-center',
        });
        setEmail('');
      },
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: 'top-center',
        });
        setEmail('');
      },
    });

  const [email, setEmail] = useState('');

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handleSendEmailClick = () => {
    if (email.trim() === '') return;
    resetPasswordForEmail(email);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold">비밀번호를 잊으셨나요?</div>
        <div className="text-muted-foreground">
          이메일로 비밀번호를 재설정 할 수 있는 인증 링크를 보내드립니다.
        </div>
      </div>
      <Input
        value={email}
        placeholder="example@abc.com"
        disabled={isResetPasswordForEmailPending}
        onChange={handleChangeEmail}
        className="py-6"
      />
      <Button
        disabled={isResetPasswordForEmailPending}
        onClick={handleSendEmailClick}
        className="w-full"
      >
        인증 메일 요청하기
      </Button>
    </div>
  );
}
