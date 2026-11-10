import type { ReactNode } from 'react'
import clsx from 'clsx'

interface TarjetaProps {
    children: ReactNode
    className?: string
}

export function Tarjeta({ children, className }: TarjetaProps) {
    return (
        <div className={clsx('rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900', className)}>
            {children}
        </div>
    )
}