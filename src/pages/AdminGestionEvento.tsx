import { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { obtenerEvento, listarArtistas } from "../api/catalogo";
import { publicar, asociar } from "../api/operaciones";
import { Boton } from "../componentes/Boton";
import { Badge } from "../componentes/Badge";
import { Selector } from "../componentes/Selector";
import { Tarjeta } from "../componentes/Tarjeta";
import { Modal } from "../componentes/Modal";
export default function AdminGestionEvento() {
  const { eventCode = "" } = useParams();
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["evento", eventCode],
    queryFn: () => obtenerEvento(eventCode),
  });
  const a = useQuery({ queryKey: ["artistas"], queryFn: listarArtistas });
  const actualizar = () => {
    void q.refetch();
    void qc.invalidateQueries({ queryKey: ["eventos"] });
  };
  const p = useMutation({
    mutationFn: () => publicar(eventCode),
    onSuccess: () => {
      setOpen(false);
      actualizar();
    },
  });
  const m = useMutation({
    mutationFn: () => asociar(eventCode, Number(id)),
    onSuccess: actualizar,
  });
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">Gestionar evento</h1>
      {q.isPending ? (
        "Cargando…"
      ) : q.isError ? (
        <button onClick={() => q.refetch()}>
          {q.error.message}. Reintentar
        </button>
      ) : (
        <Tarjeta>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{q.data.name}</h2>
            <p className="font-mono">{eventCode}</p>
            <Badge tono={q.data.status} />
            <p>{q.data.description}</p>
            <p>{q.data.sede.name}</p>
            {q.data.status === "DRAFT" && (
              <Boton onClick={() => setOpen(true)}>Publicar</Boton>
            )}
            <h3 className="font-bold">Artistas asociados</h3>
            <ul>
              {q.data.artistas.map((x) => (
                <li key={x.id}>{x.stageName}</li>
              ))}
            </ul>
            <Selector
              etiqueta="Asociar artista"
              value={id}
              onChange={(e) => setId(e.target.value)}
            >
              <option value="">Seleccione</option>
              {a.data?.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.stageName}
                </option>
              ))}
            </Selector>
            {a.isError && (
              <button onClick={() => a.refetch()}>Reintentar artistas</button>
            )}
            <Boton
              disabled={!id}
              cargando={m.isPending}
              onClick={() => m.mutate()}
            >
              Asociar
            </Boton>
            {m.isError && <p role="alert">{m.error.message}</p>}
            {m.isSuccess && <p role="status">Artista asociado</p>}
          </div>
        </Tarjeta>
      )}
      <Modal
        abierto={open}
        titulo="Publicar evento"
        onCerrar={() => setOpen(false)}
      >
        <p>¿Confirmas la publicación?</p>
        {p.isError && <p role="alert">{p.error.message}</p>}
        <Boton cargando={p.isPending} onClick={() => p.mutate()}>
          Confirmar
        </Boton>
        <Boton variante="secundario" onClick={() => setOpen(false)}>
          Volver
        </Boton>
      </Modal>
    </div>
  );
}
