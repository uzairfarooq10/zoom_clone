'use client';
import { sidebarLinks } from '@/constant';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className='sticky left-0 top-0 flex  h-screen w-fit flex-col justify-between p-6 pt-28 max-sm:hidden lg:w-[264px] text-white bg-dark-1'>
      <div className='flex flex-1 flex-col space-y-3'>
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              href={link.href}
              key={link.href}
              className={cn(
                'flex items-center gap-x-4 rounded-md p-3 text-sm leading-6 font-semibold bg-dark-1',
                { 'bg-blue-1': isActive }
              )}
            >
              <Image src={link.icon} alt={link.name} width={24} height={24} />
              {link.name}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
