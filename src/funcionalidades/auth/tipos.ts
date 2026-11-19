import { z } from "zod";

export const RolSchema = z.enum(["USER", "STAFF", "ADMIN"]);
export type Rol = z.infer<typeof RolSchema>;

export const UsuarioAutenticadoSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  firstName: z
    .string()
    .nullable()
    .transform((v) => v ?? ""),
  lastName: z
    .string()
    .nullable()
    .transform((v) => v ?? ""),
  phone: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  birthDate: z.string().nullable().optional(),
  roles: z.array(RolSchema),
});
export type UsuarioAutenticado = z.infer<typeof UsuarioAutenticadoSchema>;

export type Sesion =
  | { estado: "cargando" }
  | { estado: "anonimo" }
  | {
      estado: "autenticado";
      token: string;
      expiraEn: number;
      usuario: UsuarioAutenticado;
    };
