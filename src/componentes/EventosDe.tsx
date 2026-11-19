import { useQuery } from "@tanstack/react-query";
import { listarEventos, eventosPorArtista } from "../api/catalogo";
import type { Evento } from "../api/tipos";
import { Cargando } from "./Cargando";
import { EstadoError } from "./EstadoError";
import { EstadoVacio } from "./EstadoVacio";
import { TarjetaEvento } from "./TarjetaEvento";

interface EventosDeProps {
  artista?: string;
  titulo: string;
  filtro: (evento: Evento) => boolean;
}

/** Sección con los eventos que cumplen un filtro (los de un artista, los de una sede…). */
export function EventosDe({ titulo, filtro, artista }: EventosDeProps) {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["eventos", artista ?? ""],
    queryFn: () => (artista ? eventosPorArtista(artista) : listarEventos()),
  });
  const eventos = (data ?? []).filter(filtro);

  return (
    <section className="mt-8">
      <h2 className="mb-4 font-titulo text-xl font-bold">{titulo}</h2>
      {isPending ? (
        <Cargando mensaje="Cargando eventos…" />
      ) : isError ? (
        <EstadoError
          mensaje="No pudimos cargar los eventos."
          onReintentar={() => refetch()}
        />
      ) : eventos.length === 0 ? (
        <EstadoVacio mensaje="Por ahora no hay eventos programados." />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {eventos.map((e) => (
            <li key={e.eventCode}>
              <TarjetaEvento evento={e} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
