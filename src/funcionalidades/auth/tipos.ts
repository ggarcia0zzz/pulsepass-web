import { z } from 'zod'

export const RolSchema = z.enum(['USER', 'STAFF', 'ADMIN'])
export type Rol = z.infer<typeof RolSchema>

export const UsuarioAutenticadoSchema = z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    roles: z.array(RolSchema),
})
export type UsuarioAutenticado = z.infer<typeof UsuarioAutenticadoSchema>

export type Sesion =
    | { estado: 'cargando' }
    | { estado: 'anonimo' }
    | { estado: 'autenticado'; token: string; expiraEn: number; usuario: UsuarioAutenticado }