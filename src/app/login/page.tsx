import { submitLogin } from '@/lib/handlers'
import { getSession } from '@/lib/lib'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Login() {
  const session = await getSession()

  if (session) {
    redirect('/chat')
  }
  return (
    <main className='flex h-screen w-screen items-center justify-between'>
      <div className='rounded border border-gray-900 p-8 w-4/5 block m-auto '>
        <h2 className='text-2xl'>Login</h2>
        <p className='text-gray-400 my-4'>You are welcome again!</p>
        <form className='h-auto' action={submitLogin}>
          <label htmlFor='username' className='mt-8'>
            Username
          </label>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='Username'
            required
            className='w-full rounded border border-gray-900 bg-transparent p-4 my-2 outline-2 outline-white'
          />
          <label htmlFor='password' className='mt-8'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            required
            className='w-full rounded border border-gray-900 bg-transparent p-4 my-2 outline-2 outline-white'
          />
          <input
            type='submit'
            value='Sign in'
            className='w-full rounded border border-gray-900 bg-white text-black p-4 my-2 cursor-pointer'
          />
        </form>
        <div className='w-full flex flex-col items-end mt-4'>
          <p>No account?</p>
          <Link href={'/signup'} className='text-blue-500 underline'>
            Create one
          </Link>
        </div>
      </div>
    </main>
  )
}
