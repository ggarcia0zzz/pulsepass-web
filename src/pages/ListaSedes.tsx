import { useQuery } from "@tanstack/react-query";
import { listarSedes } from "../api/catalogo";
import { Cargando } from "../componentes/Cargando";
import { EnlaceBoton } from "../componentes/EnlaceBoton";
import { EstadoError } from "../componentes/EstadoError";
import { EstadoVacio } from "../componentes/EstadoVacio";
import { Tarjeta } from "../componentes/Tarjeta";
import { RUTAS } from "../lib/rutas";

export default function ListaSedes() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["sedes"],
    queryFn: listarSedes,
  });

  return (
    <div>
      <h1 className="mb-6 font-titulo text-2xl font-bold">Sedes</h1>

      {isPending ? (
        <Cargando mensaje="Cargando sedes…" />
      ) : isError ? (
        <EstadoError
          mensaje="No pudimos cargar las sedes."
          onReintentar={() => refetch()}
        />
      ) : data.length === 0 ? (
        <EstadoVacio mensaje="Aún no hay sedes registradas." />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((s) => (
            <li key={s.code}>
              <Tarjeta className="flex h-full flex-col">
                <h2 className="font-titulo text-lg font-bold">{s.name}</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {s.city} · {s.address}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Capacidad: {s.capacity.toLocaleString("es-CO")} personas
                </p>
                <div className="mt-auto pt-4">
                  <EnlaceBoton variante="secundario" to={RUTAS.sede(s.code)}>
                    Ver sede
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
