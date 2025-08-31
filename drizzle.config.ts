import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: ['./packages/db/auth-schema.ts', './packages/db/schema.ts'],
  dialect: 'sqlite',
  dbCredentials: {
    url: `./packages/server/${process.env.DB_FILE_NAME ?? 'sqlite.db'}`,
  },
});
