import { z } from 'zod'

const subject = z.object({

  title: z.string().min(3),
  description: z.string().min(3)

})

export function verifySubject (object) {
  return subject.partial().safeParse(object)
}
