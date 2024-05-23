'use client'
import { useState, useEffect, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import goBack from '@/assets/arrow-left.svg'
import { getSession, updateUser } from '@/lib/lib'
import { Toaster, toast } from 'sonner'

export default function MyProfile() {
  const [user, setUser] = useState()
  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [createdAt, setCreatedAt] = useState('')

  useEffect(() => {
    async function fetchUser() {
      const session = await getSession()
      setUser(session.user_id)
      setUsername(session.username)
      setFullname(session.fullname)
      setCreatedAt(session.created_at)
    }
    fetchUser()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('user_id', user as unknown as string)
    formData.append('fullname', fullname)
    formData.append('username', username)

    const result = await updateUser(formData)

    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <>
      <Toaster />
      <div className='w-full h-screen grid items-center'>
        <form
          onSubmit={handleSubmit}
          className='block rounded-lg border border-gray-900 bg-card text-card-foreground w-full max-w-md m-auto'
        >
          <div className='flex flex-col space-y-1.5 p-6'>
            <h3 className='whitespace-nowrap text-2xl font-semibold leading-none tracking-tight flex flex-col gap-1'>
              <Link href={'/chat'} className='transition-all hover:pl-2'>
                <Image src={goBack} alt='Go back icon' />
              </Link>
              Edit User Information
            </h3>
            <p className='text-gray-500'>Update your profile details.</p>
          </div>
          <div className='px-6 space-y-4'>
            <div className='space-y-2'>
              <label
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                htmlFor='username'
              >
                Username
              </label>
              <input
                className='w-full rounded border border-gray-900 bg-transparent p-4 my-2 outline-2 outline-white'
                id='username'
                required
                title='Username must be 3-20 characters long and can only contain letters, numbers, underscores, and hyphens.'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <label
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                htmlFor='fullname'
              >
                Full Name
              </label>
              <input
                className='w-full rounded border border-gray-900 bg-transparent p-4 my-2 outline-2 outline-white'
                id='fullname'
                required
                type='text'
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <label
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                htmlFor='created-at'
              >
                Created At
              </label>
              <input
                className='w-full rounded border border-gray-900 bg-transparent p-4 my-2 outline-2 outline-white disabled:bg-gray-900'
                id='created-at'
                disabled
                type='text'
                value={createdAt}
              />
            </div>
          </div>
          <div className='flex justify-end items-center p-6'>
            <button
              type='submit'
              className='rounded border bg-white text-black p-4 my-2 cursor-pointer'
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
