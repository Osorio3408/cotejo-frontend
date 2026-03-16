import { useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { CreditCard, LockKeyhole, ShieldCheck, UserRound } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { AuthInput } from "@/components/ui/AuthInput"

type BookingMode = "guest" | "account"

function formatPrice(value: number) {
  return `$${value.toLocaleString("es-CO")}`
}

export default function BookingCheckoutPage() {
  const [searchParams] = useSearchParams()
  const [mode, setMode] = useState<BookingMode>("guest")
  const [paid, setPaid] = useState(false)

  const booking = useMemo(() => {
    const price = Number(searchParams.get("price") || 0)
    return {
      field: searchParams.get("field") || "Cancha seleccionada",
      date: searchParams.get("date") || "",
      slot: searchParams.get("slot") || "",
      price,
    }
  }, [searchParams])

  const isReady = Boolean(booking.date && booking.slot && booking.price)

  const handleGuestSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setPaid(true)
  }

  if (!isReady) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 py-10">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center">
          <h1 className="text-3xl font-semibold text-white">
            No hay una reserva lista para pagar
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-gray-400">
            Primero elige una cancha, selecciona fecha y horario, y luego
            continua al checkout.
          </p>
          <Link to="/fields" className="mt-6 inline-flex">
            <Button className="h-12 rounded-full px-6">Ver canchas</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-8 md:space-y-10">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-sm text-brand-300">
              <LockKeyhole className="h-4 w-4" />
              Checkout seguro
            </div>
            <h1 className="text-3xl font-semibold text-white md:text-4xl">
              Finaliza tu reserva
            </h1>
            <p className="max-w-2xl text-gray-400">
              Puedes continuar como invitado o crear tu cuenta para guardar tu
              historial y reservar más rápido la próxima vez.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => setMode("guest")}
              className={[
                "rounded-[1.5rem] border p-5 text-left transition",
                mode === "guest"
                  ? "border-brand-400 bg-brand-500/10 shadow-lg shadow-brand-500/10"
                  : "border-white/10 bg-white/[0.03] hover:border-brand-400/30",
              ].join(" ")}
            >
              <div className="inline-flex rounded-xl bg-brand-500/10 p-2 text-brand-300">
                <CreditCard className="h-4 w-4" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">
                Reservar como invitado
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Ideal si quieres pagar rápido sin crear cuenta.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setMode("account")}
              className={[
                "rounded-[1.5rem] border p-5 text-left transition",
                mode === "account"
                  ? "border-brand-400 bg-brand-500/10 shadow-lg shadow-brand-500/10"
                  : "border-white/10 bg-white/[0.03] hover:border-brand-400/30",
              ].join(" ")}
            >
              <div className="inline-flex rounded-xl bg-brand-500/10 p-2 text-brand-300">
                <UserRound className="h-4 w-4" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">
                Entrar o registrarme
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Útil si quieres guardar reservas, favoritos y datos de pago.
              </p>
            </button>
          </div>

          {mode === "guest" ? (
            <form
              onSubmit={handleGuestSubmit}
              className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
            >
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Datos del invitado
                </h2>
                <p className="mt-2 text-sm text-gray-400">
                  Completa la información básica y paga para confirmar tu
                  reserva sin crear una cuenta.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <AuthInput
                  label="Nombre completo"
                  placeholder="Juan Perez"
                  required
                  className="bg-main-bg text-gray-100 placeholder:text-gray-500"
                />
                <AuthInput
                  label="Correo electronico"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  required
                  className="bg-main-bg text-gray-100 placeholder:text-gray-500"
                />
                <AuthInput
                  label="Telefono"
                  placeholder="300 000 0000"
                  required
                  className="bg-main-bg text-gray-100 placeholder:text-gray-500"
                />
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-black/15 p-5">
                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
                  <CreditCard className="h-4 w-4 text-brand-300" />
                  Datos de pago
                </div>
                <div className="grid gap-4">
                  <AuthInput
                    label="Numero de tarjeta"
                    placeholder="4242 4242 4242 4242"
                    required
                    className="bg-main-bg text-gray-100 placeholder:text-gray-500"
                  />
                  <div className="grid gap-4 md:grid-cols-3">
                    <AuthInput
                      label="Nombre en tarjeta"
                      placeholder="Juan Perez"
                      required
                      className="bg-main-bg text-gray-100 placeholder:text-gray-500"
                    />
                    <AuthInput
                      label="Vencimiento"
                      placeholder="MM/AA"
                      required
                      className="bg-main-bg text-gray-100 placeholder:text-gray-500"
                    />
                    <AuthInput
                      label="CVV"
                      placeholder="123"
                      required
                      className="bg-main-bg text-gray-100 placeholder:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="h-12 w-full rounded-full text-base">
                Pagar y reservar
              </Button>

              {paid && (
                <div className="rounded-2xl border border-brand-400/30 bg-brand-500/10 p-4 text-sm text-brand-100">
                  Reserva confirmada. Se envio un comprobante al correo
                  registrado.
                </div>
              )}
            </form>
          ) : (
            <div className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Continua con tu cuenta
                </h2>
                <p className="mt-2 text-sm text-gray-400">
                  Si ya tienes cuenta puedes iniciar sesión. Si es tu primera
                  reserva, puedes registrarte y luego volver al pago.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Link to="/login">
                  <Button className="h-12 w-full rounded-full" variant="secondary">
                    Iniciar sesion
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="h-12 w-full rounded-full">
                    Crear cuenta
                  </Button>
                </Link>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-black/15 p-5 text-sm text-gray-400">
                Recomendacion: si quieres una experiencia mas rapida y sin
                friccion, puedes terminar esta reserva como invitado y crear tu
                cuenta despues.
              </div>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-20">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-xl shadow-black/10">
            <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(0,196,129,0.16),_transparent_35%)] px-5 py-5">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-300">
                Resumen
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Detalles de la reserva
              </h2>
            </div>

            <div className="space-y-5 px-5 py-5">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/15 p-4">
                <div className="text-sm text-gray-400">Cancha</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  {booking.field}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-black/15 p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Fecha</span>
                    <span className="text-white">{booking.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Horario</span>
                    <span className="text-white">{booking.slot}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="text-gray-400">Total a pagar</span>
                    <span className="text-xl font-semibold text-white">
                      {formatPrice(booking.price)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-400">
                <div className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-300" />
                  Puedes reservar como invitado sin iniciar sesión.
                </div>
                <div className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-300" />
                  Si creas una cuenta, guardas historial y futuras reservas.
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}
