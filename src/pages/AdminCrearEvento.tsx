import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { listarSedes, Categoria } from "../api/catalogo";
import { crear } from "../api/operaciones";
import { Campo } from "../componentes/Campo";
import { Selector } from "../componentes/Selector";
import { Boton } from "../componentes/Boton";
import { Tarjeta } from "../componentes/Tarjeta";
import { RUTAS } from "../lib/rutas";
export default function AdminCrearEvento() {
  const nav = useNavigate();
  const q = useQuery({ queryKey: ["sedes"], queryFn: listarSedes });
  const m = useMutation({
    mutationFn: crear,
    onSuccess: (e) => nav(RUTAS.adminEvento(e.eventCode)),
  });
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">Crear evento</h1>
      <Tarjeta>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            m.mutate(Object.fromEntries(new FormData(e.currentTarget)));
          }}
        >
          <Campo etiqueta="Código" name="eventCode" required maxLength={50} />
          <Campo etiqueta="Nombre" name="name" required maxLength={200} />
          <Campo etiqueta="Descripción" name="description" maxLength={1000} />
          <Selector etiqueta="Categoría" name="category">
            {Categoria.options.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </Selector>
          <Campo
            etiqueta="Fecha y hora"
            name="eventDate"
            type="datetime-local"
            required
          />
          <Campo
            etiqueta="Edad mínima"
            name="minimumAge"
            type="number"
            min={0}
            max={120}
            defaultValue={0}
            required
          />
          <Selector etiqueta="Sede" name="venueCode" required>
            <option value="">Seleccione</option>
            {q.data?.map((s) => (
              <option value={s.code} key={s.code}>
                {s.name}
              </option>
            ))}
          </Selector>
          {q.isError && (
            <button type="button" onClick={() => q.refetch()}>
              Error al cargar sedes. Reintentar
            </button>
          )}
          {m.isError && <p role="alert">{m.error.message}</p>}
          <Boton
            type="submit"
            disabled={!q.data?.length}
            cargando={m.isPending}
          >
            Crear evento
          </Boton>
        </form>
      </Tarjeta>
    </div>
  );
}
