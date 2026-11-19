import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { listarEventos, listarArtistas } from "../api/catalogo";
import { TarjetaEvento } from "../componentes/TarjetaEvento";
import { EnlaceBoton } from "../componentes/EnlaceBoton";
import { useAuth } from "../funcionalidades/auth/hooks";
import { RUTAS } from "../lib/rutas";
export default function Inicio() {
  const e = useQuery({ queryKey: ["eventos"], queryFn: listarEventos });
  const a = useQuery({ queryKey: ["artistas"], queryFn: listarArtistas });
  const { sesion } = useAuth();
  return (
    <div className="space-y-8">
      <section className="pp-hero rounded-3xl text-white">
        <p className="pp-kicker mb-4">Tu próxima experiencia empieza aquí</p>
        <h1 className="font-titulo text-4xl font-bold">
          Vive el momento. Siente el pulso.
        </h1>
        <p className="my-4">
          Música, cultura, deporte y tecnología en un solo lugar.
        </p>
        <div className="flex flex-wrap gap-3">
          <EnlaceBoton to={RUTAS.eventos} variante="secundario">
            Ver cartelera
          </EnlaceBoton>
          {sesion.estado === "anonimo" && (
            <EnlaceBoton to={RUTAS.registro}>Crear cuenta</EnlaceBoton>
          )}
        </div>
      </section>
      <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="pp-kicker">En cartelera</p><h2 className="text-2xl font-bold">Próximos eventos</h2></div><Link className="text-marca-500 text-sm font-semibold" to={RUTAS.eventos}>Ver todos →</Link></div>
      {e.isPending ? (
        "Cargando…"
      ) : e.isError ? (
        <button onClick={() => e.refetch()}>Error. Reintentar</button>
      ) : e.data.length === 0 ? (
        "Aún no hay eventos publicados"
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {e.data.slice(0, 3).map((x) => (
            <TarjetaEvento key={x.eventCode} evento={x} />
          ))}
        </div>
      )}
      <h2 className="text-2xl font-bold">Artistas destacados</h2>
      {a.isPending ? (
        "Cargando…"
      ) : a.isError ? (
        <button onClick={() => a.refetch()}>Error. Reintentar</button>
      ) : (
        <div className="flex flex-wrap gap-4">
          {a.data.slice(0, 6).map((x) => (
            <Link className="pp-card rounded-xl px-5 py-4 font-semibold hover:text-marca-500" key={x.id} to={RUTAS.artista(x.id)}>
              {x.stageName}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
