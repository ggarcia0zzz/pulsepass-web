import type { Rol } from './tipos'

/** STAFF y ADMIN también traen el rol USER desde el backend: manda el más alto. */
export function rolEfectivo(roles: readonly Rol[]): Rol {
    if (roles.includes('ADMIN')) return 'ADMIN'
    if (roles.includes('STAFF')) return 'STAFF'
    return 'USER'
}