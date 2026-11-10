import { createContext } from 'react'
import type { Rol, Sesion } from './tipos'

export interface AuthContextValor {
    sesion: Sesion
    cerrarSesion: () => void
    tieneRol: (...roles: Rol[]) => boolean
}

export const AuthContext = createContext<AuthContextValor | null>(null)