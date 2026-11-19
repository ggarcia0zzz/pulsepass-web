import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { Aviso } from '../componentes/Aviso'
import { Boton } from '../componentes/Boton'
import { Campo } from '../componentes/Campo'
import { Tarjeta } from '../componentes/Tarjeta'
import { useAuth } from '../funcionalidades/auth/hooks'
import { RUTAS } from '../lib/rutas'

interface DatosLogin {
    email: string
    password: string
}

export default function Login() {
    const { iniciarSesion } = useAuth()
    const [errorServidor, setErrorServidor] = useState<string | null>(null)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<DatosLogin>()

    // Al iniciar sesión, SoloAnonimo redirige solo a la página de origen (o al inicio).
    const enviar = async (datos: DatosLogin) => {
        setErrorServidor(null)
        try {
            await iniciarSesion(datos.email, datos.password)
        } catch (e) {
            setErrorServidor(e instanceof Error ? e.message : 'No se pudo iniciar sesión')
        }
    }

    return (
        <div className="mx-auto max-w-md">
            <h1 className="mb-6 font-titulo text-2xl font-bold">Ingresar</h1>
            <Tarjeta>
                <form onSubmit={handleSubmit(enviar)} noValidate className="space-y-4">
                    {errorServidor ? <Aviso tipo="error">{errorServidor}</Aviso> : null}
                    <Campo
                        etiqueta="Correo"
                        type="email"
                        autoComplete="email"
                        error={errors.email?.message}
                        {...register('email', { required: 'Escribe tu correo' })}
                    />
                    <Campo
                        etiqueta="Contraseña"
                        type="password"
                        autoComplete="current-password"
                        error={errors.password?.message}
                        {...register('password', { required: 'Escribe tu contraseña' })}
                    />
                    <Boton type="submit" cargando={isSubmitting} className="w-full">
                        Ingresar
                    </Boton>
                </form>
                <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
                    ¿No tienes cuenta?{' '}
                    <Link to={RUTAS.registro} className="font-medium text-marca-700 underline dark:text-marca-500">
                        Regístrate
                    </Link>
                </p>
            </Tarjeta>
            {import.meta.env.DEV ? (
                <div className="mt-4">
                    <Aviso tipo="info">
                        Cuentas de prueba (clave <strong>Clave123*</strong>): user@pulsepass.test,
                        staff@pulsepass.test, admin@pulsepass.test
                    </Aviso>
                </div>
            ) : null}
        </div>
    )
}
