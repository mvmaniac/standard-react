import { Navigate, Route, Routes } from 'react-router';

import MainLayout from '@/layouts/MainLayout';

import ForgetPasswordPage from '@/pages/FogetPasswordPage';
import IndexPage from '@/pages/IndexPage';
import PostDetailPage from '@/pages/PostDetailPage';
import ProfileDetailPage from '@/pages/ProfileDetailPage';
import ResetPasswordPage from '@/pages/RestPasswordPage';
import SignInPage from '@/pages/SignInPage';
import SignUpPage from '@/pages/SignUpPage';

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
