import { createClient } from "@libsql/client";

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL ?? 'libsql://talk-forjoa.turso.io',
  authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN as string,
});

