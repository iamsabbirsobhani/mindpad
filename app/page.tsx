import Image from 'next/image';
import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/server';

export default function Home() {
  return (
    <main className="">
      <h1>MindPad</h1>
      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink>
    </main>
  );
}
