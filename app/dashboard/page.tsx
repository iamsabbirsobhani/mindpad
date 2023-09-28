import Drawer from '@/components/drawer';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function Note() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  return (
    <>
      <Drawer />
      <div className="ml-24">
        <LogoutLink>
          <button className="hover:bg-blue-600 transition-all duration-300 bg-blue-500 font-bold text-gray-50 p-2 rounded-md w-48 self-center m-2 uppercase shadow-lg h-10">
            Log out
          </button>
        </LogoutLink>
        <div></div>
      </div>
    </>
  );
}
