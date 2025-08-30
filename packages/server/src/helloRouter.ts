import { os } from '@orpc/server'

export const helloWorld = os.handler(async () => {
  return 'hello world'
})

export const router = {
  hello: {
    world: helloWorld,
  },
}