import { z } from "zod";
import { http } from "./cliente";
import { EventoSchema, Categoria } from "./catalogo";
export const Tipo = z.enum(["GENERAL", "VIP", "BACKSTAGE", "STUDENT"]);
export const TicketSchema = z.object({
  ticketCode: z.string(),
  type: Tipo,
  status: z.enum(["RESERVED", "PAID", "CANCELLED", "USED"]),
  price: z.number(),
  purchaseDate: z.string(),
  eventCode: z.string(),
  eventName: z.string(),
  eventDate: z.string(),
  userEmail: z.string(),
});
export type Ticket = z.infer<typeof TicketSchema>;
const path = (code: string) => "/api/tickets/" + encodeURIComponent(code);
const event = (code: string) => "/api/events/" + encodeURIComponent(code);
export const comprar = (
  userEmail: string,
  eventCode: string,
  type: z.infer<typeof Tipo>,
) =>
  http("/api/tickets", TicketSchema, {
    method: "POST",
    body: JSON.stringify({ userEmail, eventCode, type }),
  });
export const tickets = (email: string) =>
  http(
    "/api/tickets/by-user?email=" + encodeURIComponent(email),
    z.array(TicketSchema),
  );
export const ticket = (code: string) => http(path(code), TicketSchema);
export const cancelar = (code: string) =>
  http(path(code) + "/cancel", TicketSchema, { method: "PATCH" });
export const usar = (code: string) =>
  http(path(code) + "/use", TicketSchema, { method: "PATCH" });
export const pagados = (code: string) =>
  http(event(code) + "/tickets/paid", z.array(TicketSchema));
export const EventoForm = z.object({
  eventCode: z
    .string()
    .regex(/^[A-Za-z0-9_-]+$/)
    .max(50),
  name: z.string().min(1).max(200),
  description: z.string().max(1000),
  category: Categoria,
  eventDate: z.string().min(1),
  minimumAge: z.coerce.number().int().min(0).max(120),
  venueCode: z.string().min(1),
});
export const crear = (data: unknown) =>
  http("/api/events", EventoSchema, {
    method: "POST",
    body: JSON.stringify(EventoForm.parse(data)),
  });
export const publicar = (code: string) =>
  http(event(code) + "/publish", EventoSchema, { method: "PATCH" });
export const asociar = (code: string, id: number) =>
  http(event(code) + "/artists/" + id, EventoSchema, { method: "POST" });
