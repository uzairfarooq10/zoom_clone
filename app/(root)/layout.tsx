import StreamVideoProvider from '@/providers/StreamClientProvider';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Zoom Clone',
  description: 'Video Calling App',
  icons: {
    icon: '/icons/logo.svg',
  },
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default MainLayout;
