import { useState } from "react";
import { useAuth } from "../funcionalidades/auth/hooks";
import { useQuery } from "@tanstack/react-query";
import { usuarioPorEmail, usuarioPorNombre } from "../api/auth";
import { Tarjeta } from "../componentes/Tarjeta";
export default function Cuenta() {
  const { sesion } = useAuth();
  const email = sesion.estado === "autenticado" ? sesion.usuario.email : "";
  const q = useQuery({
    queryKey: ["cuenta", email],
    queryFn: () => usuarioPorEmail(email),
    enabled: !!email,
  });
  const [nombre, setNombre] = useState(false);
  const u = useQuery({
    queryKey: ["cuenta-nombre", email],
    queryFn: () =>
      usuarioPorNombre(
        sesion.estado === "autenticado" ? sesion.usuario.username : "",
      ),
    enabled: nombre && !!email,
  });
  return (
    <Tarjeta>
      <h1 className="text-2xl font-bold">Mi cuenta</h1>
      {q.isPending ? (
        "Cargando…"
      ) : q.isError ? (
        <button onClick={() => q.refetch()}>Reintentar</button>
      ) : (
        <dl className="space-y-3 mt-4">
          {Object.entries(q.data).map(([k, v]) => (
            <div key={k}>
              <dt className="font-semibold">{k}</dt>
              <dd>{Array.isArray(v) ? v.join(", ") : String(v ?? "—")}</dd>
            </div>
          ))}
        </dl>
      )}
      <button className="mt-4 underline" onClick={() => setNombre(true)}>
        Verificar usuario por nombre
      </button>
      {nombre &&
        (u.isPending
          ? "Cargando…"
          : u.isError
            ? u.error.message
            : u.data.username)}
    </Tarjeta>
  );
}
