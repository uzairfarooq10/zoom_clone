'use client';

import { useState } from 'react';
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';

import ReactDatePicker from 'react-datepicker';

import { Input } from '@/components/ui/input';

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    'isJoiningMeeting' | 'isScheduleMeeting' | 'isInstantMeeting' | undefined
  >();
  const cardObject = [
    {
      title: 'New Meeting',
      description: 'Start an instant meeting',
      icon: '/icons/add-meeting.svg',
      action: () => setMeetingState('isInstantMeeting'),
      bgColor: 'bg-orange-1',
    },
    {
      title: 'Schedule Meeting',
      description: 'Plan your meeting',
      icon: '/icons/schedule.svg',
      action: () => setMeetingState('isScheduleMeeting'),
      bgColor: 'bg-blue-1',
    },
    {
      title: 'View Recordings',
      description: 'Check out your recordings',
      icon: '/icons/recordings.svg',
      action: () => router.push('/recordings'),
      bgColor: 'bg-purple-1',
    },
    {
      title: 'Join Meeting',
      description: 'Via invitation link',
      icon: '/icons/join-meeting.svg',
      action: () => setMeetingState('isJoiningMeeting'),
      // action: () => router.push(values.link),
      bgColor: 'bg-yellow-1',
    },
  ];

  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });

  console.log('asdbasdsad - asdas d', values);

  const [callDetails, setCallDetails] = useState<Call>();
  const createMeeting = async () => {
    if (!user || !client) return;

    try {
      const id = crypto.randomUUID();

      const call = client.call('default', id);

      if (!call) throw new Error('Failed to create call');

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${id}`);
        toast({
          title: 'Meeting created!',
        });
      }
      setValues({
        ...values,
        link: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${id}`,
      });
    } catch (error) {
      toast({
        title: "Meeting Couldn't be created",
        description: 'Please try again',
      });

      console.log('sadasd', error);
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      {cardObject.map((card) => (
        <HomeCard
          key={card.title}
          title={card.title}
          description={card.description}
          icon={card.icon}
          action={card.action}
          bgColor={card.bgColor}
        />
      ))}

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          className='text-center'
          title='Create Meeting'
          // buttonText='Start Meeting'
          action={createMeeting}
        >
          <div className='flex flex-col gap-2.5'>
            <label className='text-base text-normal leading-[22px] text-sky-2'>
              Add a description
            </label>
            <Textarea
              className='border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0'
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className='flex w-full flex-col gap-2.5'>
            <label className='text-base text-normal leading-[22px] text-sky-2'>
              Select Data and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(e) => setValues({ ...values, dateTime: e! })}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              timeCaption='time'
              dateFormat={'MMMM d, yyyy h:mm aa'}
              className='w-full rounded bg-dark-2 p-2 focus:outline-none'
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          action={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Meeting Link Copied!' });
          }}
          className='text-center'
          title='Meeting Created!'
          buttonText='Copy Meeting Link'
          buttonIcon='/icons/copy.svg'
          image='/icons/checked.svg'
          // action={createMeeting}
        />
      )}

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        className='text-center'
        title='Create Instant Meeting'
        buttonText='Start Meeting'
        action={createMeeting}
      />

      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        className='text-center'
        title='Join the Meeting'
        buttonText='Join Meeting'
        action={() => router.push(values.link)}
      >
        <Input
          placeholder='Meeting Link'
          className='border-none bg-dark-2 focus-visible:right-0 focus-visible:ring-offset-0'
          onClick={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
