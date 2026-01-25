import { Navigate, Outlet } from 'react-router';

import { useSession } from '@/stores/session.ts';

export default function MemberLayout() {
  const session = useSession();
  if (!session) return <Navigate to="/sign-in" replace={true} />;
  return <Outlet />;
}
