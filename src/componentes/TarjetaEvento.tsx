import type { Evento } from "../api/tipos";
import {
  ETIQUETA_CATEGORIA,
  ETIQUETA_ESTADO,
  formatearFechaHora,
} from "../lib/formato";
import { RUTAS } from "../lib/rutas";
import { Badge } from "./Badge";
import { EnlaceBoton } from "./EnlaceBoton";
import { Tarjeta } from "./Tarjeta";

export function TarjetaEvento({ evento }: { evento: Evento }) {
  return (
    <Tarjeta className="flex h-full flex-col">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-slate-400">
          {ETIQUETA_CATEGORIA[evento.category]}
        </span>
        <Badge tono={evento.status}>{ETIQUETA_ESTADO[evento.status]}</Badge>
      </div>
      <h2 className="font-titulo text-lg font-bold">{evento.name}</h2>
      <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
        {formatearFechaHora(evento.eventDate)}
      </p>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        {evento.sede.name} · {evento.sede.city}
      </p>
      {evento.artistas.length > 0 ? (
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Con {evento.artistas.map((a) => a.stageName).join(", ")}
        </p>
      ) : null}
      <div className="mt-auto pt-4">
        <EnlaceBoton variante="secundario" to={RUTAS.evento(evento.eventCode)}>
          Ver detalle
        </EnlaceBoton>
      </div>
    </Tarjeta>
  );
}
