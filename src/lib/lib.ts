import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { db } from './db'
import { hash, compare } from 'bcrypt'

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
  console.log(rows)

  if (rows?.length !== 1) {
    return { message: 'Email is not registered' }
  }

  if (!(await compare(password as string, rows[0].password as string))) {
    return { message: 'Wrong password' }
  }

  // create session
  const session = await encrypt(rows[0])

  // save session in a cookie
  cookies().set('session', session)
}

export async function register(formData: FormData) {
  const username = formData.get('username') as string
  const fullname = formData.get('fullname') as string
  const password = await hashPasswords(formData.get('password') as string)

  await db.execute({
    sql: 'INSERT INTO users (username, fullname, password) VALUES (?,?,?)',
    args: [username, fullname, password],
  })
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
  cookies().set('session', '', { expires: new Date(0) })
}
