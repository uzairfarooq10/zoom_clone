import CallList from '@/components/CallList';
import React from 'react';

const page = () => {
  return (
    <section className='flex flex-col gap-10 text-white  size-full'>
      <h1 className='text-3xl'>Previous Calls</h1>

      <CallList type='ended' />
    </section>
  );
};

export default page;
