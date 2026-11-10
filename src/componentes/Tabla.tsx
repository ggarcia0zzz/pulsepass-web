import type { ReactNode } from 'react'

export interface Columna<T> {
    encabezado: string
    celda: (fila: T) => ReactNode
}

interface TablaProps<T> {
    columnas: Columna<T>[]
    filas: T[]
    clave: (fila: T) => string | number
}

export function Tabla<T>({ columnas, filas, clave }: TablaProps<T>) {
    return (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm dark:bg-slate-900">
            <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400">
                <tr>
                    {columnas.map((c) => (
                        <th key={c.encabezado} scope="col" className="px-4 py-3 font-semibold">
                            {c.encabezado}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {filas.map((fila) => (
                    <tr key={clave(fila)} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                        {columnas.map((c) => (
                            <td key={c.encabezado} className="px-4 py-3">
                                {c.celda(fila)}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}