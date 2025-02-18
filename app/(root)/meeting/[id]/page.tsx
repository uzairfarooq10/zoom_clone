'use client';

import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { use, useState } from 'react';

const Meeting = ({ params }: { params: Promise<{ id: string }> }) => {
  // Unwrap the Promise using React.use()
  const { id } = use(params);

  const { isLoaded } = useUser();

  console.log(id);
  const { call, isCallLoading } = useGetCallById(id);

  const [isSetupComplete, setIsSetupComplete] = useState(false);

  console.log(isLoaded, call, isCallLoading);
  if (!isLoaded || isCallLoading) return <Loader />;

  if (!call)
    return <p className='text-white'>Call not found or unavailable.</p>;

  return (
    <main className='h-screen w-full text-white'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
