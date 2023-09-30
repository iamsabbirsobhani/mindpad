'use client';
import Image from 'next/image';
export default function GlobalError({
  error,
}: {
  error: Error;
  reset: () => void;
}) {
  const reset = () => {
    window.location.reload();
  };
  return (
    <html>
      <body className="max-w-2xl flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 m-auto">
        <div className=" border max-w-2xl m-auto relative shadow-md rounded-lg">
          <div className="">
            <Image
              src="https://buxgpprwecixpghvntli.supabase.co/storage/v1/object/public/mindpad/assets/logo.png"
              alt="error"
              width={200}
              height={200}
              className="object-contain grayscale m-auto mt-3"
            />
          </div>
          <h2 className="p-2 text-center font-bold text-3xl text-gray-700 border-b">
            Something went wrong!
          </h2>
          <div className="text-center p-2">
            <button
              className=" w-40 bg-gray-800 rounded-lg h-11 font-bold uppercase text-white"
              onClick={() => reset()}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
