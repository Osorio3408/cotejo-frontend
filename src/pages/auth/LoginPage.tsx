import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { AuthInput } from "@/components/ui/AuthInput"
import GoogleButton from "@/components/ui/GoogleButton"

export default function LoginPage() {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: integrar useAuth() + react-query
  }

  return (
    <div className="min-h-[70vh] grid place-items-start pt-10">
      <div className="w-full max-w-xl mx-auto">
        <h1 className="text-center text-3xl md:text-4xl font-extrabold text-white mb-8">
          Bienvenido a <span className="text-brand-500">Cotejo</span>
        </h1>

        <form onSubmit={onSubmit} className="grid gap-5">
          <AuthInput
            label="Correo electrónico"
            type="email"
            placeholder="cotejo@ejemplo.com"
            required
          />

          <AuthInput
            label="Password"
            type="password"
            placeholder="********"
            required
          />

          <Button
            type="submit"
            className="h-12 rounded-full w-full"
            variant="primary"
          >
            Iniciar sesión
          </Button>

          <div className="text-center text-gray-500 text-sm select-none">o</div>

          <GoogleButton type="button" />

          <p className="text-center text-sm text-gray-400">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-gray-300 underline decoration-white/20 hover:text-white">
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
