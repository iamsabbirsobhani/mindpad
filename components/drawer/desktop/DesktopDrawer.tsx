'use client';
import { setSelectedPad } from '@/features/ui/uiSlice';
import { useAppDispatch } from '@/store/hooks';
import Image from 'next/image';
import { useState } from 'react';

export default function DesktopDrawer() {
  const [isopen, setisopen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

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
        <Image
          src="/images/icon.png"
          alt="logo"
          width={40}
          height={40}
          className="m-auto"
        />
      </div>

      <div className="w-11 m-auto mt-10">
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
      </div>

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
    </div>
  );
}
