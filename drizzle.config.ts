import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './packages/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.BUN_ENV === "PRODUCTION" ? process.env.DB_FILE_NAME as string : `./packages/server/${process.env.DB_FILE_NAME ?? 'sqlite.db'}`,
  },
});
