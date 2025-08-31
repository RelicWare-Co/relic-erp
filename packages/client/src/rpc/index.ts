import { createORPCClient, onError } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import type { router } from "@relic-erp/server/src/helloRouter";
import { authClient } from "@relic-erp/client/util/auth-client";

const link = new RPCLink({
	url: "http://localhost:3000/rpc",
	fetch: (request, init) => {
		return globalThis.fetch(request, {
			...init,
			credentials: "include", // Include cookies for cross-origin requests
		});
	},
	// fetch: <-- provide fetch polyfill fetch if needed
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

// Create a client for your router
export const client: RouterClient<typeof router> = createORPCClient(link);
