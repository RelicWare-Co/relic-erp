import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins"
import { admin } from "better-auth/plugins"
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import db from "@db/db.js"
export const auth = betterAuth({
    trustedOrigins: ["http://localhost:5173"],
    emailAndPassword: {
        enabled: true,
    },
    database: drizzleAdapter(db, {
        provider: "sqlite",
    }),
    plugins: [
        organization(),
        admin(),
    ],
});