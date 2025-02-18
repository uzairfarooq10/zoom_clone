import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

import { Toaster } from '@/components/ui/toaster';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Zoom Clone',
  description: 'Video Calling App',
  icons: {
    icon: '/icons/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <ClerkProvider
      // appearance={{
      //   layout: {
      //     logoImageUrl: '/icons/yoom-logo.svg',
      //     socialButtonsVariant: 'iconButton',
      //   },
      //   variables: {
      //     colorText: '#fff',
      //     colorPrimary: '#0e78f9',
      //     colorBackground: '#1c1e2f',
      //     colorInputText: '#fff',
      //     colorInputBackground: '#252a41',
      //   },
      // }}
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark-2`}
        >
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
