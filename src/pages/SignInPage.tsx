import { useState } from 'react';
import { Link } from 'react-router';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';

import { useSignInWithOauthMutation } from '@/queries/use-sign-in-with-oauth-mutation.ts';
import { useSignInWithPasswordMutation } from '@/queries/use-sign-in-with-password-mutation.ts';

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

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

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
          className="py-6"
          type="email"
          placeholder="email"
          disabled={isPending}
          value={email}
          onChange={handleChangeEmail}
        />
        <Input
          className="py-6"
          type="password"
          placeholder="password"
          disabled={isPending}
          value={password}
          onChange={handleChangePassword}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button className="w-full" disabled={isPending} onClick={handleSignInWithPasswordClick}>
          로그인
        </Button>
        <Button
          className="w-full"
          variant="outline"
          disabled={isPending}
          onClick={handleSignInWithOAuthClick}
        >
          <img src={gitHubLogo} alt="GitHub 로그인 아이콘" className="h-4 w-4" />
          GitHub 계정으로 로그인
        </Button>
      </div>
      <div>
        <Link className="text-muted-foreground hover:underline" to={'/sign-up'}>
          계정이 없으시다면? 회원가입
        </Link>
      </div>
    </div>
  );
}
