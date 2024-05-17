import { db } from './db'

export async function getMyChats(id: number) {
  const { rows } = await db.execute({
    sql: 'SELECT c.conversation_id, u1.user_id AS user1_id, u1.username AS user1_username, u1.fullname AS user1_fullname, u2.user_id AS user2_id, u2.username AS user2_username, u2.fullname AS user2_fullname FROM  conversations c JOIN  users u1 ON c.user1_id = u1.user_id JOIN  users u2 ON c.user2_id = u2.user_id WHERE  c.user1_id = ? OR c.user2_id = ?;',
    args: [id, id],
  })

  return rows
}

export async function searchUser(username: string) {

    const { rows } = await db.execute({
        sql: 'SELECT * FROM users WHERE LOWER(username) LIKE LOWER(?)',
        args: [`%${username}%`]
    });

    return rows
}

