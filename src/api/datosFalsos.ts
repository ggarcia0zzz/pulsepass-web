import type { UsuarioAutenticado } from '../funcionalidades/auth/tipos'
import type { Artista, Evento, Sede } from './tipos'

export const SEDES: Sede[] = [
    { code: 'SM-ARENA', name: 'Arena Santa Marta', city: 'Santa Marta', address: 'Carrera 1 # 20-10', capacity: 5000, active: true },
    { code: 'BAQ-PLAZA', name: 'Plaza de la Música', city: 'Barranquilla', address: 'Calle 72 # 45-30', capacity: 12000, active: true },
    { code: 'BOG-TEATRO', name: 'Teatro Metropolitano', city: 'Bogotá', address: 'Avenida 26 # 68-15', capacity: 2500, active: true },
]

// Los mismos artistas que inserta la migración V2 del backend.
export const ARTISTAS: Artista[] = [
    { id: 1, stageName: 'Solar Beat', genre: 'Electronic', country: 'Colombia', active: true },
    { id: 2, stageName: 'Neon Waves', genre: 'Synthpop', country: 'Mexico', active: true },
    { id: 3, stageName: 'Caribbean Sound', genre: 'Reggae', country: 'Colombia', active: true },
    { id: 4, stageName: 'Ocean Drive', genre: 'Pop', country: 'USA', active: true },
    { id: 5, stageName: 'Digital Pulse', genre: 'Techno', country: 'Germany', active: true },
]

export const EVENTOS: Evento[] = [
    {
        eventCode: 'EVT-001',
        name: 'Festival Solar',
        description: 'Una noche de música electrónica frente al mar con los mejores artistas de la región.',
        category: 'MUSIC',
        status: 'PUBLISHED',
        eventDate: '2027-02-12T20:00:00',
        minimumAge: 18,
        streamingUrl: null,
        sede: SEDES[0],
        artistas: [ARTISTAS[0], ARTISTAS[4]],
    },
    {
        eventCode: 'EVT-002',
        name: 'Caribe en Vivo',
        description: 'Reggae y ritmos caribeños para toda la familia.',
        category: 'MUSIC',
        status: 'PUBLISHED',
        eventDate: '2027-03-05T18:30:00',
        minimumAge: 0,
        streamingUrl: 'https://example.com/stream/caribe-en-vivo',
        sede: SEDES[1],
        artistas: [ARTISTAS[2]],
    },
    {
        eventCode: 'EVT-003',
        name: 'Noche Synthpop',
        description: 'Neon Waves presenta su gira latinoamericana.',
        category: 'MUSIC',
        status: 'SOLD_OUT',
        eventDate: '2027-01-22T21:00:00',
        minimumAge: 16,
        streamingUrl: null,
        sede: SEDES[2],
        artistas: [ARTISTAS[1]],
    },
    {
        eventCode: 'EVT-004',
        name: 'Tech Summit Caribe',
        description: 'Charlas y talleres sobre desarrollo de software e inteligencia artificial.',
        category: 'TECHNOLOGY',
        status: 'PUBLISHED',
        eventDate: '2027-04-18T09:00:00',
        minimumAge: 0,
        streamingUrl: 'https://example.com/stream/tech-summit',
        sede: SEDES[0],
        artistas: [],
    },
    {
        eventCode: 'EVT-005',
        name: 'Pop Ocean Tour',
        description: 'Ocean Drive llega por primera vez a Colombia.',
        category: 'MUSIC',
        status: 'PUBLISHED',
        eventDate: '2027-05-09T20:30:00',
        minimumAge: 0,
        streamingUrl: null,
        sede: SEDES[1],
        artistas: [ARTISTAS[3]],
    },
    {
        eventCode: 'EVT-006',
        name: 'Gala de Cierre 2026',
        description: 'Evento ya realizado. Aparece en el historial.',
        category: 'CULTURE',
        status: 'FINISHED',
        eventDate: '2026-10-30T19:00:00',
        minimumAge: 0,
        streamingUrl: null,
        sede: SEDES[2],
        artistas: [],
    },
    {
        eventCode: 'EVT-007',
        name: 'Borrador: Festival de Invierno',
        description: 'Aún no publicado (solo lo ve el admin).',
        category: 'ENTERTAINMENT',
        status: 'DRAFT',
        eventDate: '2027-07-01T18:00:00',
        minimumAge: 0,
        streamingUrl: null,
        sede: SEDES[0],
        artistas: [],
    },
]

// Cuentas de prueba (solo para desarrollo, el backend real las reemplazará).
export const CUENTAS_FALSAS: { password: string; usuario: UsuarioAutenticado }[] = [
    {
        password: 'Clave123*',
        usuario: { id: 1, username: 'andrea', email: 'user@pulsepass.test', firstName: 'Andrea', lastName: 'Ruiz', roles: ['USER'] },
    },
    {
        password: 'Clave123*',
        usuario: { id: 2, username: 'carlos', email: 'staff@pulsepass.test', firstName: 'Carlos', lastName: 'Mejía', roles: ['USER', 'STAFF'] },
    },
    {
        password: 'Clave123*',
        usuario: { id: 3, username: 'admin', email: 'admin@pulsepass.test', firstName: 'Laura', lastName: 'Pérez', roles: ['USER', 'ADMIN'] },
    },
]
