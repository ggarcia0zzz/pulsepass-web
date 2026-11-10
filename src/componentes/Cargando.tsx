export function Cargando({ mensaje = 'Cargando…' }: { mensaje?: string }) {
    return (
        <div role="status" aria-live="polite" className="flex items-center justify-center gap-3 p-8 text-slate-600 dark:text-slate-400">
      <span
          aria-hidden="true"
          className="size-5 animate-spin rounded-full border-2 border-marca-600 border-t-transparent motion-reduce:animate-none"
      />
            <span>{mensaje}</span>
        </div>
    )
}