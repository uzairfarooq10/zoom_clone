'use client';

import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface MeetingSetupProps {
  setIsSetupComplete: (value: boolean) => void;
}
const MeetingSetup = ({ setIsSetupComplete }: MeetingSetupProps) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

  const call = useCall();

  if (!call)
    throw new Error('useCall must be used inside a StreamCall component.');

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);
  return (
    <div className='flex flex-col w-full items-center justify-center gap-3 text-white'>
      <h1 className='text-2xl font-bold'>Setup</h1>
      <VideoPreview />
      <div className='flex h-16 items-center justify-center gap-3'>
        <label className='flex items-center justify-center gap-2 font-medium'>
          <input
            type='checkbox'
            checked={isMicCamToggledOn}
            onChange={(e) => {
              setIsMicCamToggledOn(e.target.checked);
              if (e.target.checked) {
                call?.camera.disable();
                call?.microphone.disable();
              }
            }}
          />
          Join with mic and camera off.
        </label>
        <DeviceSettings />
      </div>
      <Button
        onClick={() => {
          call?.join();
          setIsSetupComplete(true);
        }}
        className='rounded-md bg-green-500 px-4 py-2.5'
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
