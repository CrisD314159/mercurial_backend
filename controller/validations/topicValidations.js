import { z } from 'zod'

const topic = z.object({

  tittle: z.string().min(3).max(15),
  color: z.string().min(4)

})

export function verifytopic (object) {
  return topic.safeParse(object)
}
