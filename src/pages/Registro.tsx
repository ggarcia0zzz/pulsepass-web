import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { registrar } from "../api/auth";
import { Campo } from "../componentes/Campo";
import { Boton } from "../componentes/Boton";
import { Tarjeta } from "../componentes/Tarjeta";
import { RUTAS } from "../lib/rutas";
const schema = z.object({
  username: z.string().regex(/^[A-Za-z0-9._-]{3,50}$/),
  email: z.string().email().max(150),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  birthDate: z
    .string()
    .refine((v) => !!v && new Date(v) < new Date(), "Fecha anterior a hoy"),
  password: z
    .string()
    .min(12)
    .max(72)
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/),
  phone: z.string().max(30),
  city: z.string().max(100),
});
export default function Registro() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-bold">Crear cuenta</h1>
      <Tarjeta>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(async (d) => {
            try {
              await registrar(d);
              nav(RUTAS.login, { state: { registrado: true } });
            } catch (e) {
              setError("root", {
                message: e instanceof Error ? e.message : "Error",
              });
            }
          })}
        >
          {errors.root && <p role="alert">{errors.root.message}</p>}
          <Campo
            etiqueta="Usuario"
            {...register("username")}
            error={errors.username?.message}
          />
          <Campo
            etiqueta="Correo"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <Campo
            etiqueta="Nombres"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <Campo
            etiqueta="Apellidos"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
          <Campo
            etiqueta="Nacimiento"
            type="date"
            {...register("birthDate")}
            error={errors.birthDate?.message}
          />
          <Campo etiqueta="Teléfono (opcional)" {...register("phone")} />
          <Campo etiqueta="Ciudad (opcional)" {...register("city")} />
          <Campo
            etiqueta="Contraseña (12 caracteres, letras y números)"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />
          <Boton type="submit" cargando={isSubmitting}>
            Registrarse
          </Boton>
        </form>
      </Tarjeta>
    </div>
  );
}
