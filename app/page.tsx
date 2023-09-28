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
      <div className="max-w-3xl focus:outline-none m-auto bg-no-repeat  flex flex-col justify-center items-center bg-opacity-20">
        <div className=" flex flex-col ">
          <LoginLink className=" text-center flex justify-center items-center focus:outline-none bg-blue-500 font-bold text-gray-50 p-2 rounded-md w-48 self-center m-2 uppercase  shadow-lg h-12 border hover:bg-blue-600 duration-300">
            Sign in
          </LoginLink>
          <RegisterLink className="text-center flex justify-center items-center focus:outline-none backdrop-blur-md border p-2 rounded-md w-48 self-center m-2 uppercase shadow-lg font-bold h-12 text-gray-500 hover:bg-gray-100 hover:text-gray-600 duration-300">
            Sign up
          </RegisterLink>
        </div>
      </div>
    </main>
  );
}
