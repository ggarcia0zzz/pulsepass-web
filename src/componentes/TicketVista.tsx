import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { cancelar, type Ticket } from "../api/operaciones";
import { RUTAS } from "../lib/rutas";
import { Badge } from "./Badge";
import { Boton } from "./Boton";
import { Modal } from "./Modal";
import { Tarjeta } from "./Tarjeta";
export function TicketVista({
  t,
  acciones = false,
}: {
  t: Ticket;
  acciones?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();
  const m = useMutation({
    mutationFn: () => cancelar(t.ticketCode),
    onSuccess: () => {
      setOpen(false);
      void qc.invalidateQueries({ queryKey: ["tickets"] });
      void qc.invalidateQueries({ queryKey: ["ticket"] });
    },
  });
  return (
    <Tarjeta className="pp-ticket">
      <div className="space-y-2">
        <h2 className="font-bold">{t.eventName}</h2>
        <p className="font-mono">{t.ticketCode}</p>
        <Badge tono={t.status} />
        <p>
          {t.type} ·{" "}
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
          }).format(t.price)}
        </p>
        <p>Evento: {new Date(t.eventDate).toLocaleString("es-CO")}</p>
        <p>Compra: {new Date(t.purchaseDate).toLocaleString("es-CO")}</p>
        {acciones && (
          <div className="flex flex-wrap items-center gap-3">
            <Link to={RUTAS.ticket(t.ticketCode)}>Ver detalle</Link>
            {t.status === "PAID" && (
              <Boton variante="peligro" onClick={() => setOpen(true)}>
                Cancelar ticket
              </Boton>
            )}
          </div>
        )}
      </div>
      <Modal
        abierto={open}
        titulo="Cancelar ticket"
        onCerrar={() => setOpen(false)}
      >
        <p>¿Confirmas la cancelación?</p>
        {m.isError && <p role="alert">{m.error.message}</p>}
        <Boton
          cargando={m.isPending}
          variante="peligro"
          onClick={() => m.mutate()}
        >
          Confirmar
        </Boton>
        <Boton variante="secundario" onClick={() => setOpen(false)}>
          Volver
        </Boton>
      </Modal>
    </Tarjeta>
  );
}
