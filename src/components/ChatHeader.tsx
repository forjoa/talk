import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import backIcon from '@/assets/arrow-left.svg'
import Avatar from './Avatar'

interface HeaderProps {
  otherFullname: string
  saving: boolean | undefined
  chatId: number
}

function Header({ otherFullname, saving, chatId }: HeaderProps) {  
  return (
    <div className='flex h-[70px] md:h-[100px] items-center justify-between border-b border-gray-900 px-4'>
      <div className='flex items-center gap-3'>
        <Link href={'/chat'} className='block md:hidden'>
          <Image src={backIcon} alt='Go back icon' />
        </Link>
        <Avatar fullname={otherFullname} />
        <div className='font-medium'>{otherFullname}</div>
      </div>
      <div onClick={() => console.log(chatId)}>
        {saving
          ? 'This conversation is being saved'
          : 'This conversation will be deleted'}
      </div>
    </div>
  )
}

export default Header
