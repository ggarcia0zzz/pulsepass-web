import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router'
import { ApiError } from '../api/cliente'
import { obtenerEvento } from '../api/catalogo'
import { Badge } from '../componentes/Badge'
import { Cargando } from '../componentes/Cargando'
import { EnlaceBoton } from '../componentes/EnlaceBoton'
import { EstadoError } from '../componentes/EstadoError'
import { Tarjeta } from '../componentes/Tarjeta'
import { ETIQUETA_CATEGORIA, ETIQUETA_ESTADO, formatearFechaHora } from '../lib/formato'
import { RUTAS } from '../lib/rutas'

export default function DetalleEvento() {
    const { eventCode = '' } = useParams()
    const { data: evento, isPending, isError, error, refetch } = useQuery({
        queryKey: ['evento', eventCode],
        queryFn: () => obtenerEvento(eventCode),
    })

    const enlaceVolver = (
        <Link to={RUTAS.eventos} className="mb-4 inline-block text-sm font-medium text-marca-700 underline dark:text-marca-500">
            ← Volver a eventos
        </Link>
    )

    if (isPending) return <Cargando mensaje="Cargando evento…" />

    if (isError) {
        const noExiste = error instanceof ApiError && error.status === 404
        return (
            <div>
                {enlaceVolver}
                <EstadoError
                    mensaje={noExiste ? 'Este evento no existe o ya no está disponible.' : 'No pudimos cargar el evento.'}
                    onReintentar={noExiste ? undefined : () => refetch()}
                />
            </div>
        )
    }

    const transmision = evento.streamingUrl?.startsWith('https://') ? evento.streamingUrl : null

    return (
        <div>
            {enlaceVolver}
            <Tarjeta className="space-y-4 p-6">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-slate-400">
                        {ETIQUETA_CATEGORIA[evento.category]}
                    </span>
                    <Badge tono={evento.status}>{ETIQUETA_ESTADO[evento.status]}</Badge>
                </div>

                <h1 className="font-titulo text-3xl font-bold">{evento.name}</h1>
                <p className="text-slate-700 dark:text-slate-300">{evento.description}</p>

                <dl className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <dt className="text-sm font-semibold">Fecha y hora</dt>
                        <dd className="text-slate-700 dark:text-slate-300">{formatearFechaHora(evento.eventDate)}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-semibold">Lugar</dt>
                        <dd className="text-slate-700 dark:text-slate-300">
                            <Link to={RUTAS.sede(evento.sede.code)} className="text-marca-700 underline dark:text-marca-500">
                                {evento.sede.name}
                            </Link>
                            , {evento.sede.city}
                            <br />
                            {evento.sede.address}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-sm font-semibold">Edad mínima</dt>
                        <dd className="text-slate-700 dark:text-slate-300">
                            {evento.minimumAge > 0 ? `Mayores de ${evento.minimumAge} años` : 'Todo público'}
                        </dd>
                    </div>
                    {evento.artistas.length > 0 ? (
                        <div>
                            <dt className="text-sm font-semibold">Artistas</dt>
                            <dd className="text-slate-700 dark:text-slate-300">
                                {evento.artistas.map((a, i) => (
                                    <span key={a.id}>
                                        {i > 0 ? ', ' : ''}
                                        <Link to={RUTAS.artista(a.id)} className="text-marca-700 underline dark:text-marca-500">
                                            {a.stageName}
                                        </Link>
                                    </span>
                                ))}
                            </dd>
                        </div>
                    ) : null}
                </dl>

                {transmision ? (
                    <a
                        href={transmision}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm font-medium text-marca-700 underline dark:text-marca-500"
                    >
                        Ver transmisión en línea
                    </a>
                ) : null}

                {/* La compra de tickets se agrega en el paso 3. */}
                <EnlaceBoton variante="fantasma" to={RUTAS.eventos}>
                    Ver más eventos
                </EnlaceBoton>
            </Tarjeta>
        </div>
    )
}
