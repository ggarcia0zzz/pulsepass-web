import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { RUTAS } from '../../lib/rutas'
import { AuthContext } from './contexto'
import type { AuthContextValor } from './contexto'

export function useAuth(): AuthContextValor {
    const valor = useContext(AuthContext)
    if (!valor) throw new Error('useAuth debe usarse dentro de AuthProvider')
    return valor
}

export function useSalir(): () => void {
    const { cerrarSesion } = useAuth()
    const navigate = useNavigate()
    return () => {
        cerrarSesion()
        navigate(RUTAS.inicio)
    }
}