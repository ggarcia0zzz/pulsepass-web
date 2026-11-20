import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router";
import { comprar, Tipo } from "../api/operaciones";
import type { Evento } from "../api/tipos";
import { useAuth } from "../funcionalidades/auth/hooks";
import { RUTAS } from "../lib/rutas";
import { Boton } from "./Boton";
import { Selector } from "./Selector";
import { Modal } from "./Modal";
export function Compra({ evento }: { evento: Evento }) {
  const { sesion, tieneRol } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState("GENERAL" as (typeof Tipo.options)[number]);
  const m = useMutation({
    mutationFn: () =>
      comprar(
        sesion.estado === "autenticado" ? sesion.usuario.email : "",
        evento.eventCode,
        tipo,
      ),
    onSuccess: (t) => {
      void qc.invalidateQueries({ queryKey: ["tickets"] });
      void qc.invalidateQueries({ queryKey: ["evento"] });
      nav(RUTAS.confirmacion(t.ticketCode));
    },
  });
  return (
    <div className="space-y-3">
      {(sesion.estado === "anonimo" || tieneRol("USER")) && (
        <Boton
          disabled={evento.status !== "PUBLISHED"}
          onClick={() =>
            sesion.estado === "anonimo"
              ? nav(RUTAS.login, { state: { desde: loc.pathname } })
              : setOpen(true)
          }
        >
          Comprar entrada
        </Boton>
      )}
      <Modal
        abierto={open}
        titulo="Comprar entrada"
        onCerrar={() => {
          if (!m.isPending) setOpen(false);
        }}
      >
        <Selector
          etiqueta="Tipo de entrada"
          value={tipo}
          onChange={(e) => setTipo(Tipo.parse(e.target.value))}
        >
          {Tipo.options.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </Selector>
        {m.isError && (
          <p role="alert" className="text-red-600">
            {m.error.message}
          </p>
        )}
        <div className="mt-4 flex gap-2">
          <Boton cargando={m.isPending} onClick={() => m.mutate()}>
            Confirmar compra
          </Boton>
          <Boton
            variante="secundario"
            disabled={m.isPending}
            onClick={() => setOpen(false)}
          >
            Volver
          </Boton>
        </div>
      </Modal>
    </div>
  );
}
