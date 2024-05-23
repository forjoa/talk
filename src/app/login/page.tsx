'use client'
import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getSession, login } from '@/lib/lib'
import { Toaster, toast } from 'sonner'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  // Chequear sesión al montar el componente
  useEffect(() => {
    async function checkSession() {
      const session = await getSession()
      if (session) {
        router.push('/chat')
      }
    }
    checkSession()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (event : FormEvent) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    const response = await login(formData)
    if (response?.success) {
      router.push('/chat')
    } else {
      toast.error(response?.message)
    }
  }

  return (
    <main className='flex h-screen w-screen items-center justify-between'>
      <Toaster />
      <div className='rounded border border-gray-900 p-8 w-4/5 block m-auto'>
        <h2 className='text-2xl'>Login</h2>
        <p className='text-gray-400 my-4'>You are welcome again!</p>
        <form className='h-auto' onSubmit={handleSubmit}>
          <label htmlFor='username' className='mt-8'>
            Username
          </label>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='Username'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
