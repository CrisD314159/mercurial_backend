import { z } from 'zod'

const task = z.object({

  tittle: z.string().min(3),
  description: z.string().min(3)

})

export function verifyTask (object) {
  return task.partial().safeParse(object)
}
