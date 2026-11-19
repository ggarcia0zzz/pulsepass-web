import { useState } from "react";
import { useNavigate } from "react-router";
import { Campo } from "../componentes/Campo";
import { Boton } from "../componentes/Boton";
import { EnlaceBoton } from "../componentes/EnlaceBoton";
import { RUTAS } from "../lib/rutas";
export default function AdminEventos() {
  const [code, setCode] = useState("");
  const nav = useNavigate();
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">Administrar eventos</h1>
      <EnlaceBoton to={RUTAS.adminNuevo}>Crear evento</EnlaceBoton>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          nav(RUTAS.adminEvento(code.trim()));
        }}
      >
        <Campo
          etiqueta="Código de evento"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Boton type="submit">Gestionar evento</Boton>
      </form>
    </div>
  );
}
