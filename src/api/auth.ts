import { z } from "zod";
import { http } from "./cliente";
import { UsuarioAutenticadoSchema } from "../funcionalidades/auth/tipos";
export const me = (token?: string) =>
  http("/api/auth/me", UsuarioAutenticadoSchema, {}, token);
export async function iniciarSesionApi(identifier: string, password: string) {
  const r = await http(
    "/api/auth/login",
    z.object({ accessToken: z.string(), expiresIn: z.number() }),
    { method: "POST", body: JSON.stringify({ identifier, password }) },
    "",
  );
  return {
    token: r.accessToken,
    expiraEn: Date.now() + r.expiresIn * 1000,
    usuario: await me(r.accessToken),
  };
}
export const registrar = (data: unknown) =>
  http(
    "/api/users",
    UsuarioAutenticadoSchema,
    { method: "POST", body: JSON.stringify(data) },
    "",
  );
export const usuarioPorEmail = (email: string) =>
  http(
    "/api/users/by-email?email=" + encodeURIComponent(email),
    UsuarioAutenticadoSchema,
  );
export const usuarioPorNombre = (name: string) =>
  http(
    "/api/users/by-username?username=" + encodeURIComponent(name),
    UsuarioAutenticadoSchema,
  );
