import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { usersTable } from './schema';
const sqlite = new Database(process.env.DB_FILE_NAME ?? ':memory:');
const db = drizzle({ client: sqlite, schema: { usersTable } });
export default db;