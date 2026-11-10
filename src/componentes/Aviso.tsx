import type { ReactNode } from 'react'

type TipoAviso = 'exito' | 'error' | 'info'

const clasesTipo: Record<TipoAviso, string> = {
    exito: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300',
    error: 'bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300',
    info: 'bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300',
}

interface AvisoProps {
    tipo: TipoAviso
    children: ReactNode
}

export function Aviso({ tipo, children }: AvisoProps) {
    return (
        <div
            role={tipo === 'error' ? 'alert' : 'status'}
            aria-live={tipo === 'error' ? 'assertive' : 'polite'}
            className={`rounded-lg px-4 py-3 text-sm ${clasesTipo[tipo]}`}
        >
            {children}
        </div>
    )
}