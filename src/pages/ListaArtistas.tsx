import { useState } from "react";
import { Campo } from "../componentes/Campo";
import { Boton } from "../componentes/Boton";
import { useQuery } from "@tanstack/react-query";
import { listarArtistas, artistaPorNombre } from "../api/catalogo";
import { Cargando } from "../componentes/Cargando";
import { EnlaceBoton } from "../componentes/EnlaceBoton";
import { EstadoError } from "../componentes/EstadoError";
import { EstadoVacio } from "../componentes/EstadoVacio";
import { Tarjeta } from "../componentes/Tarjeta";
import { RUTAS } from "../lib/rutas";

export default function ListaArtistas() {
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["artistas", name],
    queryFn: async () =>
      name ? [await artistaPorNombre(name)] : listarArtistas(),
  });

  return (
    <div>
      <h1 className="mb-6 font-titulo text-2xl font-bold">Artistas</h1>

      <form
        className="mb-4 flex items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setName(input.trim());
        }}
      >
        <Campo
          etiqueta="Nombre artístico exacto"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Boton type="submit">Buscar</Boton>
        <Boton
          variante="secundario"
          onClick={() => {
            setName("");
            setInput("");
          }}
        >
          Todos
        </Boton>
      </form>
      {isPending ? (
        <Cargando mensaje="Cargando artistas…" />
      ) : isError ? (
        <EstadoError
          mensaje="No pudimos cargar los artistas."
          onReintentar={() => refetch()}
        />
      ) : data.length === 0 ? (
        <EstadoVacio mensaje="Aún no hay artistas registrados." />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((a) => (
            <li key={a.id}>
              <Tarjeta className="flex h-full flex-col">
                <h2 className="font-titulo text-lg font-bold">{a.stageName}</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {a.genre} · {a.country}
                </p>
                <div className="mt-auto pt-4">
                  <EnlaceBoton variante="secundario" to={RUTAS.artista(a.id)}>
                    Ver perfil
                  </EnlaceBoton>
                </div>
              </Tarjeta>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
