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
      <div className='relative group grid place-items-center'>
        <label className='relative inline-flex items-center cursor-pointer'>
          <input
            type='checkbox'
            className='sr-only peer'
            checked={isDiscreetMode}
            onChange={toggleDiscreetMode}
          />
          <div className="group peer ring-0 bg-gray-50 border-2 border-gray-900 rounded-full outline-none duration-700 after:duration-200 w-24 h-10 shadow-md peer-checked:bg-gradient-to-r peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:bg-gray-900 after:outline-none after:h-8 after:w-10 after:top-1 after:left-1 peer-checked:after:translate-x-12 peer-hover:after:scale-95">
            <Image
              src={eye}
              alt='eye'
              className='absolute top-1 left-12 w-10 h-8'
            />
            <Image
              src={eyeOff}
              alt='eye off'
              className='absolute top-1 left-1 w-10 h-8'
            />
          </div>
        </label>
        <div className='absolute bottom-full left-1/2 transform -translate-x-[150px] md:translate-y-[100px] translate-y-[140px] mb-2 hidden group-hover:block bg-gray-800 text-white text-sm p-2 rounded'>
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
