import Drawer from '@/components/drawer';
import ProfileMenu from '@/components/profile/profilemenu';
import ClientDashboard from './client-dashboard';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { API } from '@/apiendpoint';

async function getData(user: any) {
  const res = await fetch(API + '/api/pads', {
    method: 'POST',
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
}

export default async function Note() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }
  const data = await getData(user);
  return (
    <>
      <Drawer />
      <ClientDashboard user={user} pads={data}>
        <ProfileMenu />
      </ClientDashboard>
    </>
  );
}
