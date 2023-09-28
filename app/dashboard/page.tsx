import Drawer from '@/components/drawer';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function Note() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  return (
    <>
      <Drawer />
      <div className="ml-24 mt-5">
        {/* <LogoutLink>
          <button className="hover:bg-blue-600 transition-all duration-300 bg-blue-500 font-bold text-gray-50 p-2 rounded-md w-48 self-center m-2 uppercase shadow-lg h-10">
            Log out
          </button>
        </LogoutLink> */}
        <div>
          {/* note search */}
          <div className=" relative">
            <input
              type="search"
              className="focus:outline-none ml-7"
              placeholder="Search"
            />
            <div className="absolute flex justify-center items-center top-0  bottom-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
          {/* profile */}
          <div>
            <div className=" relative">
              <button className=""></button>
            </div>
          </div>
        </div>

        {/* Notes title */}
        <div className="mt-2 mb-2">
          <h1 className=" text-5xl font-extrabold">Notes</h1>
        </div>

        {/* notes */}
        <div></div>
      </div>
    </>
  );
}
