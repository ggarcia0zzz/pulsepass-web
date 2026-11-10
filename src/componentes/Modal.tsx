import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'

interface ModalProps {
    abierto: boolean
    titulo: string
    onCerrar: () => void
    children: ReactNode
}

export function Modal({ abierto, titulo, onCerrar, children }: ModalProps) {
    const ref = useRef<HTMLDialogElement>(null)
    const idTitulo = useId()

    useEffect(() => {
        const dialogo = ref.current
        if (!dialogo) return
        if (abierto && !dialogo.open) {
            if (typeof dialogo.showModal === 'function') dialogo.showModal()
            else dialogo.setAttribute('open', '')
        }
        if (!abierto && dialogo.open) {
            if (typeof dialogo.close === 'function') dialogo.close()
            else dialogo.removeAttribute('open')
        }
    }, [abierto])

    return (
        <dialog
            ref={ref}
            aria-labelledby={idTitulo}
            onClose={onCerrar}
            onClick={(e) => {
                if (e.target === e.currentTarget) onCerrar()
            }}
            className="m-auto w-[calc(100%-2rem)] max-w-md rounded-xl bg-white p-6 text-slate-900 shadow-xl backdrop:bg-slate-900/60 dark:bg-slate-900 dark:text-slate-100"
        >
            <h2 id={idTitulo} className="font-titulo text-lg font-semibold">
                {titulo}
            </h2>
            <div className="mt-4">{abierto ? children : null}</div>
        </dialog>
    )
}