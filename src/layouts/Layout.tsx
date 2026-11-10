import { Outlet } from 'react-router'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function Layout() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <a
                href="#contenido"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-marca-700"
            >
                Saltar al contenido
            </a>
            <Navbar />
            <main id="contenido" className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}