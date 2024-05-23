import { submitRegister } from '@/lib/handlers'
import { getSession } from '@/lib/lib'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Register() {
  const session = await getSession()

  if (session) {
    redirect('/chat')
  }
  return (
    <main className='flex h-screen w-screen items-center justify-between'>
      <div className='rounded border border-gray-900 p-8 w-4/5 block m-auto'>
        <h2 className='text-2xl'>Register</h2>
        <p className='text-gray-400 my-4'>
          Thank you so much since you trust us!
        </p>
        <form className='h-auto' action={submitRegister}>
          <label htmlFor='fullname' className='mt-8'>
            Full name
          </label>
          <input
            type='text'
            name='fullname'
            id='fullname'
            placeholder='Fullname'
            required
            className='w-full rounded border border-gray-900 bg-transparent p-4 my-2 outline-2 outline-white'
          />
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
            value='Sign up'
            className='w-full rounded border bg-white text-black p-4 my-2 cursor-pointer'
          />
        </form>
        <div className='w-full flex flex-col items-end mt-4'>
          <p>Already have an account?</p>
          <Link href={'/login'} className='text-blue-500 underline'>
            Log in
          </Link>
        </div>
      </div>
    </main>
  )
}
