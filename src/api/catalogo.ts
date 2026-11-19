import { ApiError, esperar } from './cliente'
import { ARTISTAS, EVENTOS, SEDES } from './datosFalsos'
import type { Artista, Evento, Sede } from './tipos'

// TODO(backend): reemplazar cada función por su fetch real (GET /api/eventos, etc.).

/** Eventos visibles para el público: todos menos los borradores, por fecha ascendente. */
export async function listarEventos(): Promise<Evento[]> {
    await esperar()
    return EVENTOS.filter((e) => e.status !== 'DRAFT').sort((a, b) => a.eventDate.localeCompare(b.eventDate))
}

export async function obtenerEvento(eventCode: string): Promise<Evento> {
    await esperar()
    const evento = EVENTOS.find((e) => e.eventCode === eventCode && e.status !== 'DRAFT')
    if (!evento) throw new ApiError('Evento no encontrado', 404)
    return evento
}

export async function listarArtistas(): Promise<Artista[]> {
    await esperar()
    return ARTISTAS.filter((a) => a.active)
}

export async function obtenerArtista(id: number): Promise<Artista> {
    await esperar()
    const artista = ARTISTAS.find((a) => a.id === id)
    if (!artista) throw new ApiError('Artista no encontrado', 404)
    return artista
}

export async function listarSedes(): Promise<Sede[]> {
    await esperar()
    return SEDES.filter((s) => s.active)
}

export async function obtenerSede(code: string): Promise<Sede> {
    await esperar()
    const sede = SEDES.find((s) => s.code === code)
    if (!sede) throw new ApiError('Sede no encontrada', 404)
    return sede
}
