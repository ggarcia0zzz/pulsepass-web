import clsx from 'clsx'

export type VarianteBoton = 'primario' | 'secundario' | 'peligro' | 'fantasma'

const clasesVariante: Record<VarianteBoton, string> = {
    primario: 'bg-marca-600 text-white hover:bg-marca-700',
    secundario:
        'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800',
    peligro: 'bg-red-600 text-white hover:bg-red-700',
    fantasma:
        'bg-transparent text-marca-700 hover:bg-marca-50 dark:text-marca-500 dark:hover:bg-slate-800',
}

export function estilosBoton(variante: VarianteBoton, cargando = false): string {
    return clsx(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca-600 disabled:cursor-not-allowed disabled:opacity-60',
        cargando ? 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300' : clasesVariante[variante],
    )
}