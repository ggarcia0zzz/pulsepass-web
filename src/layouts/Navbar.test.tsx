import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Rol, Sesion } from '../funcionalidades/auth/tipos'
import { renderConProveedores } from '../test/utils'
import { Navbar } from './Navbar'

function autenticado(roles: Rol[]): Sesion {
    return {
        estado: 'autenticado',
        token: 'token-de-prueba',
        expiraEn: Date.now() + 900_000,
        usuario: {
            id: 1,
            username: 'andrea',
            email: 'andrea@pulsepass.test',
            firstName: 'Andrea',
            lastName: 'Ruiz',
            roles,
        },
    }
}

describe('Navbar por rol', () => {
    it('anónimo: Ingresar y Registrarse, sin enlaces privados', () => {
        renderConProveedores(<Navbar />, { sesion: { estado: 'anonimo' } })
        expect(screen.getByRole('link', { name: 'Ingresar' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Registrarse' })).toBeInTheDocument()
        expect(screen.queryByRole('link', { name: 'Mis tickets' })).not.toBeInTheDocument()
    })

    it('USER: ve Mis tickets y no ve operación ni administración', () => {
        renderConProveedores(<Navbar />, { sesion: autenticado(['USER']) })
        expect(screen.getByRole('link', { name: 'Mis tickets' })).toBeInTheDocument()
        expect(screen.queryByRole('link', { name: 'Validar ingreso' })).not.toBeInTheDocument()
        expect(screen.queryByRole('link', { name: 'Administrar eventos' })).not.toBeInTheDocument()
    })

    it('STAFF (que también tiene rol USER): ve operación y no Mis tickets', () => {
        renderConProveedores(<Navbar />, { sesion: autenticado(['USER', 'STAFF']) })
        expect(screen.getByRole('link', { name: 'Validar ingreso' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Tickets pagados' })).toBeInTheDocument()
        expect(screen.queryByRole('link', { name: 'Mis tickets' })).not.toBeInTheDocument()
        expect(screen.queryByRole('link', { name: 'Administrar eventos' })).not.toBeInTheDocument()
    })

    it('ADMIN (que también tiene rol USER): ve Administrar eventos y no Mis tickets', () => {
        renderConProveedores(<Navbar />, { sesion: autenticado(['USER', 'ADMIN']) })
        expect(screen.getByRole('link', { name: 'Administrar eventos' })).toBeInTheDocument()
        expect(screen.queryByRole('link', { name: 'Mis tickets' })).not.toBeInTheDocument()
    })
})