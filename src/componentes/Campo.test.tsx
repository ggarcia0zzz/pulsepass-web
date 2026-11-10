import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Campo } from './Campo'

describe('Campo', () => {
    it('asocia la etiqueta con el input', () => {
        render(<Campo etiqueta="Correo" />)
        expect(screen.getByLabelText('Correo')).toBeInTheDocument()
    })

    it('marca aria-invalid y muestra el error', () => {
        render(<Campo etiqueta="Correo" error="Obligatorio" />)
        expect(screen.getByLabelText('Correo')).toHaveAttribute('aria-invalid', 'true')
        expect(screen.getByRole('alert')).toHaveTextContent('Obligatorio')
    })
})