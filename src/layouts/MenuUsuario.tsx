import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { IconoChevron } from '../componentes/iconos'
import { useSalir } from '../funcionalidades/auth/hooks'
import { rolEfectivo } from '../funcionalidades/auth/roles'
import type { UsuarioAutenticado } from '../funcionalidades/auth/tipos'
import { RUTAS } from '../lib/rutas'

interface MenuUsuarioProps {
    usuario: UsuarioAutenticado
}

export function MenuUsuario({ usuario }: MenuUsuarioProps) {
    const [abierto, setAbierto] = useState(false)
    const contenedor = useRef<HTMLDivElement>(null)
    const salir = useSalir()
    const esUser = rolEfectivo(usuario.roles) === 'USER'
    const iniciales = `${usuario.firstName.charAt(0)}${usuario.lastName.charAt(0)}`.toUpperCase()

    useEffect(() => {
        if (!abierto) return
        function alPulsar(e: MouseEvent) {
            if (contenedor.current && e.target instanceof Node && !contenedor.current.contains(e.target)) {
                setAbierto(false)
            }
        }
        document.addEventListener('mousedown', alPulsar)
        return () => document.removeEventListener('mousedown', alPulsar)
    }, [abierto])

    const claseItem =
        'block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800'

    return (
        <div
            ref={contenedor}
            className="relative"
            onKeyDown={(e) => {
                if (e.key === 'Escape') setAbierto(false)
            }}
        >
            <button
                type="button"
                aria-expanded={abierto}
                aria-controls="menu-usuario"
                onClick={() => setAbierto((v) => !v)}
                className="flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca-600"
            >
        <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-full bg-marca-600 text-xs font-semibold text-white"
        >
          {iniciales}
        </span>
                {usuario.firstName}
                <IconoChevron className="size-4" />
            </button>
            {abierto ? (
                <ul
                    id="menu-usuario"
                    className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900"
                >
                    <li>
                        <Link to={RUTAS.cuenta} className={claseItem} onClick={() => setAbierto(false)}>
                            Mi cuenta
                        </Link>
                    </li>
                    {esUser ? (
                        <li>
                            <Link to={RUTAS.misTickets} className={claseItem} onClick={() => setAbierto(false)}>
                                Mis tickets
                            </Link>
                        </li>
                    ) : null}
                    <li>
                        <button
                            type="button"
                            className={claseItem}
                            onClick={() => {
                                setAbierto(false)
                                salir()
                            }}
                        >
                            Salir
                        </button>
                    </li>
                </ul>
            ) : null}
        </div>
    )
}