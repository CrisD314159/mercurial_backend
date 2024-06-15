import { z } from 'zod'

const topic = z.object({

  tittle: z.string().min(3)

})

export function verifyTopic (object) {
  return topic.partial().safeParse(object)
}
