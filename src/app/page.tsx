import { getSession } from '@/lib/lib'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='rounded border-2 p-8 shadow-[5px_5px_0px_0px_rgba(255,255,255)]'>
        <h2 className='text-2xl'>Login to your account</h2>
      </div>
    </main>
  )
}
