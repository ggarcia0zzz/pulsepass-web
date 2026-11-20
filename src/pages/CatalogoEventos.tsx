import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { listarEventos, eventosPorArtista } from "../api/catalogo";
import type { CategoriaEvento } from "../api/tipos";
import { Campo } from "../componentes/Campo";
import { Cargando } from "../componentes/Cargando";
import { EstadoError } from "../componentes/EstadoError";
import { EstadoVacio } from "../componentes/EstadoVacio";
import { Selector } from "../componentes/Selector";
import { TarjetaEvento } from "../componentes/TarjetaEvento";
import { ETIQUETA_CATEGORIA, normalizar } from "../lib/formato";

export default function CatalogoEventos() {
  const [params, setParams] = useSearchParams();
  const texto = params.get("q") ?? "";
  const categoria = params.get("categoria") ?? "";
  const artista = params.get("artista") ?? "";
  const setTexto = (v: string) =>
    setParams(
      (p) => {
        p.set("q", v);
        return p;
      },
      { replace: true },
    );
  const setCategoria = (v: CategoriaEvento | "") =>
    setParams(
      (p) => {
        p.set("categoria", v);
        return p;
      },
      { replace: true },
    );
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["eventos", artista],
    queryFn: () => (artista ? eventosPorArtista(artista) : listarEventos()),
  });

  const busqueda = normalizar(texto.trim());
  const eventos = (data ?? []).filter((e) => {
    if (categoria && e.category !== categoria) return false;
    if (!busqueda) return true;
    const pajar = normalizar(
      [
        e.name,
        e.sede.city,
        e.sede.name,
        ...e.artistas.map((a) => a.stageName),
      ].join(" "),
    );
    return pajar.includes(busqueda);
  });

  return (
    <div>
      <h1 className="mb-6 font-titulo text-2xl font-bold">Eventos</h1>

      <div className="pp-card rounded-2xl p-4 mb-6 grid gap-4 sm:grid-cols-2">
        <Campo
          etiqueta="Buscar"
          type="search"
          placeholder="Evento, artista o ciudad"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <Selector
          etiqueta="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value as CategoriaEvento | "")}
        >
          <option value="">Todas</option>
          {Object.entries(ETIQUETA_CATEGORIA).map(([valor, etiqueta]) => (
            <option key={valor} value={valor}>
              {etiqueta}
            </option>
          ))}
        </Selector>
      </div>

      {isPending ? (
        <Cargando mensaje="Cargando eventos…" />
      ) : isError ? (
        <EstadoError
          mensaje="No pudimos cargar los eventos."
          onReintentar={() => refetch()}
        />
      ) : eventos.length === 0 ? (
        <EstadoVacio mensaje="No hay eventos que coincidan con tu búsqueda." />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {eventos.map((e) => (
            <li key={e.eventCode}>
              <TarjetaEvento evento={e} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
