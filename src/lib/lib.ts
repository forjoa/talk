'use server'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { db } from './db'
import { hash, compare } from 'bcrypt'
import { redirect } from 'next/navigation'

const secretKey = 'secret'
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 week')
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return payload
}

export async function login(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  const { rows } = await db.execute({
    sql: 'SELECT * FROM users WHERE username = ?',
    args: [username],
  })

  if (rows?.length !== 1) {
    return { success: false, message: 'Username is not registered' }
  }

  if (!(await compare(password as string, rows[0].password as string))) {
    return { success: false, message: 'Wrong password' }
  }

  // create session
  const session = await encrypt(rows[0])

  // save session in a cookie
  cookies().set('session', session)

  return { success: true }
}

export async function register(formData: FormData) {
  const username = formData.get('username') as string
  const fullname = formData.get('fullname') as string
  const password = await hashPasswords(formData.get('password') as string)

  const { rows } = await db.execute({
    sql: 'SELECT * FROM users WHERE username = ?',
    args: [username],
  })

  if (rows.length > 0)
    return { success: false, message: 'Username already exists' }

  await db.execute({
    sql: 'INSERT INTO users (username, fullname, password) VALUES (?,?,?)',
    args: [username, fullname, password],
  })

  return { success: true }
}

export async function getSession() {
  const session = cookies().get('session')?.value
  if (!session) return null
  return await decrypt(session)
}

export async function hashPasswords(password: string): Promise<string> {
  return await hash(password, 10)
}

export async function logout() {
  // destroy the session
  cookies().delete('session')
  redirect('/login')
}

export async function insertMessage(formData: any) {
  const { conversationId, senderId, content } = formData

  await db.execute({
    sql: 'INSERT INTO messages (conversation_id, sender_id, content) VALUES (?,?,?)',
    args: [conversationId, senderId, content],
  })
}

export async function updateUser(formData: FormData) {
  const username = formData.get('username') as string
  const fullname = formData.get('fullname') as string
  const userId = formData.get('user_id') as string

  const { rows } = await db.execute({
    sql: 'SELECT * FROM users WHERE username = ?',
    args: [username],
  })

  if (rows.length > 0) return { success: false, message: 'Username already exists' }

  const { rowsAffected } = await db.execute({
    sql: 'UPDATE users SET username = ?, fullname = ? WHERE user_id = ?',
    args: [username, fullname, userId],
  })

  if (rowsAffected === 0) return { success: false, message: 'Failed to update user' }
  
  return { success: true, message: 'User updated successfully' }
}
