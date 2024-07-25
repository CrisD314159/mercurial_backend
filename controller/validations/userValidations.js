import { z } from 'zod'

const user = z.object({ // objeto de tipo zod
  name: z.string().min(3),
  email: z.string().email(),
  username: z.string().min(5).max(30),
  password: z.string().min(8).max(16).optional(),
  image: z.string().url().optional()

})

// Verifica que el objeto cumpla en su TOTALIDAD con las reglas establecidas en el objeto verifyUser
export function verifyUser (object) {
  return user.safeParse(object)
}

// verifica que el objeto cumpla PARCIALMENTE con las reglas establecidas en el objeto verifyUser
// Es decir, puede faltar por ejemplo email, pero si cumple con las demas reglas, se considera valido
export function verifyUserPartial (object) {
  return user.partial().safeParse(object)
}
