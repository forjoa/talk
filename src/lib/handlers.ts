'use server'
import { redirect } from 'next/navigation'
import { register } from './lib'

export const submitRegister = async (formData: FormData) => {
  await register(formData)
  redirect('/login')
}
