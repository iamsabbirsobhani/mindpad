import Drawer from '@/components/drawer';
import ClientFile from './client-file';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { API } from '@/apiendpoint';

async function getFile(user: any) {
  const res = await fetch(API + '/api/file/files', {
    method: 'POST',
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
}

export default async function File() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  const files = await getFile(user);

  console.log(files);

  return (
    <div>
      <Drawer />
      <ClientFile user={user} files={files} />
    </div>
  );
}
