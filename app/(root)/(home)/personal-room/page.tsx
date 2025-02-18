'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react';

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className='flex flex-col items-start gap-2 xl:flex-row'>
    <h1 className='text-base font-medium text-sky-1 lg:text-xl xl:min-w-32'>
      {title}:
    </h1>
    <h1 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl'>
      {description}
    </h1>
  </div>
);
const PersonalRoom = () => {
  const client = useStreamVideoClient();
  const { toast } = useToast();
  const router = useRouter();

  const { user } = useUser();
  const meetingID = user?.id;

  if (!meetingID) return;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingID}?personal=true`;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { call } = useGetCallById(meetingID);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call('default', meetingID);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }
    router.push(`/meeting/${meetingID}?personal=true`);
  };

  return (
    <section className='flex flex-col gap-10 text-white  size-full'>
      <h1 className='text-3xl'>Personal Room</h1>

      <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
        <Table title='Topic' description={`${user?.username}'s meeting Room`} />
        <Table title='Meeting ID' description={`${meetingID!}`} />
        <Table title='Invite Link' description={`${meetingLink}`} />
      </div>

      <div className='flex gap-5'>
        <Button className='bg-blue-1' onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className='bg-dark-1'
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: 'Link Copied',
            });
          }}
        >
          Copy Invitaion
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
