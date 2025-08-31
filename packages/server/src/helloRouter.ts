import { os } from '@orpc/server'

export const helloWorld = os.handler(async ({ context }) => {
  console.log(context)
  return 'hello world'
})

export const router = {
  hello: {
    world: helloWorld,
  },
}