import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ticket, usar } from "../api/operaciones";
import { Campo } from "../componentes/Campo";
import { Boton } from "../componentes/Boton";
import { TicketVista } from "../componentes/TicketVista";
export default function ValidacionIngreso() {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const q = useQuery({
    queryKey: ["ticket", code],
    queryFn: () => ticket(code),
    enabled: !!code,
  });
  const m = useMutation({
    mutationFn: () => usar(code),
    onSuccess: () => {
      void q.refetch();
    },
  });
  return (
    <div className="pp-panel mx-auto max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Validar ingreso</h1>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          m.reset();
          setCode(input.trim());
          if (code === input.trim()) void q.refetch();
        }}
      >
        <Campo
          etiqueta="Código de ticket"
          value={input}
          required
          onChange={(e) => setInput(e.target.value)}
        />
        <Boton type="submit">Buscar</Boton>
      </form>
      {code &&
        (q.isPending ? (
          "Cargando…"
        ) : q.isError ? (
          <p role="alert">{q.error.message}</p>
        ) : (
          <>
            <TicketVista t={q.data} />
            <Boton
              disabled={q.data.status !== "PAID"}
              cargando={m.isPending}
              onClick={() => m.mutate()}
            >
              Marcar como usado
            </Boton>
          </>
        ))}
      {m.isSuccess && <p role="status">Ingreso registrado</p>}
      {m.isError && <p role="alert">{m.error.message}</p>}
    </div>
  );
}
