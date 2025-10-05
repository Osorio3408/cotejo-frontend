import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { AuthInput } from "@/components/ui/AuthInput"
import GoogleButton from "@/components/ui/GoogleButton"

export default function RegisterPage() {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: llamar a /auth/register con react-query + zod
  }

  return (
    <div className="min-h-[70vh] grid place-items-start pt-10">
      <div className="w-full max-w-xl mx-auto">
        <h1 className="text-center text-3xl md:text-4xl font-extrabold text-white mb-8">
          Crea tu cuenta para <span className="text-brand-500">Cotejo</span>
        </h1>

        <form onSubmit={onSubmit} className="grid gap-5">
          <AuthInput label="Nombre completo" placeholder="Juan Pérez" required />
          <AuthInput label="Correo electrónico" type="email" placeholder="cotejo@ejemplo.com" required />
          <AuthInput label="Contraseña" type="password" placeholder="********" required />

          <Button type="submit" className="h-12 rounded-full w-full">
            Registrarse
          </Button>

          <div className="text-center text-gray-500 text-sm select-none">o</div>

          <GoogleButton type="button">
            Registrarse con Google
          </GoogleButton>

          <p className="text-center text-sm text-gray-400">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-gray-300 underline decoration-white/20 hover:text-white">
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
