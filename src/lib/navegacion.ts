import { RUTAS } from './rutas'

export function rutaDesde(state: unknown): string {
    if (typeof state === 'object' && state !== null && 'desde' in state) {
        const desde = state.desde
        if (typeof desde === 'string' && desde.startsWith('/') && !desde.startsWith('//')) {
            return desde
        }
    }
    return RUTAS.inicio
}