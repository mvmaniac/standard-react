import { useState } from 'react';
import { Link } from 'react-router';

import { toast } from 'sonner';

import type { ChangeEvent } from 'react';

import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';

import { useSignUp } from '@/queries/auth/use-sign-up.ts';

import { generateErrorMessage } from '@/shared/utils';

export default function SignUpPage() {
  const { mutate: signUp, isPending: isSignUpPending } = useSignUp({
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, {
        position: 'top-center',
      });
    },
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSignUpClick = () => {
    if (email.trim() === '') return;
    if (password.trim() === '') return;
    signUp({ email, password });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">회원가입</div>
      <div className="flex flex-col gap-2">
        <Input
          type="email"
          value={email}
          placeholder="email"
          disabled={isSignUpPending}
          onChange={handleChangeEmail}
          className="py-6"
        />
        <Input
          type="password"
          value={password}
          placeholder="password"
          disabled={isSignUpPending}
          onChange={handleChangePassword}
          className="py-6"
        />
      </div>
      <div>
        <Button disabled={isSignUpPending} onClick={handleSignUpClick} className="w-full">
          회원가입
        </Button>
      </div>
      <div>
        <Link to={'/sign-in'} className="text-muted-foreground hover:underline">
          이미 계정이 있다면? 로그인
        </Link>
      </div>
    </div>
  );
}
