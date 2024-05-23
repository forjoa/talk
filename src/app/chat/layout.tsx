import { ReactNode } from 'react'
import logoutIcon from '@/assets/logout.svg'
import Image from 'next/image'
import { getSession, logout } from '@/lib/lib'
import { redirect } from 'next/navigation'
import { getMyChats } from '@/lib/getters'
import Link from 'next/link'
import SearchUser from '@/components/SearchUser'

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

  return (
    <div className='flex h-screen w-full flex-col md:flex-row overflow-hidden'>
      <div className='border-2 border-white bg-black h-0 md:w-72 md:ml-4 md:my-4 md:h-[calc(100vh-2rem)] rounded w-full'>
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
            <SearchUser currentUserID={user.user_id}/>
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
      <div className='flex-1 h-[calc(100vh-2rem)] my-4'>{children}</div>
    </div>
  )
}
