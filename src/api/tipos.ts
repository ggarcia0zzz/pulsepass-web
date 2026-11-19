// Tipos que reflejan el modelo del backend (Venue, Artist, Event).
// Cuando exista la API real, estos tipos deben coincidir con su JSON.

export type CategoriaEvento = 'MUSIC' | 'SPORTS' | 'TECHNOLOGY' | 'EDUCATION' | 'CULTURE' | 'ENTERTAINMENT'
export type EstadoEvento = 'DRAFT' | 'PUBLISHED' | 'SOLD_OUT' | 'CANCELLED' | 'FINISHED'

export interface Sede {
    code: string
    name: string
    city: string
    address: string
    capacity: number
    active: boolean
}

export interface Artista {
    id: number
    stageName: string
    genre: string
    country: string
    active: boolean
}

export interface Evento {
    eventCode: string
    name: string
    description: string
    category: CategoriaEvento
    status: EstadoEvento
    eventDate: string // ISO 8601
    minimumAge: number
    streamingUrl: string | null
    sede: Sede
    artistas: Artista[]
}
