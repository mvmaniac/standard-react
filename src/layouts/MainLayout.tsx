import { Link, Outlet } from 'react-router';

import ProfileButton from '@/components/header/ProfileButton.tsx';

import logo from '@/assets/logo.png';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="h-15 border-b">
        <div className="m-auto flex h-full w-full max-w-175 justify-between px-4">
          <Link to={'/'} className="flex items-center gap-2">
            <img
              src={logo}
              alt="한입 로그의 로고, 메세지 말풍선을 형상화한 모양이다"
              className="h-5"
            />
            <div className="font-bold">한입 로그</div>
          </Link>
          <ProfileButton />
        </div>
      </header>
      <main className="m-auto w-full max-w-175 flex-1 border-x px-4 py-6">
        <Outlet />
      </main>
      <footer className="text-muted-foreground border-t py-10 text-center">@devfactory</footer>
    </div>
  );
}
