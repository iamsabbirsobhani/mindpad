import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';

export default function ProfileMenu() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = getUser();
  return (
    <div>
      {isAuthenticated() ? (
        <>
          <div className="flex border-b-[1px] p-5">
            <div className="flex justify-center items-center h-[50px] w-[50px] mr-3">
              {user && user.given_name && !user.picture ? (
                <div className="border rounded-full w-12 h-12 flex justify-center items-center cursor-pointer">
                  {user.given_name.charAt(0).toUpperCase() +
                    user.given_name.charAt(1).toUpperCase()}
                </div>
              ) : (
                <Image
                  src={user.picture || ''}
                  alt="Avatar"
                  width={50}
                  height={50}
                  className="object-contain rounded-full cursor-pointer"
                />
              )}
            </div>
            <div>
              <div className="flex justify-center flex-col">
                <h1 className="font-bold text-gray-500 text-md">
                  {user.given_name}
                </h1>
                <h1 className="font-light text-gray-500 text-md">
                  {user.email}
                </h1>
              </div>
            </div>
          </div>
          <div className="p-3">
            <LogoutLink className="hover:bg-gray-600 transition-all duration-300 bg-gray-800 font-bold text-gray-50 p-2 rounded-md  w-full self-center uppercase h-10 block text-center">
              Log out
            </LogoutLink>
          </div>
        </>
      ) : (
        <h1>Not Authenticated</h1>
      )}
    </div>
  );
}
