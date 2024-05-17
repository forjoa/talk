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
    <div className='grid h-screen w-full grid-cols-[300px_1fr] overflow-hidden'>
      <div className='border-r border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-950 h-screen'>
        <div className='flex h-[100px] items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800'>
          <div className='flex flex-col py-4 gap-2'>
            <div className='flex w-full justify-between items-center'>
              <div className=''>Welcome, {user.username}</div>
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
              className='flex items-center border rounded border-gray-800 py-2 px-4'
            >
              <input
                type='text'
                name='username'
                id='username'
                placeholder='Search a user'
                className='bg-transparent outline-none'
              />
              <button type='submit'>
                <Image src={searchIcon} alt='Search icon' />
              </button>
            </form>
            {usersSearched.length !== 0 && (
              <div className='absolute top-[100px] left-0 bg-gray-800 z-10 w-[300px] rounded-b-xl'>
                {usersSearched.map((user, index) => (
                  <div key={index} className='p-4 border-t border-gray-700'>
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
                className='flex w-full p-4 hover:underline border-b border-gray-800'
              >
                {chat.other_username as string}
              </Link>
            ))
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
