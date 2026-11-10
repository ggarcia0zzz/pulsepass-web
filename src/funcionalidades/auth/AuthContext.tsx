import { useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './contexto'
import { rolEfectivo } from './roles'
import type { Rol, Sesion } from './tipos'

interface AuthProviderProps {
    children: ReactNode
    sesionInicial?: Sesion
}

export function AuthProvider({ children, sesionInicial = { estado: 'anonimo' } }: AuthProviderProps) {
    const [sesion, setSesion] = useState<Sesion>(sesionInicial)

    const cerrarSesion = () => setSesion({ estado: 'anonimo' })

    const tieneRol = (...roles: Rol[]) =>
        sesion.estado === 'autenticado' && roles.includes(rolEfectivo(sesion.usuario.roles))

    return <AuthContext value={{ sesion, cerrarSesion, tieneRol }}>{children}</AuthContext>
}