import { EnlaceBoton } from '../componentes/EnlaceBoton'
import { RUTAS } from '../lib/rutas'

export default function SinPermisos() {
    return (
        <section className="mx-auto max-w-md py-16 text-center">
            <p aria-hidden="true" className="font-titulo text-6xl font-bold text-marca-600">403</p>
            <h1 className="mt-4 text-xl font-semibold">No tienes permisos para acceder a esta sección.</h1>
            <div className="mt-6">
                <EnlaceBoton to={RUTAS.inicio}>Volver al inicio</EnlaceBoton>
            </div>
        </section>
    )
}