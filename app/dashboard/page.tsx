import Drawer from '@/components/drawer';
import ProfileMenu from '@/components/profile/profilemenu';
import ClientDashboard from './client-dashboard';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';

export default function Note() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = getUser();
  return (
    <>
      <Drawer />
      <ClientDashboard user={user}>
        <ProfileMenu />
      </ClientDashboard>
    </>
  );
}
