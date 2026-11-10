export function EstadoVacio({ mensaje }: { mensaje: string }) {
    return (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-600 dark:border-slate-700 dark:text-slate-400">
            {mensaje}
        </div>
    )
}