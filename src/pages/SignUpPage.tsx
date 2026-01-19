import { useState } from 'react';
import { Link } from 'react-router';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useSignUpMutation } from '@/queries/use-sign-up-mutation';

import { generateErrorMessage } from '@/shared/utils';

export default function SignUpPage() {
  const { mutate: signUp, isPending: isSignUpPending } = useSignUpMutation({
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, {
        position: 'top-center',
      });
    },
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

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
          className="py-6"
          type="email"
          placeholder="email"
          disabled={isSignUpPending}
          value={email}
          onChange={handleChangeEmail}
        />
        <Input
          className="py-6"
          type="password"
          placeholder="password"
          disabled={isSignUpPending}
          value={password}
          onChange={handleChangePassword}
        />
      </div>
      <div>
        <Button className="w-full" disabled={isSignUpPending} onClick={handleSignUpClick}>
          회원가입
        </Button>
      </div>
      <div>
        <Link className="text-muted-foreground hover:underline" to={'/sign-in'}>
          이미 계정이 있다면? 로그인
        </Link>
      </div>
    </div>
  );
}
