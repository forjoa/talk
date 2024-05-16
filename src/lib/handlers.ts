'use server'
import { redirect } from 'next/navigation'
import { login, register } from './lib'

export const submitRegister = async (formData: FormData) => {
  await register(formData)
  redirect('/login')
}

export const submitLogin = async (formData: FormData) => {
  await login(formData)
  redirect('/')
}