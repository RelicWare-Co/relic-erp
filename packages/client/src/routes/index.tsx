import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { client } from "@relic-erp/client/src/rpc";

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
		</div>
	);
}
