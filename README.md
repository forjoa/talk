This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Talk

Minimalist chat aplicaction. Based of getting users by username.

## Database Schema

This project utilizes a SQLite database with three main tables: `users`, `conversations`, and `messages`. Below is an explanation of each table, its structure, and visual diagrams.

### Table: `users`

The `users` table stores information about the users of the application.

| Column       | Type      | Constraints                          |
| ------------ | --------- | ------------------------------------ |
| `user_id`    | INTEGER   | PRIMARY KEY, AUTOINCREMENT, NOT NULL |
| `username`   | TEXT      | UNIQUE, NOT NULL                     |
| `fullname`   | TEXT      | NOT NULL                             |
| `password`   | TEXT      | NOT NULL                             |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP            |

### Table: `conversations`

The `conversations` table stores information about the users in a conversation.

| Column            | Type    | Constraints                           |
| ----------------- | ------- | ------------------------------------- |
| `conversation_id` | INTEGER | PRIMARY KEY, AUTOINCREMENT, NOT NULL  |
| `user1_id`        | INTEGER | FOREIGN KEY REFERENCES users(user_id) |
| `user2_id`        | INTEGER | FOREIGN KEY REFERENCES users(user_id) |

### Table: `messages`

The `messages` table stores information about the messages exchanged in conversations.

| Column            | Type      | Constraints                                           |
| ----------------- | --------- | ----------------------------------------------------- |
| `message_id`      | INTEGER   | PRIMARY KEY, AUTOINCREMENT, NOT NULL                  |
| `conversation_id` | INTEGER   | FOREIGN KEY REFERENCES conversations(conversation_id) |
| `sender_id`       | INTEGER   | FOREIGN KEY REFERENCES users(user_id)                 |
| `content`         | TEXT      |                                                       |
| `timestamp`       | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP                             |
