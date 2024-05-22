import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import backIcon from '@/assets/arrow-left.svg';
import Avatar from './Avatar';

function Header({ otherFullname } : { otherFullname : string }) {
  return (
    <div className='flex h-[70px] md:h-[100px] items-center justify-between border-b border-white px-4'>
      <div className='flex items-center gap-3'>
        <Link href={'/chat'} className='block md:hidden'>
          <Image src={backIcon} alt='Go back icon' />
        </Link>
        <Avatar fullname={otherFullname} />
        <div className='font-medium'>{otherFullname}</div>
      </div>
    </div>
  );
}

export default Header;
