import { useId } from 'react'
import type { ComponentProps } from 'react'
import clsx from 'clsx'

interface SelectorProps extends ComponentProps<'select'> {
    etiqueta: string
    error?: string
    ayuda?: string
}

export function Selector({ etiqueta, error, ayuda, className, id, children, ...resto }: SelectorProps) {
    const idAuto = useId()
    const idCampo = id ?? idAuto
    const idMensaje = `${idCampo}-mensaje`

    return (
        <div className={className}>
            <label htmlFor={idCampo} className="mb-1 block text-sm font-medium text-slate-900 dark:text-slate-100">
                {etiqueta}
            </label>
            <select
                id={idCampo}
                aria-invalid={error ? true : undefined}
                aria-describedby={error || ayuda ? idMensaje : undefined}
                className={clsx(
                    'min-h-11 w-full rounded-lg border bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca-600 dark:bg-slate-900 dark:text-slate-100',
                    error ? 'border-red-500' : 'border-slate-300 dark:border-slate-600',
                )}
                {...resto}
            >
                {children}
            </select>
            {error ? (
                <p id={idMensaje} role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {error}
                </p>
            ) : ayuda ? (
                <p id={idMensaje} className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {ayuda}
                </p>
            ) : null}
        </div>
    )
}