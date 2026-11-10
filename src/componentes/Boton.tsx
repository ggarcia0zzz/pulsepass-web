import type { ComponentProps } from 'react'
import clsx from 'clsx'
import { estilosBoton } from './estilosBoton'
import type { VarianteBoton } from './estilosBoton'

interface BotonProps extends ComponentProps<'button'> {
    variante?: VarianteBoton
    cargando?: boolean
}

export function Boton({
                          variante = 'primario',
                          cargando = false,
                          disabled,
                          className,
                          children,
                          type = 'button',
                          ...resto
                      }: BotonProps) {
    return (
        <button
            type={type}
            disabled={disabled || cargando}
            aria-busy={cargando}
            className={clsx(estilosBoton(variante, cargando), className)}
            {...resto}
        >
            {cargando ? 'Cargando…' : children}
        </button>
    )
}