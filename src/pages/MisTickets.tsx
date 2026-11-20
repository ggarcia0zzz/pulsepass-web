import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { tickets } from "../api/operaciones";
import { useAuth } from "../funcionalidades/auth/hooks";
import { TicketVista } from "../componentes/TicketVista";
export default function MisTickets() {
  const { sesion } = useAuth();
  const email = sesion.estado === "autenticado" ? sesion.usuario.email : "";
  const q = useQuery({
    queryKey: ["tickets", email],
    queryFn: () => tickets(email),
    enabled: !!email,
  });
  const [f, setF] = useState("");
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Mis tickets</h1>
      <div className="flex flex-wrap gap-3">
        {["", "PAID", "USED", "CANCELLED", "RESERVED"].map((x) => (
          <button
            className="rounded-full border px-4 py-2"
            key={x}
            aria-pressed={f === x}
            onClick={() => setF(x)}
          >
            {x || "Todos"}
          </button>
        ))}
      </div>
      {q.isPending ? (
        "Cargando…"
      ) : q.isError ? (
        <button onClick={() => q.refetch()}>
          Error: {q.error.message}. Reintentar
        </button>
      ) : q.data.filter((t) => !f || t.status === f).length === 0 ? (
        "No hay tickets"
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {q.data
            .filter((t) => !f || t.status === f)
            .map((t) => (
              <TicketVista key={t.ticketCode} t={t} acciones />
            ))}
        </div>
      )}
    </div>
  );
}
