import { db } from './db'
import { hash } from 'bcrypt'

export async function register(formData: FormData) {
  const username = formData.get('username') as string
  const fullname = formData.get('fullname') as string
  const password = await hashPasswords(formData.get('password') as string)

  const { rowsAffected } = await db.execute({
    sql: 'INSERT INTO users (username, fullname, password) VALUES (?,?,?)',
    args: [username, fullname, password],
  })

  return rowsAffected === 1 ? true : false
}

export async function hashPasswords(password: string): Promise<string> {
  return await hash(password, 10)
}
