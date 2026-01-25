import { Navigate, Route, Routes } from 'react-router';

import GuestLayout from '@/layouts/GuestLayout.tsx';
import MainLayout from '@/layouts/MainLayout.tsx';
import MemberLayout from '@/layouts/MemberLayout.tsx';

import ForgetPasswordPage from '@/pages/ForgetPasswordPage.tsx';
import IndexPage from '@/pages/IndexPage.tsx';
import PostDetailPage from '@/pages/PostDetailPage.tsx';
import ProfileDetailPage from '@/pages/ProfileDetailPage.tsx';
import ResetPasswordPage from '@/pages/ResetPasswordPage.tsx';
import SignInPage from '@/pages/SignInPage.tsx';
import SignUpPage from '@/pages/SignUpPage.tsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<GuestLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
        </Route>

        <Route element={<MemberLayout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/post/:postId" element={<PostDetailPage />} />
          <Route path="/profile/:userId" element={<ProfileDetailPage />} />
        </Route>

        <Route path="*" element={<Navigate to={'/'} />} />
      </Route>
    </Routes>
  );
}
