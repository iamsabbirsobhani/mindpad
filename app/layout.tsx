import Footer from '@/components/footer/footer';
import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { Providers } from './provider';

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
      </body>
    </html>
  );
}
