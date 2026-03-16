import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  CalendarDays,
  Camera,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Clock3,
  Image as ImageIcon,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Volleyball,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import AmenityChip from "./components/AmenityChip"
import MiniCalendar from "./components/MiniCalendar"
import ProgressBar from "./components/ProgressBar"
import RatingStars from "./components/RatingStars"
import ReviewItem from "./components/ReviewItem"

type FieldDetail = {
  id: string
  name: string
  city: string
  address: string
  description: string
  pricePerHour: number
  rating: number
  reviewsCount: number
  ratingBreakdown: { stars: 5 | 4 | 3 | 2 | 1; pct: number }[]
  amenities: string[]
  surface: string
  images: string[]
}

type SlotMap = Record<string, string[]>

const MOCK: Record<string, FieldDetail> = {
  "1": {
    id: "1",
    name: "Canchas Sinteticas Camp Nou Armenia",
    city: "Armenia, Quindio",
    address: "Carrera 8, Armenia, Quindio",
    description:
      "Cancha amplia, bien iluminada y lista para partidos casuales, entrenamientos o encuentros organizados. El espacio ofrece acceso comodo, ambiente agradable y una superficie ideal para jugar con ritmo y seguridad.",
    pricePerHour: 60000,
    rating: 4.8,
    reviewsCount: 125,
    ratingBreakdown: [
      { stars: 5, pct: 70 },
      { stars: 4, pct: 20 },
      { stars: 3, pct: 5 },
      { stars: 2, pct: 3 },
      { stars: 1, pct: 2 },
    ],
    amenities: [
      "Banos",
      "Balones disponibles",
      "Buena iluminacion",
      "Parqueaderos",
      "Zona de descanso",
      "Acceso facil",
    ],
    surface: "Cancha sintetica 5v5",
    images: [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518604666860-9ed391f76460?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=1600&auto=format&fit=crop",
    ],
  },
}

const bookingHighlights = [
  "Reserva confirmada en pocos pasos.",
  "Horarios disponibles actualizados en tiempo real.",
  "Pago seguro y confirmacion inmediata.",
]

const reviewItems = [
  {
    id: "1",
    author: "Liam Carter",
    date: "Jun 5, 2024",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    text: "Great field! Well-maintained and perfect for our team practice. The lighting was excellent for our evening session.",
  },
  {
    id: "2",
    author: "Sophia Bennett",
    date: "May 24, 2024",
    rating: 4,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    text: "The field was in good condition, but the restrooms could have been cleaner. Overall, a decent experience.",
  },
  {
    id: "3",
    author: "Ethan Harper",
    date: "Apr 10, 2024",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
    text: "Fantastic field! The surface was excellent, and the location was convenient. We had a great time playing here.",
  },
]

function addDays(base: Date, amount: number) {
  const next = new Date(base)
  next.setDate(next.getDate() + amount)
  return next
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

function formatLongDate(date: Date) {
  return new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date)
}

function buildAvailability(base: Date): SlotMap {
  const patterns = [
    ["6:00 p. m.", "7:00 p. m.", "8:00 p. m."],
    ["5:00 p. m.", "6:00 p. m.", "8:00 p. m.", "9:00 p. m."],
    [],
    ["4:00 p. m.", "5:00 p. m.", "7:00 p. m."],
    ["6:00 p. m.", "7:00 p. m."],
    ["8:00 a. m.", "9:00 a. m.", "10:00 a. m.", "6:00 p. m."],
    ["9:00 a. m.", "11:00 a. m.", "4:00 p. m."],
  ]

  return Array.from({ length: 21 }, (_, index) => addDays(base, index + 1)).reduce<SlotMap>(
    (acc, date, index) => {
      const slots = patterns[index % patterns.length]
      if (slots.length > 0) {
        acc[toDateKey(date)] = slots
      }
      return acc
    },
    {}
  )
}

export default function FieldDetailPage() {
  const { id = "1" } = useParams()
  const navigate = useNavigate()
  const data = useMemo(() => MOCK[id] ?? MOCK["1"], [id])
  const availability = useMemo(() => buildAvailability(new Date()), [])
  const availableDates = useMemo(() => Object.keys(availability), [availability])

  const [date, setDate] = useState<Date | null>(null)
  const [slot, setSlot] = useState<string | null>(null)
  const [galleryIndex, setGalleryIndex] = useState(0)

  const selectedDateKey = date ? toDateKey(date) : null
  const availableSlots = selectedDateKey ? availability[selectedDateKey] ?? [] : []
  const reservationReady = Boolean(date && slot)

  useEffect(() => {
    setSlot(null)
  }, [selectedDateKey])

  useEffect(() => {
    setGalleryIndex(0)
  }, [id])

  const goToPreviousSlide = () => {
    setGalleryIndex((current) =>
      current === 0 ? data.images.length - 1 : current - 1
    )
  }

  const goToNextSlide = () => {
    setGalleryIndex((current) =>
      current === data.images.length - 1 ? 0 : current + 1
    )
  }

  const handleCheckout = () => {
    if (!reservationReady || !date || !slot) return

    const params = new URLSearchParams({
      field: data.name,
      date: formatLongDate(date),
      slot,
      price: String(data.pricePerHour),
    })

    navigate(`/booking?${params.toString()}`)
  }

  const reviewsSection = (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-300">
          Opiniones
        </p>
        <h2 className="text-2xl font-semibold text-white">
          Jugadores que ya reservaron aqui
        </h2>
      </div>

      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 md:p-7">
        <div className="grid gap-4 md:grid-cols-[180px,1fr]">
          <div className="rounded-2xl border border-white/10 bg-black/15 p-5 text-center">
            <div className="text-4xl font-bold text-white">
              {data.rating.toFixed(1)}
            </div>
            <div className="mt-2">
              <RatingStars value={data.rating} />
            </div>
            <div className="mt-2 text-xs text-gray-400">
              {data.reviewsCount} reviews
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
            <div className="grid gap-2">
              {data.ratingBreakdown.map((item) => (
                <div
                  key={item.stars}
                  className="grid grid-cols-[24px,1fr,40px] items-center gap-2 text-sm"
                >
                  <span className="text-gray-300">{item.stars}</span>
                  <ProgressBar pct={item.pct} />
                  <span className="text-gray-400">{item.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/15 px-4">
          {reviewItems.map((review) => (
            <ReviewItem key={review.id} r={review} />
          ))}
        </div>
      </div>
    </section>
  )

  return (
    <div className="space-y-8 pb-8 md:space-y-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="space-y-8 lg:order-1">
          <section className="space-y-5">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-sm text-brand-300">
                <Sparkles className="h-4 w-4" />
                Reserva tu proximo partido
              </div>

              <div className="space-y-3">
                <h1 className="max-w-4xl text-3xl font-semibold text-white md:text-4xl">
                  {data.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                    <MapPin className="h-4 w-4 text-brand-300" />
                    {data.address}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                    <Volleyball className="h-4 w-4 text-brand-300" />
                    {data.surface}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
                    <Star className="h-4 w-4 fill-brand-400 text-brand-400" />
                    {data.rating.toFixed(1)} de 5
                  </span>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
              <div
                className="h-[320px] bg-cover bg-center md:h-[420px]"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(18,28,33,0.08) 0%, rgba(18,28,33,0.5) 100%), url(${data.images[galleryIndex]})`,
                }}
              />

              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4">
                <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-main-bg/80 px-3 py-1.5 text-sm text-gray-100 backdrop-blur">
                  <Camera className="h-4 w-4 text-brand-300" />
                  {galleryIndex + 1} / {data.images.length}
                </div>
                <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-main-bg/80 px-3 py-1.5 text-sm text-gray-100 backdrop-blur">
                  <ImageIcon className="h-4 w-4 text-brand-300" />
                  Fotos del espacio
                </div>
              </div>

              <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4">
                <button
                  type="button"
                  onClick={goToPreviousSlide}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-main-bg/75 text-white backdrop-blur transition hover:bg-main-bg"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goToNextSlide}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-main-bg/75 text-white backdrop-blur transition hover:bg-main-bg"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {bookingHighlights.map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="inline-flex rounded-xl bg-brand-500/10 p-2 text-brand-300">
                  <CircleCheck className="h-4 w-4" />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-300">{item}</p>
              </div>
            ))}
          </section>

          <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 md:p-7">
            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-300">
                Sobre la cancha
              </p>
              <h2 className="text-2xl font-semibold text-white">
                Un espacio comodo para jugar sin complicaciones
              </h2>
              <p className="max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
                {data.description}
              </p>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 md:p-7">
            <div className="mb-5 space-y-2">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-300">
                Servicios
              </p>
              <h2 className="text-2xl font-semibold text-white">
                Todo listo para que llegues y juegues
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {data.amenities.map((item) => (
                <AmenityChip key={item}>{item}</AmenityChip>
              ))}
            </div>
          </section>

          {reviewsSection}

        </div>

        <aside className="order-first lg:order-2 lg:sticky lg:top-20">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                <div className="text-sm text-gray-400">Ciudad</div>
                <div className="mt-1 text-lg font-semibold text-white">{data.city}</div>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                <div className="text-sm text-gray-400">Precio desde</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  ${data.pricePerHour.toLocaleString()}
                  <span className="ml-1 text-sm font-normal text-gray-400">/ hora</span>
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                <div className="text-sm text-gray-400">Valoracion</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  {data.rating.toFixed(1)} / 5
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] shadow-xl shadow-black/10">
              <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(0,196,129,0.16),_transparent_35%)] px-5 py-5">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-300">
                  Reserva
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Elige fecha y horario
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Selecciona un dia disponible, revisa los horarios libres y
                  continua al pago con confianza.
                </p>
              </div>

              <div className="space-y-6 px-5 py-5">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/15 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm text-gray-400">Desde</div>
                      <div className="text-3xl font-semibold text-white">
                        ${data.pricePerHour.toLocaleString()}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-brand-500/10 px-3 py-2 text-right">
                      <div className="text-xs text-brand-300">Reserva segura</div>
                      <div className="text-sm font-medium text-white">
                        Confirmacion inmediata
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-white">
                    <CalendarDays className="h-4 w-4 text-brand-300" />
                    Paso 1. Escoge tu fecha
                  </div>
                  <MiniCalendar
                    value={date}
                    onChange={setDate}
                    disabledDates={[]}
                    availableDates={availableDates}
                  />
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-brand-500" />
                      Dias con horarios disponibles
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-gray-500/70" />
                      Dias sin horarios disponibles
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-white">
                    <Clock3 className="h-4 w-4 text-brand-300" />
                    Paso 2. Selecciona un horario
                  </div>

                  {date ? (
                    availableSlots.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {availableSlots.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setSlot(item)}
                            className={[
                              "rounded-2xl border px-3 py-3 text-sm font-medium transition",
                              slot === item
                                ? "border-brand-400 bg-brand-500 text-white shadow-lg shadow-brand-500/20"
                                : "border-white/10 bg-white/[0.04] text-gray-200 hover:border-brand-400/40 hover:bg-white/[0.07]",
                            ].join(" ")}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-white/10 bg-black/15 px-4 py-4 text-sm text-gray-400">
                        No hay horarios libres para esa fecha. Prueba otro dia.
                      </div>
                    )
                  ) : (
                    <div className="rounded-2xl border border-dashed border-white/10 bg-black/15 px-4 py-4 text-sm text-gray-400">
                      Primero elige un dia disponible para desbloquear los horarios.
                    </div>
                  )}
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-black/15 p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Fecha</span>
                      <span className="text-white">
                        {date ? formatLongDate(date) : "Por seleccionar"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Horario</span>
                      <span className="text-white">{slot ?? "Por seleccionar"}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-white/10 pt-3 text-sm">
                      <span className="text-gray-400">Valor estimado</span>
                      <span className="text-lg font-semibold text-white">
                        ${data.pricePerHour.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleCheckout}
                  className="h-12 w-full rounded-full text-base"
                  disabled={!reservationReady}
                >
                  {reservationReady ? "Continuar al pago" : "Selecciona fecha y horario"}
                </Button>

                <div className="space-y-2 text-sm text-gray-400">
                  <div className="inline-flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-brand-300" />
                    Pago protegido y reserva segura.
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <CircleCheck className="h-4 w-4 text-brand-300" />
                    Confirmacion al instante despues del pago.
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-gray-300">
                  Eres administrador?{" "}
                  <Link to="/register" className="font-medium text-brand-400 hover:underline">
                    Publica tu cancha
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  )
}
