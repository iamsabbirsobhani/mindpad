import Drawer from '@/components/drawer';
import ProfileMenu from '@/components/profile/profilemenu';
import ClientDashboard from './client-dashboard';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { API } from '@/apiendpoint';

async function getData(user: any) {
  const res = await fetch(API + '/api/pads', {
    method: 'POST',
    body: JSON.stringify({ ...user, page: 0 }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
}

async function getSpace(user: any) {
  const res = await fetch(API + '/api/pad/database/space', {
    method: 'POST',
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
}
async function getStorageSpace(user: any) {
  const res = await fetch(API + '/api/file/space', {
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
  const space = await getSpace(user);
  const fileSpace = await getStorageSpace(user);

  return (
    <>
      <Drawer fileSpace={fileSpace} />
      <ClientDashboard
        user={user}
        pads={data}
        space={space}
        fileSpace={fileSpace}
      >
        <ProfileMenu />
      </ClientDashboard>
    </>
  );
}
