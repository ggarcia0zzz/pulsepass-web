import type { UsuarioAutenticado } from '../funcionalidades/auth/tipos'
import { ApiError, esperar } from './cliente'
import { CUENTAS_FALSAS } from './datosFalsos'

export interface RespuestaLogin {
    token: string
    expiraEn: number
    usuario: UsuarioAutenticado
}

// TODO(backend): reemplazar por POST /api/auth/login cuando exista el endpoint.
export async function iniciarSesionApi(email: string, password: string): Promise<RespuestaLogin> {
    await esperar()
    const cuenta = CUENTAS_FALSAS.find(
        (c) => c.usuario.email.toLowerCase() === email.trim().toLowerCase() && c.password === password,
    )
    if (!cuenta) throw new ApiError('Correo o contraseña incorrectos', 401)
    return {
        token: `token-falso-${cuenta.usuario.id}`,
        expiraEn: Date.now() + 15 * 60_000,
        usuario: cuenta.usuario,
    }
}
