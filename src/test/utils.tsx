import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { createMemoryRouter } from 'react-router'
import type { RouteObject } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { AuthProvider } from '../funcionalidades/auth/AuthContext'
import type { Sesion } from '../funcionalidades/auth/tipos'

interface Opciones {
    sesion?: Sesion
    ruta?: string
}

export function renderConRutas(rutas: RouteObject[], { sesion, ruta = '/' }: Opciones = {}) {
    const router = createMemoryRouter(rutas, { initialEntries: [ruta] })
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
    })
    return render(
        <QueryClientProvider client={queryClient}>
            <AuthProvider sesionInicial={sesion}>
                <RouterProvider router={router} />
            </AuthProvider>
        </QueryClientProvider>,
    )
}

export function renderConProveedores(ui: ReactElement, opciones: Opciones = {}) {
    return renderConRutas([{ path: '*', element: ui }], opciones)
}