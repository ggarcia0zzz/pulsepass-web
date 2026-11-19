import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { pagados } from "../api/operaciones";
import { Campo } from "../componentes/Campo";
import { Boton } from "../componentes/Boton";
import { TicketVista } from "../componentes/TicketVista";
import { RUTAS } from "../lib/rutas";
export default function TicketsPagadosEvento() {
  const { eventCode = "" } = useParams();
  const [input, setInput] = useState(eventCode);
  const nav = useNavigate();
  const q = useQuery({
    queryKey: ["pagados", eventCode],
    queryFn: () => pagados(eventCode),
    enabled: !!eventCode,
  });
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Tickets pagados</h1>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          nav(RUTAS.ticketsPagados(input.trim()));
        }}
      >
        <Campo
          etiqueta="Código de evento"
          value={input}
          required
          onChange={(e) => setInput(e.target.value)}
        />
        <Boton type="submit">Consultar</Boton>
      </form>
      {eventCode &&
        (q.isPending ? (
          "Cargando…"
        ) : q.isError ? (
          <p role="alert">{q.error.message}</p>
        ) : q.data.length === 0 ? (
          "No hay tickets pagados"
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {q.data.map((t) => (
              <TicketVista key={t.ticketCode} t={t} />
            ))}
          </div>
        ))}
    </div>
  );
}
