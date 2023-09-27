import Image from 'next/image';

export default function DesktopDrawer() {
  return (
    <div className=" h-[100vh] border-r-[1px] w-20 fixed top-0 left-0 p-2">
      <div className=" mt-3">
        <Image
          src="/images/icon.png"
          alt="logo"
          width={40}
          height={40}
          className="m-auto"
        />
      </div>

      <div className="w-11 m-auto mt-10">
        <button className=" bg-gray-800 rounded-full w-11 h-11 flex justify-center items-center text-gray-50 shadow-lg">
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
    </div>
  );
}
