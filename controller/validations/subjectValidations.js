import { z } from 'zod'

const subject = z.object({

  title: z.string().min(3).max(15),
  color: z.string().min(4)

})

export function verifySubject (object) {
  return subject.partial().safeParse(object)
}
