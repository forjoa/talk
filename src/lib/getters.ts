import { db } from './db'

export async function getMyChats(id: number) {
  const { rows } = await db.execute({
    sql: 'SELECT c.conversation_id, CASE WHEN u1.user_id = ? THEN u2.user_id ELSE u1.user_id END AS other_user_id, CASE WHEN u1.user_id = ? THEN u2.username ELSE u1.username END AS other_username, CASE WHEN u1.user_id = ? THEN u2.fullname ELSE u1.fullname END AS other_fullname FROM conversations c JOIN users u1 ON c.user1_id = u1.user_id JOIN users u2 ON c.user2_id = u2.user_id WHERE c.user1_id = ? OR c.user2_id = ?;',
    args: [id, id, id, id, id],
  })

  return rows
}

export async function searchUser(username: string) {
  const { rows } = await db.execute({
    sql: 'SELECT * FROM users WHERE LOWER(username) LIKE LOWER(?)',
    args: [`%${username}%`],
  })

  return rows
}

export async function getConversation(conversation_id: number) {
  const { rows } = await db.execute({
    sql: `
    SELECT 
        m.message_id,
        m.conversation_id,
        m.sender_id,
        u.username AS sender_username,
        u.fullname AS sender_fullname,
        m.content,
        m.timestamp
    FROM 
        messages m
    JOIN 
        users u ON m.sender_id = u.user_id
    WHERE 
        m.conversation_id = ?
    ORDER BY 
        m.timestamp ASC;
`,
    args: [conversation_id],
  })

  return rows
}

export async function knowIfSaving(conversation_id: number) {
  const { rows } = await db.execute({
    sql: `SELECT save FROM conversations where conversation_id = ?;`,
    args: [conversation_id],
  })

  return rows[0]
}

export async function getOtherUser(
  conversation_id: number,
  current_user_id: number
) {
  const { rows } = await db.execute({
    sql: `
    SELECT 
        CASE 
            WHEN c.user1_id = ? THEN u2.user_id
            ELSE u1.user_id 
        END AS other_user_id,
        CASE 
            WHEN c.user1_id = ? THEN u2.username
            ELSE u1.username 
        END AS other_username,
        CASE 
            WHEN c.user1_id = ? THEN u2.fullname
            ELSE u1.fullname 
        END AS other_fullname
    FROM 
        conversations c
    JOIN 
        users u1 ON c.user1_id = u1.user_id
    JOIN 
        users u2 ON c.user2_id = u2.user_id
    WHERE 
        c.conversation_id = ?;
`,
    args: [current_user_id, current_user_id, current_user_id, conversation_id],
  })

  return rows[0]
}

export async function getAllUsers(user_id: number) {
  try {
    const { rows } = await db.execute({
      sql: 'SELECT * FROM users WHERE user_id != ?',
      args: [user_id],
    })
    return rows
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export async function knowConversationExists(
  user1: number,
  user2: number
): Promise<{ exists: boolean; conversationId: number }> {
  const { rows } = await db.execute({
    sql: 'SELECT conversation_id FROM conversations WHERE user1_id = ? AND user2_id = ? OR user2_id = ? AND user1_id = ?',
    args: [user1, user2, user1, user2],
  })

  if (rows.length > 0)
    return { exists: true, conversationId: rows[0].conversation_id as number }

  const { lastInsertRowid } = await db.execute({
    sql: 'INSERT INTO conversations (user1_id, user2_id) VALUES (?,?)',
    args: [user1, user2],
  })

  return { exists: true, conversationId: lastInsertRowid as unknown as number }
}
