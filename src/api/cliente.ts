export class ApiError extends Error {
    status: number

    constructor(mensaje: string, status: number) {
        super(mensaje)
        this.name = 'ApiError'
        this.status = status
    }
}

/** Simula la latencia de la red mientras no exista el backend real. */
export const esperar = (ms = 400) => new Promise<void>((resolver) => setTimeout(resolver, ms))
