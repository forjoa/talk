import { ReactNode } from 'react'
import searchIcon from '@/assets/search.svg'
import logoutIcon from '@/assets/logout.svg'
import Image from 'next/image'
import { getSession, logout } from '@/lib/lib'
import { redirect } from 'next/navigation'
import { getMyChats, searchUser } from '@/lib/getters'
import Link from 'next/link'

let usersSearched: any[] = []

export default async function ChatLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await getSession()

  if (!user) {
    redirect('/login')
  }

  const chats = await getMyChats(user.user_id)

  const searchHandler = async (formData: FormData) => {
    'use server'
    const username = formData.get('username') as string

    usersSearched = await searchUser(username)
  }

  return (
    <div className='flex h-screen w-full flex-col md:flex-row overflow-hidden'>
      <div className='border-r-2 border-white bg-black h-0 md:h-full md:w-72 rounded w-full shadow'>
        <div className='hidden md:flex h-[100px] items-center justify-between border-b-2 border-white px-4'>
          <div className='flex flex-col py-4 gap-2 w-full'>
            <div className='flex w-full justify-between items-center'>
              <div>Welcome, {user.username}</div>
              <form action={logout} className='grid place-items-center'>
                <button type='submit'>
                  <Image
                    src={logoutIcon}
                    alt='Logout icon'
                    className='cursor-pointer'
                  />
                </button>
              </form>
            </div>
            <form
              action={searchHandler}
              className='flex items-center border-2 rounded border-white shadow py-2 px-4'
            >
              <input
                type='text'
                name='username'
                id='username'
                placeholder='Search a user'
                className='bg-transparent outline-none flex-grow'
              />
              <button type='submit'>
                <Image src={searchIcon} alt='Search icon' />
              </button>
            </form>
            {usersSearched.length !== 0 && (
              <div className='absolute top-[98px] left-0 bg-black border-2 z-10 w-full md:w-[287px] shadow rounded-b-xl'>
                {usersSearched.map((user, index) => (
                  <div key={index} className='p-4 border-t-2 border-white'>
                    <p className='hover:underline cursor-pointer'>
                      {user.username}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='h-[calc(100%-100px)] max-h-[calc(100%-100px)] overflow-y-scroll'>
          {chats.length === 0 ? (
            <p className='p-4'>You don&apos;t have any chat yet</p>
          ) : (
            chats.map((chat, index) => (
              <Link
                key={index}
                href={`/chat/${chat.conversation_id}`}
                className='flex p-4 m-2 mr-4 rounded hover:underline border-2 border-white shadow'
              >
                {chat.other_username as string}
              </Link>
            ))
          )}
        </div>
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  )
}
