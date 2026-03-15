import { useEffect, useMemo, useState } from "react"
import { MapPin, Sparkles } from "lucide-react"
import type { Field } from "@/types/field"
import FieldCard from "./components/FieldCard"
import FieldFilters from "./components/FieldFilters"

const MOCK: Field[] = [
  {
    id: "1",
    name: "Camp Nou - Armenia",
    city: "Armenia",
    sport: "futbol",
    pricePerHour: 50000,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1487466365202-1afdb86c764e?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    name: "Basketball Court",
    city: "Pereira",
    sport: "basket",
    pricePerHour: 40000,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Tennis Court",
    city: "Manizales",
    sport: "tenis",
    pricePerHour: 30000,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Volleyball Court",
    city: "Armenia",
    sport: "voley",
    pricePerHour: 35000,
    rating: 4.2,
    image:
      "https://plus.unsplash.com/premium_photo-1708696237452-f38898c48457?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "5",
    name: "Baseball Field",
    city: "Pereira",
    sport: "beisbol",
    pricePerHour: 60000,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1624375664562-fff61869fe8f?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "6",
    name: "Swimming Pool",
    city: "Manizales",
    sport: "natacion",
    pricePerHour: 70000,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
  },
]

type Sort = "relevance" | "price_asc" | "price_desc"

export default function FieldsPage() {
  const params = new URLSearchParams(location.search)
  const [q, setQ] = useState(() => params.get("q") ?? "")
  const [city, setCity] = useState(() => params.get("city") ?? "")
  const [sport, setSport] = useState(() => params.get("sport") ?? "")
  const [maxPrice, setMaxPrice] = useState<number>(
    () => parseInt(params.get("maxPrice") || "120000")
  )
  const [sort, setSort] = useState<Sort>(
    () => (params.get("sort") as Sort) || "relevance"
  )

  useEffect(() => {
    const search = new URLSearchParams()
    if (q) search.set("q", q)
    if (city) search.set("city", city)
    if (sport) search.set("sport", sport)
    if (maxPrice !== 120000) search.set("maxPrice", String(maxPrice))
    if (sort !== "relevance") search.set("sort", sort)

    const query = search.toString()
    history.replaceState(null, "", query ? `/fields?${query}` : "/fields")
  }, [city, maxPrice, q, sort, sport])

  const data = useMemo(() => {
    let list = MOCK.filter((field) => {
      return (
        (q ? field.name.toLowerCase().includes(q.toLowerCase()) : true) &&
        (city ? field.city === city : true) &&
        (sport ? field.sport === sport : true) &&
        field.pricePerHour <= maxPrice
      )
    })

    if (sort === "price_asc") {
      list = [...list].sort((a, b) => a.pricePerHour - b.pricePerHour)
    }

    if (sort === "price_desc") {
      list = [...list].sort((a, b) => b.pricePerHour - a.pricePerHour)
    }

    return list
  }, [city, maxPrice, q, sort, sport])

  const subtitle = city
    ? `Opciones disponibles en ${city}`
    : "Explora canchas destacadas en tu zona"

  return (
    <div className="space-y-8 pb-8 md:space-y-10">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-6 md:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-sm text-brand-300">
              <Sparkles className="h-4 w-4" />
              Descubre tu proximo escenario
            </div>
            <h1 className="text-3xl font-semibold text-white md:text-[2.5rem]">
              Canchas listas para reservar
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-gray-400 md:text-base">
              {subtitle}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-4">
              <div className="text-sm text-gray-400">Resultados</div>
              <div className="mt-1 text-2xl font-semibold text-white">
                {data.length}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-4">
              <div className="inline-flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4" />
                Ciudades activas
              </div>
              <div className="mt-1 text-2xl font-semibold text-white">3</div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-[280px_minmax(0,1fr)] md:items-start lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="md:sticky md:top-20 md:self-start">
          <FieldFilters
            q={q}
            city={city}
            sport={sport}
            maxPrice={maxPrice}
            sort={sort}
            resultsCount={data.length}
            totalCount={MOCK.length}
            onQ={setQ}
            onCity={setCity}
            onSport={setSport}
            onMaxPrice={setMaxPrice}
            onSort={setSort}
          />
        </aside>

        {data.length > 0 ? (
          <section className="min-w-0 space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-white md:text-2xl">
                {data.length} cancha{data.length !== 1 ? "s" : ""} encontrada
                {data.length !== 1 ? "s" : ""}
              </h2>
              <p className="text-sm text-gray-500">
                Elige la opcion que mejor se adapte a tu plan.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
              {data.map((field) => (
                <FieldCard key={field.id} f={field} />
              ))}
            </div>
          </section>
        ) : (
          <section className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] px-6 py-10 text-center">
            <h2 className="text-2xl font-semibold text-white">
              No encontramos canchas con esos filtros
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-400">
              Prueba ampliando el presupuesto, cambiando de ciudad o quitando un
              filtro para descubrir mas opciones.
            </p>
          </section>
        )}
      </div>
    </div>
  )
}
