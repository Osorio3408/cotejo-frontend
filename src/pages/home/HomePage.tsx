import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { IconBall, IconCalendar, IconSearch } from "@/components/ui/Icons"
import { Pill } from "@/components/ui/Pill"
import BenefitItem from "./components/BenefitItem"

const heroHighlights = [
  "Reserva en minutos, sin llamadas ni vueltas.",
  "Encuentra canchas confiables segun ciudad, deporte y presupuesto.",
  "Disena el plan perfecto para jugar con tu parche.",
]

const stats = [
  { value: "500+", label: "canchas activas" },
  { value: "4.8/5", label: "calificacion promedio" },
  { value: "< 2 min", label: "para completar una reserva" },
]

const playerBenefits = [
  "El gol que se celebra como una final.",
  "Las puyas entre amigos que arrancan antes del primer pase.",
  "La tranquilidad de llegar y tener la cancha lista.",
]

const ownerBenefits = [
  "Mas visibilidad para tu cancha sin depender de mensajes manuales.",
  "Disponibilidad organizada para evitar cruces y dobles reservas.",
  "Una experiencia mas clara para convertir visitas en reservas.",
]

const trustPills = [
  "Reserva rapida",
  "Precios claros",
  "Canchas verificadas",
  "Mas clientes para administradores",
  "Disponibilidad organizada",
  "Experiencia sin fricciones",
]

const steps = [
  {
    icon: IconSearch,
    title: "Explora",
    description:
      "Busca por ciudad, deporte y precio para encontrar la opcion ideal.",
  },
  {
    icon: IconCalendar,
    title: "Reserva",
    description:
      "Selecciona la fecha, compara detalles y confirma con confianza.",
  },
  {
    icon: IconBall,
    title: "Juega",
    description:
      "Llega con tu equipo, aprovecha el espacio y enfocate en el partido.",
  },
]

export default function HomePage() {
  return (
    <div className="space-y-16 pb-8 text-gray-200 md:space-y-20">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-8 shadow-2xl shadow-black/10 md:px-10 md:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,196,129,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.06),_transparent_30%)]" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-sm font-medium text-brand-300">
                Reserva canchas con una experiencia simple y confiable
              </span>

              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
                  El partido empieza mucho antes del primer pitazo.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-gray-300 md:text-lg">
                  Cotejo conecta jugadores y administradores en una sola
                  experiencia: descubrir canchas, elegir rapido y reservar sin
                  friccion.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-black/15 px-4 py-4 backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {heroHighlights.map((item) => (
                <BenefitItem key={item}>{item}</BenefitItem>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/fields" className="sm:min-w-48">
                <Button variant="primary" className="h-12 w-full rounded-full">
                  Buscar canchas
                </Button>
              </Link>
              <Link to="/register" className="sm:min-w-48">
                <Button
                  variant="secondary"
                  className="h-12 w-full rounded-full border-white/15 bg-white/8 text-white hover:bg-white/15"
                >
                  Publicar mi cancha
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 p-3 shadow-xl shadow-black/20">
              <div
                className="h-[420px] rounded-[1.5rem] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(18,28,33,0.1) 0%, rgba(18,28,33,0.45) 100%), url('https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1400&auto=format&fit=crop')",
                }}
              />
            </div>

            <div className="absolute -bottom-5 left-4 right-4 rounded-3xl border border-white/10 bg-main-bg/90 p-4 backdrop-blur md:left-auto md:right-6 md:w-80">
              <p className="text-sm font-medium text-brand-300">
                Recomendado para hoy
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white">
                Encuentra canchas listas para reservar en tu ciudad.
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Filtra por deporte, precio y horario para tomar una decision
                rapida y bien informada.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-300">
            Para jugadores
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Menos coordinacion, mas futbol.
          </h2>
          <p className="mt-3 max-w-2xl text-gray-400">
            Encuentra espacios listos para jugar, compara opciones rapido y
            arma el plan con tu equipo sin perder tiempo.
          </p>

          <div className="mt-6 space-y-3">
            {playerBenefits.map((item) => (
              <BenefitItem key={item}>{item}</BenefitItem>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-brand-500/12 via-white/[0.03] to-transparent p-6 md:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-300">
            Para administradores
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Una vitrina mas clara para tu cancha.
          </h2>
          <p className="mt-3 max-w-2xl text-gray-400">
            Muestra tu cancha a mas personas, destaca tus horarios y facilita
            que te encuentren cuando quieren reservar.
          </p>

          <div className="mt-6 space-y-3">
            {ownerBenefits.map((item) => (
              <BenefitItem key={item}>{item}</BenefitItem>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-300">
            Beneficios
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            Todo lo que necesitas para reservar con confianza.
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {trustPills.map((item) => (
            <Pill key={item}>{item}</Pill>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-300">
            Como funciona
          </p>
          <h2 className="text-3xl font-semibold text-white">
            Tres pasos para pasar de la idea al partido.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-brand-500/30 hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/12 text-brand-300">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-medium text-gray-500">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-400">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-brand-500/16 via-brand-500/8 to-white/[0.03] px-6 py-8 md:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-200">
              Empieza hoy
            </p>
            <h2 className="text-3xl font-semibold text-white">
              Encuentra la cancha ideal para tu proximo cotejo.
            </h2>
            <p className="text-gray-300">
              Explora opciones disponibles o publica tu espacio para recibir
              nuevas reservas.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/fields">
              <Button variant="primary" className="h-12 rounded-full px-6">
                Ver canchas disponibles
              </Button>
            </Link>
            <Link to="/register">
              <Button
                variant="secondary"
                className="h-12 rounded-full border-white/15 bg-white/10 px-6 text-white hover:bg-white/15"
              >
                Crear perfil de cancha
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
