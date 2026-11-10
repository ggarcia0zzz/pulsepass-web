import type { ComponentType } from 'react'
import { createBrowserRouter } from 'react-router'
import { Layout } from './layouts/Layout'
import { RutaPorRol } from './layouts/RutaPorRol'
import { RutaProtegida } from './layouts/RutaProtegida'
import { SoloAnonimo } from './layouts/SoloAnonimo'
import ErrorPagina from './pages/ErrorPagina'
import Inicio from './pages/Inicio'

type Importador = () => Promise<{ default: ComponentType }>
const perezosa = (importar: Importador) => async () => ({
    Component: (await importar()).default,
})

// Los paths relativos de este archivo son la única declaración de patrones; el resto de la app usa RUTAS.
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPagina />,
        children: [
            { index: true, element: <Inicio /> },
            { path: 'eventos', lazy: perezosa(() => import('./pages/CatalogoEventos')) },
            { path: 'eventos/:eventCode', lazy: perezosa(() => import('./pages/DetalleEvento')) },
            { path: 'artistas', lazy: perezosa(() => import('./pages/ListaArtistas')) },
            { path: 'artistas/:id', lazy: perezosa(() => import('./pages/DetalleArtista')) },
            { path: 'sedes', lazy: perezosa(() => import('./pages/ListaSedes')) },
            { path: 'sedes/:code', lazy: perezosa(() => import('./pages/DetalleSede')) },
            {
                element: <SoloAnonimo />,
                children: [
                    { path: 'login', lazy: perezosa(() => import('./pages/Login')) },
                    { path: 'registro', lazy: perezosa(() => import('./pages/Registro')) },
                ],
            },
            {
                element: <RutaProtegida />,
                children: [
                    { path: 'cuenta', lazy: perezosa(() => import('./pages/Cuenta')) },
                    {
                        element: <RutaPorRol roles={['USER']} />,
                        children: [
                            { path: 'mis-tickets', lazy: perezosa(() => import('./pages/MisTickets')) },
                            { path: 'mis-tickets/:ticketCode', lazy: perezosa(() => import('./pages/DetalleTicket')) },
                            { path: 'compra/confirmacion/:ticketCode', lazy: perezosa(() => import('./pages/ConfirmacionCompra')) },
                        ],
                    },
                    {
                        element: <RutaPorRol roles={['STAFF', 'ADMIN']} />,
                        children: [
                            { path: 'staff/validacion', lazy: perezosa(() => import('./pages/ValidacionIngreso')) },
                            { path: 'staff/eventos/:eventCode?/tickets', lazy: perezosa(() => import('./pages/TicketsPagadosEvento')) },
                        ],
                    },
                    {
                        element: <RutaPorRol roles={['ADMIN']} />,
                        children: [
                            { path: 'admin/eventos', lazy: perezosa(() => import('./pages/AdminEventos')) },
                            { path: 'admin/eventos/nuevo', lazy: perezosa(() => import('./pages/AdminCrearEvento')) },
                            { path: 'admin/eventos/:eventCode', lazy: perezosa(() => import('./pages/AdminGestionEvento')) },
                        ],
                    },
                ],
            },
            { path: '403', lazy: perezosa(() => import('./pages/SinPermisos')) },
            { path: '*', lazy: perezosa(() => import('./pages/NoEncontrada')) },
        ],
    },
])