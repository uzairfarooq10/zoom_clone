'use client ';

import { useUser } from '@clerk/nextjs';
import React from 'react';

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div>
    <h1>{title}:</h1>
    <h1>{description}</h1>
  </div>
);
const PersonalRoom = () => {
  const { user } = useUser();
  return (
    <section className='flex flex-col gap-10 text-white  size-full'>
      <h1 className='text-3xl'>Personal Room</h1>

      <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
        <Table title='Topic' description={`${user?.username}'s Meeting Room`} />
      </div>
    </section>
  );
};

export default PersonalRoom;
