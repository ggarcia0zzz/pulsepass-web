import type { CategoriaEvento, EstadoEvento } from "../api/tipos";

const formatoFechaHora = new Intl.DateTimeFormat("es-CO", {
  dateStyle: "full",
  timeStyle: "short",
});

export function formatearFechaHora(iso: string): string {
  return formatoFechaHora.format(new Date(iso));
}

/** Minúsculas y sin tildes, para buscar sin importar acentos. */
export function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export const ETIQUETA_CATEGORIA: Record<CategoriaEvento, string> = {
  MUSIC: "Música",
  SPORTS: "Deportes",
  TECHNOLOGY: "Tecnología",
  EDUCATION: "Educación",
  CULTURE: "Cultura",
  ENTERTAINMENT: "Entretenimiento",
};

export const ETIQUETA_ESTADO: Record<EstadoEvento, string> = {
  DRAFT: "Borrador",
  PUBLISHED: "Disponible",
  SOLD_OUT: "Agotado",
  CANCELLED: "Cancelado",
  FINISHED: "Finalizado",
};
