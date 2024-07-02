import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import backIcon from '@/assets/arrow-left.svg'
import Avatar from './Avatar'
import eye from '@/assets/eye.svg'
import eyeOff from '@/assets/eye-off.svg'

interface HeaderProps {
  otherFullname: string
  saving: boolean | undefined
  chatId: number
}

function Header({ otherFullname, saving, chatId }: HeaderProps) {
  const [isDiscreetMode, setIsDiscreetMode] = useState(!saving)
  const toggleDiscreetMode = () => {
    setIsDiscreetMode((prevState) => !prevState)
  }
  return (
    <div className='flex h-[70px] md:h-[100px] items-center justify-between border-b border-gray-900 px-4'>
      <div className='flex items-center gap-3'>
        <Link href={'/chat'} className='block md:hidden'>
          <Image src={backIcon} alt='Go back icon' />
        </Link>
        <Avatar fullname={otherFullname} />
        <div className='font-medium'>{otherFullname}</div>
      </div>
      <div className='relative group'>
        <button onClick={toggleDiscreetMode} className='relative z-10'>
          {isDiscreetMode ? (
            <Image src={eyeOff} alt='eye off' />
          ) : (
            <Image src={eye} alt='eye' />
          )}
        </button>
        <div className='absolute bottom-full left-1/2 transform -translate-x-[100px] md:translate-y-[100px] translate-y-[140px] mb-2 hidden group-hover:block bg-gray-800 text-white text-sm p-2 rounded'>
          {isDiscreetMode
            ? 'Discreet mode activated. Messages will not be stored.'
            : 'Activate discreet mode to stop storing messages.'}
          <div className='absolute top-full transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-800'></div>
        </div>
      </div>
    </div>
  )
}

export default Header
