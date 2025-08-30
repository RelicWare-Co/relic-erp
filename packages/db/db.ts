import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as authSchema from './auth-schema';
const sqlite = new Database(process.env.DB_FILE_NAME);
const db = drizzle({ client: sqlite, schema: { ...authSchema } });
export default db;