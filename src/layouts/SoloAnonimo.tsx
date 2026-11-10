import { Navigate, Outlet, useLocation } from 'react-router'
import { Cargando } from '../componentes/Cargando'
import { useAuth } from '../funcionalidades/auth/hooks'
import { rutaDesde } from '../lib/navegacion'

export function SoloAnonimo() {
    const { sesion } = useAuth()
    const location = useLocation()

    if (sesion.estado === 'cargando') return <Cargando />
    if (sesion.estado === 'autenticado') return <Navigate to={rutaDesde(location.state)} replace />
    return <Outlet />
}