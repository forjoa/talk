import { ReactNode } from 'react'
import { getSession } from '@/lib/lib'
import { redirect } from 'next/navigation'
import { getMyChats } from '@/lib/getters'
import NavHeader from '@/components/NavHeader'
import NavList from '@/components/NavList'

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
      <div className='border border-gray-900 bg-black hidden md:block md:w-72 md:ml-4 md:my-4 md:h-[calc(100vh-2rem)] rounded w-full'>
        <NavHeader username={user.username} userId={user.user_id} />
        <NavList chats={chats} />
      </div>
      <div className='flex-1 h-[calc(100vh-2rem)] md:my-4'>{children}</div>
    </div>
  )
}
