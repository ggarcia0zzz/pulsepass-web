import { Boton } from './Boton'

interface EstadoErrorProps {
    mensaje: string
    onReintentar?: () => void
}

export function EstadoError({ mensaje, onReintentar }: EstadoErrorProps) {
    return (
        <div role="alert" className="rounded-xl bg-red-50 p-6 text-center text-red-800 dark:bg-red-950/40 dark:text-red-300">
            <p>{mensaje}</p>
            {onReintentar ? (
                <Boton variante="secundario" className="mt-4" onClick={onReintentar}>
                    Reintentar
                </Boton>
            ) : null}
        </div>
    )
}