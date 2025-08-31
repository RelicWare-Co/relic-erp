import { createAuthClient } from "better-auth/client"
import { adminClient } from "better-auth/client/plugins"
import { organizationClient } from "better-auth/client/plugins"
 
export const authClient = createAuthClient({
    fetchOptions: {
        credentials: "include",
    },
    baseURL: "http://localhost:3000",
    plugins: [
        adminClient(),
        organizationClient(),
    ]
})