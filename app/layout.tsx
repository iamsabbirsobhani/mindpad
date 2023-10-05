import Footer from '@/components/footer/footer';
import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { Providers } from './provider';
import { Suspense } from 'react';
import { NavigationEvents } from '@/components/navigation-event';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MindPad | Your digital notepad for organizing your thoughts',
  description: `MindPad: Your Ultimate Digital Note-Taking Solution

  Discover the power of MindPad, a versatile digital note-taking platform designed to boost your productivity and streamline your digital life. With MindPad, you can effortlessly organize your thoughts, ideas, and tasks in one centralized space. Our intuitive interface makes it easy to create, edit, and share notes, whether you're a student, professional, or creative thinker.

  Key Features:

  Seamless Organization: Categorize and tag your notes for quick retrieval.
  Collaborative Workspaces: Collaborate with colleagues, classmates, or team members in real-time.
  Cross-Device Sync: Access your notes from anywhere, on any device.
  Intelligent Search: Find what you need instantly with powerful search capabilities.
  Privacy and Security: Your data is safe and secure with our advanced encryption.
  Experience the future of note-taking with MindPad. Try it today and transform the way you capture and manage your ideas. Stay organized, boost productivity, and unlock your full potential with MindPad.`,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mindpad.vercel.app/',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/general-eadd6.appspot.com/o/mindpad%2Flogo.png?alt=media&token=d73db76a-5a83-409e-831e-41058770720c&_gl=1*3apbnx*_ga*MTI0MDY2NDcwMC4xNjk0MzIwMTM5*_ga_CW55HF8NVT*MTY5NjA3NTU2Ni4xMC4xLjE2OTYwNzU2NDIuNjAuMC4w',
        width: 1200,
        height: 630,
        alt: 'MindPad',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>
          <div>{children}</div>
          <Footer />
        </Providers>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
      </body>
    </html>
  );
}
