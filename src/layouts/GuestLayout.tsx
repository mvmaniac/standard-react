import { Navigate, Outlet } from 'react-router';

import { useSession } from '@/stores/session.ts';

export default function GuestLayout() {
  const session = useSession();
  if (session) return <Navigate to="/" replace={true} />;
  return <Outlet />;
}
