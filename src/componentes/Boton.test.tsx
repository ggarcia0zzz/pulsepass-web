import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Boton } from './Boton'

describe('Boton', () => {
    it('ejecuta onClick', async () => {
        const onClick = vi.fn()
        render(<Boton onClick={onClick}>Comprar</Boton>)
        await userEvent.click(screen.getByRole('button', { name: 'Comprar' }))
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('se deshabilita y muestra Cargando… cuando cargando', () => {
        render(<Boton cargando>Comprar</Boton>)
        expect(screen.getByRole('button', { name: 'Cargando…' })).toBeDisabled()
    })
})