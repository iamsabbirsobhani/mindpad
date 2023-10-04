'use client';
import { setSelectedPad } from '@/features/ui/uiSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function DesktopDrawer({ fileSpace }: { fileSpace: any }) {
  const [isopen, setisopen] = useState<boolean>(false);
  const space = useAppSelector((state) => state.ui.spaceUsed);
  const dispatch = useAppDispatch();
  const path = usePathname();

  const items = [
    {
      id: 1,
      color: 'bg-amber-300',
      hover: 'bg-amber-400',
    },
    {
      id: 2,
      color: 'bg-rose-300',
      hover: 'bg-rose-400',
    },
    {
      id: 3,
      color: 'bg-violet-300',
      hover: 'bg-violet-400',
    },
    {
      id: 4,
      color: 'bg-cyan-300',
      hover: 'bg-cyan-400',
    },
    {
      id: 5,
      color: 'bg-lime-300',
      hover: 'bg-lime-400',
    },
  ];

  return (
    <div className="h-full border-r-[1px] w-20 fixed top-0 left-0 p-2 bottom-0 bg-white z-10 ">
      <div className="mt-3">
        <Link href="/">
          <Image
            src="/images/icon.png"
            alt="logo"
            width={40}
            height={40}
            className="m-auto"
          />
        </Link>
      </div>

      <div className="w-11 m-auto mt-10">
        <Link href="/file">
          <button
            className={`bg-gray-800 hover:bg-gray-600 rounded-full w-11 h-11 flex justify-center items-center text-gray-50 shadow-lg transition-all duration-700 relative}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
          </button>
        </Link>
      </div>

      {path === '/file' ? (
        <div className="w-11 m-auto mt-10">
          <Link href="/">
            <button
              className={`bg-gray-800 hover:bg-gray-600 rounded-full w-11 h-11 flex justify-center items-center text-gray-50 shadow-lg transition-all duration-700 relative}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            </button>
          </Link>
        </div>
      ) : null}

      {path === '/dashboard' ? (
        <div className="w-11 m-auto mt-10">
          <Link href="/dashboard">
            <button
              className={`bg-gray-800 hover:bg-gray-600 rounded-full w-11 h-11 flex justify-center items-center text-gray-50 shadow-lg transition-all duration-700 relative ${
                isopen
                  ? ' -top-2 rotate-45  transition-all duration-300 ease-out-[cubic-bezier(.05,.31,.33,1.33)]'
                  : ' rotate-0 top-0 transition-all duration-300   ease-[cubic-bezier(.05,.31,.33,1.33)]'
              }}`}
              onClick={() => setisopen(!isopen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </Link>
        </div>
      ) : null}

      <div
        className={`mt-3 overflow-hidden  delay-300 ${
          isopen
            ? ' max-h-full transition-all duration-700 ease-in-out'
            : ' max-h-[0%] transition-all duration-700 ease-in-out'
        }`}
      >
        {isopen &&
          items.map((item, index) => (
            <div key={item.id} className=" text-center">
              <button
                className={` w-5 h-5 transition-all duration-300 rounded-full  m-auto mt-4 shadow-md cursor-pointer hover:${item.hover} ${item.color}`}
                onClick={() => {
                  dispatch(setSelectedPad(item));
                }}
              ></button>
            </div>
          ))}
      </div>

      {/* total spaced used storage by an user */}
      {fileSpace && fileSpace.space ? (
        <div className="absolute bottom-20">
          <div className="mt-3">
            <div className="text-center">
              <span className="text-xs text-gray-500">Storage:</span>
            </div>
            <div className="text-center">
              <span className="text-xs text-gray-500">
                {fileSpace.space}Mb <br /> of 1000Mb
              </span>
            </div>
          </div>
        </div>
      ) : null}
      {/* total spaced used database in kb(note column) */}
      {space && space.space ? (
        <div className="absolute bottom-1">
          <div className="mt-3">
            <div className="text-center">
              <span className="text-xs text-gray-500">Database:</span>
            </div>
            <div className="text-center">
              <span className="text-xs text-gray-500">
                {space.space}kb <br /> of 1000kb
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
