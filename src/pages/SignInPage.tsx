import { useState } from 'react';
import { Link } from 'react-router';

import { toast } from 'sonner';

import type { ChangeEvent } from 'react';

import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';

import { useSignInWithOauthMutation } from '@/queries/auth/use-sign-in-with-oauth-mutation.ts';
import { useSignInWithPasswordMutation } from '@/queries/auth/use-sign-in-with-password-mutation.ts';

import { generateErrorMessage } from '@/shared/utils';

import gitHubLogo from '@/assets/github-mark.svg';

export default function SignInPage() {
  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignInWithPasswordMutation({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: 'top-center',
        });

        setPassword('');
      },
    });
  const { mutate: signInWithOAuth, isPending: isSignInWithOAuthPending } =
    useSignInWithOauthMutation({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: 'top-center',
        });
      },
    });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isPending = isSignInWithPasswordPending || isSignInWithOAuthPending;

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSignInWithPasswordClick = () => {
    if (email.trim() === '') return;
    if (password.trim() === '') return;
    signInWithPassword({ email, password });
  };

  const handleSignInWithOAuthClick = () => {
    signInWithOAuth('github');
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-2">
        <Input
          type="email"
          value={email}
          placeholder="email"
          disabled={isPending}
          onChange={handleChangeEmail}
          className="py-6"
        />
        <Input
          type="password"
          value={password}
          placeholder="password"
          disabled={isPending}
          onChange={handleChangePassword}
          className="py-6"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button disabled={isPending} onClick={handleSignInWithPasswordClick} className="w-full">
          로그인
        </Button>
        <Button
          variant="outline"
          disabled={isPending}
          onClick={handleSignInWithOAuthClick}
          className="w-full"
        >
          <img src={gitHubLogo} alt="GitHub 로그인 아이콘" className="h-4 w-4" />
          GitHub 계정으로 로그인
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Link to={'/sign-up'} className="text-muted-foreground hover:underline">
          계정이 없으시다면? 회원가입
        </Link>
        <Link to={'/forget-password'} className="text-muted-foreground hover:underline">
          비밀번호를 잊으셨나요?
        </Link>
      </div>
    </div>
  );
}
