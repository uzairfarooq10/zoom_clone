'use client';
import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { sidebarLinks } from '@/constant';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className='w-full max-w-[264px]'>
      <Sheet key='left'>
        <SheetTrigger asChild>
          <Image
            src='/icons/hamburger.svg'
            alt='humberger'
            width={32}
            height={32}
            className='cursor-pointer sm:hidden'
          />
        </SheetTrigger>
        <SheetContent side='left' className='bg-dark-1 border-none'>
          <Link href='/' className='flex items-center gap-1'>
            <Image
              src='/icons/logo.svg'
              alt='logo'
              width={32}
              height={32}
              className='max-sm:size-10'
            />
            <p className='text-[26px] font-extrabold text-white'>Zoom</p>
          </Link>

          <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
            <SheetClose asChild>
              <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        key={link.href}
                        className={cn(
                          'flex items-center gap-x-4 rounded-md p-3 text-sm leading-6 font-semibold bg-dark-1 w-full max-w-60',
                          { 'bg-blue-1': isActive }
                        )}
                      >
                        <Image
                          src={link.icon}
                          alt={link.name}
                          width={20}
                          height={20}
                        />
                        <p className='font-semibold'>{link.name}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
