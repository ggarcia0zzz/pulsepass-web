import type { ComponentProps } from 'react'
import { Link } from 'react-router'
import clsx from 'clsx'
import { estilosBoton } from './estilosBoton'
import type { VarianteBoton } from './estilosBoton'

interface EnlaceBotonProps extends ComponentProps<typeof Link> {
    variante?: VarianteBoton
}

export function EnlaceBoton({ variante = 'primario', className, ...resto }: EnlaceBotonProps) {
    return <Link className={clsx(estilosBoton(variante), className)} {...resto} />
}