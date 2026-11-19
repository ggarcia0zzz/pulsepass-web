import { useState } from "react";
import { Boton } from "./Boton";

export function CodigoEvento({ codigo }: { codigo: string }) {
  const [mensaje, setMensaje] = useState("");
  async function copiar() {
    try {
      await navigator.clipboard.writeText(codigo);
      setMensaje("Código copiado");
    } catch {
      setMensaje("No se pudo copiar. Selecciona el código manualmente.");
    }
  }
  return <div className="space-y-1">
    <span className="text-sm font-semibold">Código del evento</span>
    <div className="flex flex-wrap items-center gap-2">
      <code className="select-all break-all rounded-lg bg-slate-900 px-3 py-2 text-violet-300">{codigo}</code>
      <Boton variante="secundario" onClick={() => void copiar()}>Copiar código</Boton>
    </div>
    <p role="status" className="text-sm text-slate-400">{mensaje}</p>
  </div>;
}
