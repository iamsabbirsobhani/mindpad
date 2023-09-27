import Image from 'next/image';
import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/server';

export default function Home() {
  return (
    <main className=" mt-[10vh]">
      <div className="relative">
        <div
          className="mt-5 mb-2 m-auto "
          style={{
            backgroundImage:
              'url(https://buxgpprwecixpghvntli.supabase.co/storage/v1/object/public/mindpad/assets/notebg.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '25vh',
            width: '30vh',
            opacity: '0.2',
          }}
        ></div>
        <div className=" absolute left-0 right-0 top-0 bottom-0 w-[150px] m-auto flex justify-center items-center">
          <Image
            src="https://buxgpprwecixpghvntli.supabase.co/storage/v1/object/public/mindpad/assets/logo.png"
            alt="MindPad Logo"
            width={150}
            height={150}
            className="object-contain "
          />
        </div>
      </div>
      <div className="text-center mt-5 mb-2">
        <h1 className="font-light text-lg text-gray-500">
          Your digital notepad for organizing your thoughts
        </h1>
      </div>
      <div className="max-w-3xl  m-auto bg-no-repeat  flex flex-col justify-center items-center bg-opacity-20">
        <div className=" flex flex-col ">
          <button className=" bg-blue-500 font-bold text-gray-50 p-2 rounded-md w-48 self-center m-2 uppercase shadow-lg h-12">
            <LoginLink>Sign in</LoginLink>
          </button>
          <button className=" backdrop-blur-md border p-2 rounded-md w-48 self-center m-2 uppercase shadow-lg font-bold h-12 text-gray-500">
            <RegisterLink>Sign up</RegisterLink>
          </button>
        </div>
      </div>
    </main>
  );
}
