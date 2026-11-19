import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { obtenerSede } from "../api/catalogo";
import { Cargando } from "../componentes/Cargando";
import { EnlaceVolver } from "../componentes/EnlaceVolver";
import { ErrorDeCarga } from "../componentes/ErrorDeCarga";
import { EventosDe } from "../componentes/EventosDe";
import { Tarjeta } from "../componentes/Tarjeta";
import { RUTAS } from "../lib/rutas";

export default function DetalleSede() {
  const { code = "" } = useParams();
  const {
    data: sede,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["sede", code],
    queryFn: () => obtenerSede(code),
  });

  if (isPending) return <Cargando mensaje="Cargando sede…" />;

  if (isError) {
    return (
      <div>
        <EnlaceVolver to={RUTAS.sedes}>Volver a sedes</EnlaceVolver>
        <ErrorDeCarga
          error={error}
          mensajeNoExiste="Esta sede no existe."
          onReintentar={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div>
      <EnlaceVolver to={RUTAS.sedes}>Volver a sedes</EnlaceVolver>
      <Tarjeta className="p-6">
        <h1 className="font-titulo text-3xl font-bold">{sede.name}</h1>
        <dl className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-sm font-semibold">Ciudad</dt>
            <dd className="text-slate-700 dark:text-slate-300">{sede.city}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold">Dirección</dt>
            <dd className="text-slate-700 dark:text-slate-300">
              {sede.address}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold">Capacidad</dt>
            <dd className="text-slate-700 dark:text-slate-300">
              {sede.capacity.toLocaleString("es-CO")} personas
            </dd>
          </div>
        </dl>
      </Tarjeta>
      <EventosDe
        titulo={`Eventos en ${sede.name}`}
        filtro={(e) => e.sede.code === sede.code}
      />
    </div>
  );
}
