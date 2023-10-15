import Drawer from '@/components/drawer';
import ClientPad from './client-pad';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function Pad() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }
  return (
    <div>
      <Drawer fileSpace={null} />
      <ClientPad email={user && user.email} />
    </div>
  );
}
