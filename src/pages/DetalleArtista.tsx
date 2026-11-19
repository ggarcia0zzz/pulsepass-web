import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { obtenerArtista } from '../api/catalogo'
import { Cargando } from '../componentes/Cargando'
import { EnlaceVolver } from '../componentes/EnlaceVolver'
import { ErrorDeCarga } from '../componentes/ErrorDeCarga'
import { EventosDe } from '../componentes/EventosDe'
import { Tarjeta } from '../componentes/Tarjeta'
import { RUTAS } from '../lib/rutas'

export default function DetalleArtista() {
    const { id } = useParams()
    const idNumero = Number(id)
    const { data: artista, isPending, isError, error, refetch } = useQuery({
        queryKey: ['artista', idNumero],
        queryFn: () => obtenerArtista(idNumero),
    })

    if (isPending) return <Cargando mensaje="Cargando artista…" />

    if (isError) {
        return (
            <div>
                <EnlaceVolver to={RUTAS.artistas}>Volver a artistas</EnlaceVolver>
                <ErrorDeCarga
                    error={error}
                    mensajeNoExiste="Este artista no existe."
                    onReintentar={() => refetch()}
                />
            </div>
        )
    }

    return (
        <div>
            <EnlaceVolver to={RUTAS.artistas}>Volver a artistas</EnlaceVolver>
            <Tarjeta className="p-6">
                <h1 className="font-titulo text-3xl font-bold">{artista.stageName}</h1>
                <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                        <dt className="text-sm font-semibold">Género</dt>
                        <dd className="text-slate-700 dark:text-slate-300">{artista.genre}</dd>
                    </div>
                    <div>
                        <dt className="text-sm font-semibold">País</dt>
                        <dd className="text-slate-700 dark:text-slate-300">{artista.country}</dd>
                    </div>
                </dl>
            </Tarjeta>
            <EventosDe
                titulo={`Eventos con ${artista.stageName}`}
                filtro={(e) => e.artistas.some((a) => a.id === artista.id)}
            />
        </div>
    )
}
