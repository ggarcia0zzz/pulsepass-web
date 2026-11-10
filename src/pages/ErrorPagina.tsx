import { isRouteErrorResponse, useRouteError } from 'react-router'
import { Boton } from '../componentes/Boton'
import { EnlaceBoton } from '../componentes/EnlaceBoton'
import { RUTAS } from '../lib/rutas'

function mensajeSeguro(error: unknown): string {
    if (isRouteErrorResponse(error)) {
        if (error.status === 404) return 'No encontramos lo que buscabas.'
        if (error.status === 403) return 'No tienes permisos para ver esto.'
    }
    return 'Ocurrió un error inesperado. Inténtalo más tarde.'
}

export default function ErrorPagina() {
    const error = useRouteError()

    return (
        <div className="grid min-h-screen place-items-center bg-slate-50 p-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <section role="alert" className="max-w-md rounded-xl bg-white p-8 text-center shadow-sm dark:bg-slate-900">
                <h1 className="font-titulo text-2xl font-bold">¡Ups! Algo salió mal.</h1>
                <p className="mt-2 text-slate-600 dark:text-slate-400">{mensajeSeguro(error)}</p>
                <div className="mt-6 flex justify-center gap-3">
                    <Boton onClick={() => window.location.reload()}>Reintentar</Boton>
                    <EnlaceBoton variante="secundario" to={RUTAS.inicio}>Volver al inicio</EnlaceBoton>
                </div>
            </section>
        </div>
    )
}