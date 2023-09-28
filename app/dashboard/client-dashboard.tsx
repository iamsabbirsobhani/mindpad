'use client';
import Pad from '@/components/pad/pad';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Image from 'next/image';
import { useRef, useState } from 'react';

export default function ClientDashboard({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  const [isprofilemenuopen, setisprofilemenuopen] = useState<boolean>(false);
  const modalRef = useRef(null);
  const selectedpadStyle = useAppSelector(
    (state: RootState) => state.ui.selectedPad,
  );

  useOutsideClick(() => {
    setisprofilemenuopen(false);
  }, modalRef);

  return (
    <>
      <div className="ml-24 mt-10">
        <div className=" flex justify-between items-center">
          {/* note search */}
          <div className=" relative">
            <input
              type="search"
              className="focus:outline-none ml-7 w-40 sm:w-28 md:w-32 lg:w-32 xl:w-96 2xl:w-96"
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
          <div className="mr-5 relative">
            <div className="relative">
              <button
                className="ml-2 rounded-full w-10 h-10 text-gray-50 font-bold mr-5"
                ref={modalRef}
                onClick={() => {
                  setisprofilemenuopen(!isprofilemenuopen);
                  console.log('clicked profile');
                }}
              >
                {/* profile image */}
                {user && user.given_name && !user.picture ? (
                  user.given_name.charAt(0).toUpperCase() +
                  user.given_name.charAt(1).toUpperCase()
                ) : (
                  <Image
                    src={user.picture || ''}
                    alt="Avatar"
                    width={50}
                    height={50}
                    className="object-contain rounded-full"
                  />
                )}
              </button>
            </div>
            {/* profile menu */}
            <div
              ref={modalRef}
              className={
                `transition-all duration-300 absolute right-5 mt-1 bg-white rounded-xl shadow-lg z-10 ` +
                `${
                  isprofilemenuopen
                    ? 'visible opacity-100'
                    : ' invisible opacity-0 '
                }`
              }
            >
              {children}
            </div>
          </div>
        </div>

        {/* Notes title */}
        <div className="mt-5 mb-2">
          <h1 className=" text-5xl font-extrabold text-gray-800">Notes</h1>
        </div>

        {/* new pad */}
        <div className="">
          <Pad color={selectedpadStyle?.color} style={selectedpadStyle} />
        </div>

        {/* notes */}
        <div className="flex flex-wrap">
          <Pad color={'bg-red-500  '} style={{ id: 1, color: '', hover: '' }} />
          <Pad
            color={'bg-green-500 '}
            style={{ id: 1, color: '', hover: '' }}
          />
          <Pad color={'bg-lime-500 '} style={{ id: 1, color: '', hover: '' }} />
        </div>
      </div>
    </>
  );
}
