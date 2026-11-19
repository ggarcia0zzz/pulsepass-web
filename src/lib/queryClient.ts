import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '../api/cliente'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60_000,
            // Los errores 4xx (por ejemplo, 404) no se reintentan: no van a cambiar.
            retry: (intentos, error) => !(error instanceof ApiError && error.status < 500) && intentos < 2,
        },
        mutations: { retry: false },
    },
})
