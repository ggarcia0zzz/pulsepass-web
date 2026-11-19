import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { iniciarSesionApi, me } from "../../api/auth";
import { storedSession, TOKEN_KEY } from "../../lib/http";
import { queryClient } from "../../lib/queryClient";
import { AuthContext } from "./contexto";
import { rolEfectivo } from "./roles";
import type { Rol, Sesion } from "./tipos";
export function AuthProvider({
  children,
  sesionInicial,
}: {
  children: ReactNode;
  sesionInicial?: Sesion;
}) {
  const [sesion, setSesion] = useState<Sesion>(
    sesionInicial ?? { estado: "cargando" },
  );
  const cerrarSesion = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    queryClient.clear();
    setSesion({ estado: "anonimo" });
  }, []);
  useEffect(() => {
    if (sesionInicial) return;
    const saved = storedSession();
    let active = true;
    if (!saved || saved.expiraEn <= Date.now()) {
      cerrarSesion();
      return;
    }
    me(saved.token)
      .then((usuario) => {
        if (active) setSesion({ estado: "autenticado", ...saved, usuario });
      })
      .catch(() => {
        if (active) cerrarSesion();
      });
    return () => {
      active = false;
    };
  }, [sesionInicial, cerrarSesion]);
  useEffect(() => {
    window.addEventListener("pulsepass:expired", cerrarSesion);
    return () => window.removeEventListener("pulsepass:expired", cerrarSesion);
  }, [cerrarSesion]);
  useEffect(() => {
    if (sesion.estado === "autenticado") {
      const timer = setTimeout(
        cerrarSesion,
        Math.max(0, sesion.expiraEn - Date.now()),
      );
      return () => clearTimeout(timer);
    }
  }, [sesion, cerrarSesion]);
  const iniciarSesion = async (email: string, password: string) => {
    const r = await iniciarSesionApi(email, password);
    queryClient.clear();
    sessionStorage.setItem(
      TOKEN_KEY,
      JSON.stringify({ token: r.token, expiraEn: r.expiraEn }),
    );
    setSesion({ estado: "autenticado", ...r });
  };
  const tieneRol = (...roles: Rol[]) =>
    sesion.estado === "autenticado" &&
    roles.includes(rolEfectivo(sesion.usuario.roles));
  return (
    <AuthContext value={{ sesion, iniciarSesion, cerrarSesion, tieneRol }}>
      {children}
    </AuthContext>
  );
}
