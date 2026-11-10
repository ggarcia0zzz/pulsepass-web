import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import clsx from 'clsx'
import { Boton } from '../componentes/Boton'
import { EnlaceBoton } from '../componentes/EnlaceBoton'
import { IconoCerrar, IconoMenu, IconoMusica } from '../componentes/iconos'
import { useAuth, useSalir } from '../funcionalidades/auth/hooks'
import { rolEfectivo } from '../funcionalidades/auth/roles'
import type { Rol } from '../funcionalidades/auth/tipos'
import { RUTAS } from '../lib/rutas'
import { MenuUsuario } from './MenuUsuario'

interface Enlace {
    texto: string
    a: string
}

const ENLACES_PUBLICOS: Enlace[] = [
    { texto: 'Eventos', a: RUTAS.eventos },
    { texto: 'Artistas', a: RUTAS.artistas },
    { texto: 'Sedes', a: RUTAS.sedes },
]

function enlacesPorRol(rol: Rol | null): Enlace[] {
    const operacion: Enlace[] = [
        { texto: 'Validar ingreso', a: RUTAS.validacion },
        { texto: 'Tickets pagados', a: RUTAS.ticketsPagados() },
    ]
    switch (rol) {
        case 'USER':
            return [{ texto: 'Mis tickets', a: RUTAS.misTickets }]
        case 'STAFF':
            return operacion
        case 'ADMIN':
            return [...operacion, { texto: 'Administrar eventos', a: RUTAS.adminEventos }]
        default:
            return []
    }
}

function claseEnlace({ isActive }: { isActive: boolean }) {
    return clsx(
        'block rounded-lg px-3 py-2 text-sm font-medium md:inline-block',
        isActive
            ? 'text-marca-700 underline underline-offset-8 dark:text-marca-500'
            : 'text-slate-700 hover:text-marca-700 dark:text-slate-300 dark:hover:text-marca-500',
    )
}

export function Navbar() {
    const { sesion } = useAuth()
    const salir = useSalir()
    const [menuAbierto, setMenuAbierto] = useState(false)

    const rol = sesion.estado === 'autenticado' ? rolEfectivo(sesion.usuario.roles) : null
    const enlaces = [...ENLACES_PUBLICOS, ...enlacesPorRol(rol)]
    const cerrarMenu = () => setMenuAbierto(false)

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
                <div className="flex items-center gap-6">
                    <Link to={RUTAS.inicio} onClick={cerrarMenu} className="flex items-center gap-2 font-titulo text-lg font-bold">
            <span className="grid size-8 place-items-center rounded-lg bg-marca-600 text-white">
              <IconoMusica className="size-5" />
            </span>
                        PulsePass
                    </Link>
                    <nav aria-label="Principal" className="hidden md:flex md:items-center md:gap-1">
                        {enlaces.map((e) => (
                            <NavLink key={e.a} to={e.a} className={claseEnlace}>
                                {e.texto}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="hidden md:block">
                    {sesion.estado === 'autenticado' ? (
                        <MenuUsuario usuario={sesion.usuario} />
                    ) : sesion.estado === 'anonimo' ? (
                        <div className="flex gap-2">
                            <EnlaceBoton variante="fantasma" to={RUTAS.login}>Ingresar</EnlaceBoton>
                            <EnlaceBoton to={RUTAS.registro}>Registrarse</EnlaceBoton>
                        </div>
                    ) : null}
                </div>

                <button
                    type="button"
                    aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={menuAbierto}
                    aria-controls="menu-movil"
                    onClick={() => setMenuAbierto((v) => !v)}
                    className="grid size-11 place-items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marca-600 md:hidden"
                >
                    {menuAbierto ? <IconoCerrar className="size-6" /> : <IconoMenu className="size-6" />}
                </button>
            </div>

            {menuAbierto ? (
                <div id="menu-movil" className="border-t border-slate-200 px-4 py-4 md:hidden dark:border-slate-800">
                    <nav aria-label="Principal móvil" className="flex flex-col">
                        {enlaces.map((e) => (
                            <NavLink key={e.a} to={e.a} onClick={cerrarMenu} className={claseEnlace}>
                                {e.texto}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="mt-4 flex gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
                        {sesion.estado === 'autenticado' ? (
                            <>
                                <EnlaceBoton variante="secundario" to={RUTAS.cuenta} onClick={cerrarMenu}>Mi cuenta</EnlaceBoton>
                                <Boton
                                    variante="secundario"
                                    onClick={() => {
                                        cerrarMenu()
                                        salir()
                                    }}
                                >
                                    Salir
                                </Boton>
                            </>
                        ) : sesion.estado === 'anonimo' ? (
                            <>
                                <EnlaceBoton variante="secundario" to={RUTAS.login} onClick={cerrarMenu}>Ingresar</EnlaceBoton>
                                <EnlaceBoton to={RUTAS.registro} onClick={cerrarMenu}>Registrarse</EnlaceBoton>
                            </>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </header>
    )
}