import { getSession } from '@/lib/lib'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  } else {
    redirect('/chat')
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='rounded border border-gray-900 p-8 shadow'>
        <h2 className='text-2xl'>Go to my chats</h2>
        <Link href={'/chat'} className='text-blue-500 underline'>
          My chats
        </Link>
      </div>
    </main>
  )
}
