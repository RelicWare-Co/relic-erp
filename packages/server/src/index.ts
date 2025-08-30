import { Hono } from 'hono'
import { cors } from 'hono/cors' 
import { RPCHandler } from '@orpc/server/fetch'
import { usersTable } from '@db/schema.js';
import { router } from './helloRouter.js'
import db from '@db/db.js';

const app = new Hono()
app.use(cors({
  origin: 'http://localhost:5173',
}))

console.log(await db.select().from(usersTable))
app.get('/', async (c) => {
  return c.json({ message: 'Hello, World!' })
})

const handler = new RPCHandler(router)

app.use('/rpc/*', async (c, next) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: '/rpc',
    context: {} // Provide initial context if needed
  })

  if (matched) {
    return c.newResponse(response.body, response)
  }

  await next()
})

export default app