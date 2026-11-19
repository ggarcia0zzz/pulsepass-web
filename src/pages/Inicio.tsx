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
      <section className="rounded-xl bg-linear-to-r from-marca-600 to-acento-500 p-8 text-white">
        <h1 className="font-titulo text-4xl font-bold">
          Descubre los mejores eventos
        </h1>
        <p className="my-4">
          Música, cultura, deporte y tecnología en un solo lugar.
        </p>
        <div className="flex gap-3">
          <EnlaceBoton to={RUTAS.eventos} variante="secundario">
            Ver cartelera
          </EnlaceBoton>
          {sesion.estado === "anonimo" && (
            <EnlaceBoton to={RUTAS.registro}>Crear cuenta</EnlaceBoton>
          )}
        </div>
      </section>
      <h2 className="text-xl font-bold">Próximos eventos</h2>
      {e.isPending ? (
        "Cargando…"
      ) : e.isError ? (
        <button onClick={() => e.refetch()}>Error. Reintentar</button>
      ) : e.data.length === 0 ? (
        "Aún no hay eventos publicados"
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          {e.data.slice(0, 3).map((x) => (
            <TarjetaEvento key={x.eventCode} evento={x} />
          ))}
        </div>
      )}
      <h2 className="text-xl font-bold">Artistas destacados</h2>
      {a.isPending ? (
        "Cargando…"
      ) : a.isError ? (
        <button onClick={() => a.refetch()}>Error. Reintentar</button>
      ) : (
        <div className="flex flex-wrap gap-4">
          {a.data.slice(0, 6).map((x) => (
            <Link key={x.id} to={RUTAS.artista(x.id)}>
              {x.stageName}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
