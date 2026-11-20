import { z } from "zod";
export class ApiError extends Error {
  status: number;
  details: Record<string, unknown>;
  constructor(
    message: string,
    status: number,
    details: Record<string, unknown> = {},
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}
export const TOKEN_KEY = "pulsepass.session";
export const SessionSchema = z.object({
  token: z.string(),
  expiraEn: z.number(),
});
export function storedSession() {
  try {
    return SessionSchema.parse(
      JSON.parse(sessionStorage.getItem(TOKEN_KEY) ?? "null"),
    );
  } catch {
    return null;
  }
}
export async function http<T>(
  path: string,
  schema: z.ZodType<T>,
  options: RequestInit = {},
  token = storedSession()?.token,
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  let response: Response;
  try {
    response = await fetch(path, { ...options, headers });
  } catch {
    throw new ApiError("No se pudo conectar al servidor", 0);
  }
  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    if (response.status === 401 && token && !path.endsWith("/login"))
      window.dispatchEvent(new Event("pulsepass:expired"));
    const e = z
      .object({
        message: z.string().optional(),
        details: z.record(z.string(), z.unknown()).optional(),
      })
      .safeParse(body);
    throw new ApiError(
      e.success
        ? (e.data.message ?? "Error de solicitud")
        : "Error de solicitud",
      response.status,
      e.success ? e.data.details : {},
    );
  }
  const result = schema.safeParse(body);
  if (!result.success) throw new ApiError("Respuesta inválida del servidor", 0);
  return result.data;
}
