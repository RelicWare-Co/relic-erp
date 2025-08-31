import { Hono } from 'hono'
import { cors } from 'hono/cors' 
import { logger } from 'hono/logger'
import { RPCHandler } from '@orpc/server/fetch'
import { router } from './helloRouter.js'
import { auth } from './util/auth.js';
import db from '@db/db.js'

const app = new Hono<{
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null
	}
}>
app.use(
	"*",
	cors({
		origin: ["http://localhost:5173", "http://localhost:3000"],
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

app.use(logger())

app.use("*", async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
  console.log(session)
  	if (!session) {
    	c.set("user", null);
    	c.set("session", null);
    	return next();
  	}
 
  	c.set("user", session.user);
  	c.set("session", session.session);
  	return next();
});

app.on(["POST", "GET"], "/api/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

app.get('/', async (c) => {
  return c.json({ message: 'Hello, World!' })
})

const handler = new RPCHandler(router)

app.use('/rpc/*', async (c, next) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: '/rpc',
    context: {
      user: c.get("user"),
      session: c.get("session"),
    }
  })

  if (matched) {
    return c.newResponse(response.body, response)
  }

  await next()
})

export default app