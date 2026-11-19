import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { listarEventosAdmin } from "../api/catalogo";
import { Campo } from "../componentes/Campo";
import { Selector } from "../componentes/Selector";
import { Boton } from "../componentes/Boton";
import { Badge } from "../componentes/Badge";
import { Tarjeta } from "../componentes/Tarjeta";
import { EnlaceBoton } from "../componentes/EnlaceBoton";
import { CodigoEvento } from "../componentes/CodigoEvento";
import { ETIQUETA_ESTADO, ETIQUETA_CATEGORIA, normalizar, formatearFechaHora } from "../lib/formato";
import { RUTAS } from "../lib/rutas";

export default function AdminEventos() {
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("");
  const q = useQuery({ queryKey: ["eventos", "admin"], queryFn: listarEventosAdmin });
  const eventos = (q.data ?? []).filter((e) =>
    normalizar(`${e.name} ${e.eventCode}`).includes(normalizar(busqueda.trim())) &&
    (!estado || e.status === estado),
  );
  return (
    <div className="pp-panel space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="font-titulo text-3xl font-bold">Administrar eventos</h1><p className="text-slate-400">Consulta y gestiona todos los eventos de PulsePass.</p></div>
        <EnlaceBoton to={RUTAS.adminNuevo}>+ Crear evento</EnlaceBoton>
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        <Campo etiqueta="Buscar evento" type="search" placeholder="Nombre o código" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        <Selector etiqueta="Estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Todos los estados</option>
          {Object.entries(ETIQUETA_ESTADO).map(([key, label]) => <option key={key} value={key}>{key === "PUBLISHED" ? "Publicado" : label}</option>)}
        </Selector>
      </div>
      {q.isPending ? <p role="status">Cargando eventos…</p> : q.isError ? (
        <div role="alert" className="space-y-3"><p>{q.error.message}</p><Boton onClick={() => q.refetch()}>Reintentar</Boton></div>
      ) : (
        <>
          <p role="status" className="text-sm text-slate-400">{eventos.length} de {q.data.length} eventos</p>
          {!eventos.length && <p>No hay eventos que coincidan con la búsqueda.</p>}
          <div className="grid gap-4 lg:grid-cols-2">
            {eventos.map((e) => (
              <Tarjeta key={e.eventCode} className="space-y-4 min-w-0">
                <div className="pp-poster" data-category={e.category}><span className="font-bold text-white">{ETIQUETA_CATEGORIA[e.category]}</span></div>
                <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-xl font-bold break-words">{e.name}</h2><Badge tono={e.status}>{e.status === "PUBLISHED" ? "Publicado" : ETIQUETA_ESTADO[e.status]}</Badge></div>
                <p>{e.sede.name} · {e.sede.city}</p><p className="text-sm text-slate-400">{formatearFechaHora(e.eventDate)}</p>
                <CodigoEvento codigo={e.eventCode} />
                <div className="flex flex-wrap gap-2"><EnlaceBoton to={RUTAS.adminEvento(encodeURIComponent(e.eventCode))}>Administrar evento</EnlaceBoton><EnlaceBoton variante="secundario" to={RUTAS.evento(encodeURIComponent(e.eventCode))}>Ver evento</EnlaceBoton></div>
              </Tarjeta>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
