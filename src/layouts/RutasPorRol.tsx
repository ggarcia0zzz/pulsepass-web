import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Rol, Sesion } from '../funcionalidades/auth/tipos'
import { renderConRutas } from '../test/utils'
import { RutaPorRol } from './RutaPorRol'

function autenticado(roles: Rol[]): Sesion {
    return {
        estado: 'autenticado',
        token: 'token-de-prueba',
        expiraEn: Date.now() + 900_000,
        usuario: { id: 1, username: 'x', email: 'x@pulsepass.test', firstName: 'X', lastName: 'Y', roles },
    }
}

function rutasDePrueba(roles: Rol[]) {
    return [
        { path: '/login', element: <p>pantalla login</p> },
        { path: '/403', element: <p>pantalla 403</p> },
        {
            element: <RutaPorRol roles={roles} />,
            children: [{ path: '/zona', element: <p>zona protegida</p> }],
        },
    ]
}

describe('RutaPorRol', () => {
    it('anónimo → redirige a /login', async () => {
        renderConRutas(rutasDePrueba(['ADMIN']), { sesion: { estado: 'anonimo' }, ruta: '/zona' })
        expect(await screen.findByText('pantalla login')).toBeInTheDocument()
    })

    it('USER en ruta de ADMIN → /403', async () => {
        renderConRutas(rutasDePrueba(['ADMIN']), { sesion: autenticado(['USER']), ruta: '/zona' })
        expect(await screen.findByText('pantalla 403')).toBeInTheDocument()
    })

    it('STAFF (con rol USER) en ruta de USER → /403', async () => {
        renderConRutas(rutasDePrueba(['USER']), { sesion: autenticado(['USER', 'STAFF']), ruta: '/zona' })
        expect(await screen.findByText('pantalla 403')).toBeInTheDocument()
    })

    it('ADMIN en ruta de ADMIN → muestra la zona', async () => {
        renderConRutas(rutasDePrueba(['ADMIN']), { sesion: autenticado(['USER', 'ADMIN']), ruta: '/zona' })
        expect(await screen.findByText('zona protegida')).toBeInTheDocument()
    })
})