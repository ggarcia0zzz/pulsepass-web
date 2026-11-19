import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ticket } from "../api/operaciones";
import { TicketVista } from "../componentes/TicketVista";
export default function ConfirmacionCompra() {
  const { ticketCode = "" } = useParams();
  const q = useQuery({
    queryKey: ["ticket", ticketCode],
    queryFn: () => ticket(ticketCode),
  });
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Compra confirmada</h1>
      {q.isPending ? (
        "Cargando…"
      ) : q.isError ? (
        <button onClick={() => q.refetch()}>
          {q.error.message}. Reintentar
        </button>
      ) : (
        <TicketVista t={q.data} />
      )}
    </div>
  );
}
