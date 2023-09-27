import Drawer from '@/components/drawer';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function Note() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  return (
    <>
      <Drawer />
    </>
  );
}
