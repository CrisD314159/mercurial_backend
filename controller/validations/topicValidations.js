import { z } from 'zod'

const topic = z.object({

  tittle: z.string().min(3),
  color: z.string().min(3).optional()

})

export function verifytopic (object) {
  return topic.safeParse(object)
}
