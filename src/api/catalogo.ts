import { z } from "zod";
import { http } from "./cliente";
export const Categoria = z.enum([
  "MUSIC",
  "SPORTS",
  "TECHNOLOGY",
  "EDUCATION",
  "CULTURE",
  "ENTERTAINMENT",
]);
export const SedeSchema = z.object({
  code: z.string(),
  name: z.string(),
  city: z.string(),
  address: z.string(),
  capacity: z.number(),
  active: z.boolean(),
});
export const ArtistaSchema = z.object({
  id: z.number(),
  stageName: z.string(),
  genre: z
    .string()
    .nullable()
    .transform((v) => v ?? ""),
  country: z
    .string()
    .nullable()
    .transform((v) => v ?? ""),
  active: z.boolean(),
});
export const EventoSchema = z
  .object({
    eventCode: z.string(),
    name: z.string(),
    description: z
      .string()
      .nullable()
      .transform((v) => v ?? ""),
    category: Categoria,
    status: z.enum(["DRAFT", "PUBLISHED", "SOLD_OUT", "CANCELLED", "FINISHED"]),
    eventDate: z.string(),
    minimumAge: z.number(),
    streamingUrl: z.string().nullable(),
    venue: SedeSchema,
    artists: z.array(ArtistaSchema),
  })
  .transform(({ venue, artists, ...e }) => ({
    ...e,
    sede: venue,
    artistas: artists,
  }));
export const listarEventos = () =>
  http("/api/events/published", z.array(EventoSchema));
export const listarEventosAdmin = () =>
  http("/api/events", z.array(EventoSchema));
export const obtenerEvento = (code: string) =>
  http("/api/events/" + encodeURIComponent(code), EventoSchema);
export const listarArtistas = () =>
  http("/api/artists/active", z.array(ArtistaSchema));
export const obtenerArtista = (id: number) =>
  http("/api/artists/" + id, ArtistaSchema);
export const listarSedes = () =>
  http("/api/venues/active", z.array(SedeSchema));
export const obtenerSede = (code: string) =>
  http("/api/venues/" + encodeURIComponent(code), SedeSchema);
export const eventosPorArtista = (name: string) =>
  http(
    "/api/events/by-artist?stageName=" + encodeURIComponent(name),
    z.array(EventoSchema),
  );
export const artistaPorNombre = (name: string) =>
  http(
    "/api/artists/by-stage-name?stageName=" + encodeURIComponent(name),
    ArtistaSchema,
  );
