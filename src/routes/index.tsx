import { Navigate, Route, Routes } from 'react-router';

import MainLayout from '@/layouts/MainLayout.tsx';

import ForgetPasswordPage from '@/pages/FogetPasswordPage.tsx';
import IndexPage from '@/pages/IndexPage.tsx';
import PostDetailPage from '@/pages/PostDetailPage.tsx';
import ProfileDetailPage from '@/pages/ProfileDetailPage.tsx';
import ResetPasswordPage from '@/pages/RestPasswordPage.tsx';
import SignInPage from '@/pages/SignInPage.tsx';
import SignUpPage from '@/pages/SignUpPage.tsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<IndexPage />} />

        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/post/:postId" element={<PostDetailPage />} />
        <Route path="/profile/:userId" element={<ProfileDetailPage />} />

        <Route path="*" element={<Navigate to={'/'} />} />
      </Route>
    </Routes>
  );
}
