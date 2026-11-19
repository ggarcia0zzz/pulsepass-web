import { ApiError } from "../api/cliente";
import { EstadoError } from "./EstadoError";

interface ErrorDeCargaProps {
  error: unknown;
  mensajeNoExiste: string;
  onReintentar: () => void;
}

/** Muestra "no existe" para un 404 y un error genérico con reintento para el resto. */
export function ErrorDeCarga({
  error,
  mensajeNoExiste,
  onReintentar,
}: ErrorDeCargaProps) {
  const noExiste = error instanceof ApiError && error.status === 404;
  return (
    <EstadoError
      mensaje={noExiste ? mensajeNoExiste : "No pudimos cargar la información."}
      onReintentar={noExiste ? undefined : onReintentar}
    />
  );
}
