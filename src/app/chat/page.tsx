import { getSession } from '@/lib/lib'
import { redirect } from 'next/navigation'
import { getMyChats } from '@/lib/getters'
import NavHeader from '@/components/NavHeader'
import NavList from '@/components/NavList'

export default async function Chat() {
  const user = await getSession()

  if (!user) {
    redirect('/login')
  }

  const chats = await getMyChats(user.user_id)

  return (
    <>
      <div className='hidden md:flex h-full flex-col items-center justify-center'>
        <p className='text-xl'>
          Welcome to Talk your new favorite Next.js chat application
        </p>
      </div>
      <div className='bg-black md:h-0 h-full md:w-72 w-full'>
        <NavHeader username={user.username} userId={user.user_id} />
        <NavList chats={chats} />
      </div>
    </>
  )
}
