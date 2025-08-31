import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { client } from "@relic-erp/client/src/rpc";
import { authClient } from "@relic-erp/client/util/auth-client";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {

	useEffect(() => {
		client.hello.world().then((res) => {
			console.log(res)
		})
	}, [])
	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
			<button type="button" onClick={() => authClient.signUp.email({
				name: "Verzach3",
				email: "verzach3@emailemail.com",
				password: "",
			})}>Sign Up</button>
		</div>
	);
}
