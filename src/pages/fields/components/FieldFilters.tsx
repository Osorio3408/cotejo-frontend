import type { ChangeEvent, ComponentProps, ReactNode } from "react"
import { useMemo, useState } from "react"
import {
  ArrowUpDown,
  ChevronDown,
  type LucideIcon,
  MapPin,
  Search,
  SlidersHorizontal,
  Wallet,
  X,
} from "lucide-react"

type Props = {
  q: string
  city: string
  sport: string
  maxPrice: number
  sort: "relevance" | "price_asc" | "price_desc"
  resultsCount: number
  totalCount: number
  onQ: (v: string) => void
  onCity: (v: string) => void
  onSport: (v: string) => void
  onMaxPrice: (v: number) => void
  onSort: (v: Props["sort"]) => void
}

const DEFAULT_MAX = 120000
const MIN_PRICE = 20000

const cities = ["Armenia", "Pereira", "Manizales"]
const sports = [
  { key: "", label: "Todos" },
  { key: "futbol", label: "Futbol" },
  { key: "basket", label: "Basket" },
  { key: "tenis", label: "Tenis" },
  { key: "voley", label: "Voley" },
  { key: "beisbol", label: "Beisbol" },
  { key: "natacion", label: "Natacion" },
]

const sortOptions = [
  { value: "relevance", label: "Relevancia" },
  { value: "price_asc", label: "Menor precio" },
  { value: "price_desc", label: "Mayor precio" },
] as const

function FilterChip({
  active,
  children,
  onClick,
}: {
  active?: boolean
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex h-10 items-center justify-center rounded-full border px-4 text-sm font-medium transition",
        active
          ? "border-brand-400 bg-brand-500 text-white shadow-lg shadow-brand-500/20"
          : "border-white/10 bg-white/[0.04] text-gray-200 hover:border-brand-400/40 hover:bg-white/[0.07]",
      ].join(" ")}
    >
      {children}
    </button>
  )
}

function FilterTag({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-sm text-gray-200 transition hover:bg-white/[0.09]"
    >
      {children}
      <X className="h-3.5 w-3.5 text-gray-400" />
    </button>
  )
}

function SelectField({
  icon: Icon,
  label,
  value,
  onChange,
  children,
}: {
  icon: LucideIcon
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  children: ReactNode
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-gray-300">{label}</span>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <select
          value={value}
          onChange={onChange}
          className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.04] pl-11 pr-10 text-sm text-gray-100 outline-none transition focus:border-brand-400/60 focus:bg-white/[0.06]"
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      </div>
    </label>
  )
}

export default function FieldFilters({
  q,
  city,
  sport,
  maxPrice,
  sort,
  resultsCount,
  totalCount,
  onQ,
  onCity,
  onSport,
  onMaxPrice,
  onSort,
}: Props) {
  const [open, setOpen] = useState(true)

  const change =
    (fn: (v: string) => void) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      fn(e.target.value)

  const pricePct = useMemo(() => {
    const span = DEFAULT_MAX - MIN_PRICE
    const clamped = Math.min(DEFAULT_MAX, Math.max(MIN_PRICE, maxPrice))
    return Math.round(((clamped - MIN_PRICE) / span) * 100)
  }, [maxPrice])

  const activeCount = useMemo(() => {
    let total = 0
    if (q) total += 1
    if (city) total += 1
    if (sport) total += 1
    if (maxPrice !== DEFAULT_MAX) total += 1
    if (sort !== "relevance") total += 1
    return total
  }, [city, maxPrice, q, sort, sport])

  const clearAll = () => {
    onQ("")
    onCity("")
    onSport("")
    onMaxPrice(DEFAULT_MAX)
    onSort("relevance")
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-xl shadow-black/10">
      <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(0,196,129,0.16),_transparent_35%)] px-5 py-5 md:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-sm text-brand-300">
              <SlidersHorizontal className="h-4 w-4" />
              Filtros inteligentes
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Encuentra la cancha ideal para tu proximo partido
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-400">
                Ajusta deporte, ciudad, presupuesto y orden para descubrir
                opciones que realmente te sirvan.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm">
              <div className="font-semibold text-white">
                {resultsCount} de {totalCount} canchas
              </div>
              <div className="text-gray-400">
                {activeCount
                  ? `${activeCount} filtro${activeCount > 1 ? "s" : ""} activo${activeCount > 1 ? "s" : ""}`
                  : "Sin filtros activos"}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-12 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-gray-100 transition hover:bg-white/[0.07]"
              aria-expanded={open}
            >
              <span>{open ? "Ocultar filtros" : "Mostrar filtros"}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>

            <button
              type="button"
              onClick={clearAll}
              className="inline-flex h-12 items-center gap-2 rounded-2xl border border-white/10 px-4 text-sm font-medium text-gray-300 transition hover:border-brand-400/40 hover:text-white"
            >
              <X className="h-4 w-4" />
              Limpiar
            </button>
          </div>
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="space-y-6 px-5 py-5 md:px-6 md:py-6">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                value={q}
                onChange={change(onQ)}
                placeholder="Busca por nombre, sede o referencia"
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-12 text-base text-gray-100 placeholder:text-gray-500 outline-none transition focus:border-brand-400/60 focus:bg-white/[0.06]"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => onQ("")}
                  aria-label="Limpiar busqueda"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>

            <div className="grid gap-4 xl:grid-cols-[1.2fr,1fr,1fr]">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="rounded-xl bg-brand-500/10 p-2 text-brand-300">
                    <IconBall className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Deporte</h3>
                    <p className="text-xs text-gray-400">
                      Elige el tipo de cancha que quieres reservar.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sports.map((item) => (
                    <FilterChip
                      key={item.key || "all"}
                      active={sport === item.key}
                      onClick={() => onSport(item.key)}
                    >
                      {item.label}
                    </FilterChip>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-white">Ubicacion y orden</h3>
                  <p className="text-xs text-gray-400">
                    Refina los resultados segun donde juegas y como comparas.
                  </p>
                </div>
                <div className="grid gap-4">
                  <SelectField
                    icon={MapPin}
                    label="Ciudad"
                    value={city}
                    onChange={change(onCity)}
                  >
                    <option value="">Todas las ciudades</option>
                    {cities.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </SelectField>

                  <SelectField
                    icon={ArrowUpDown}
                    label="Ordenar por"
                    value={sort}
                    onChange={(event) => onSort(event.target.value as Props["sort"])}
                  >
                    {sortOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </SelectField>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-4">
                <div className="mb-4 flex items-start gap-3">
                  <div className="rounded-xl bg-brand-500/10 p-2 text-brand-300">
                    <Wallet className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Presupuesto</h3>
                    <p className="text-xs text-gray-400">
                      Define el valor maximo por hora que estas dispuesto a pagar.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Tope actual
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-white">
                    ${maxPrice.toLocaleString()}
                    <span className="ml-1 text-sm font-normal text-gray-400">
                      / hora
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <input
                    type="range"
                    min={MIN_PRICE}
                    max={DEFAULT_MAX}
                    step={5000}
                    value={maxPrice}
                    onChange={(event) => onMaxPrice(parseInt(event.target.value))}
                    className="w-full accent-brand-500"
                  />
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-brand-500 transition-all"
                      style={{ width: `${pricePct}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-xs tabular-nums text-gray-500">
                    <span>${MIN_PRICE.toLocaleString()}</span>
                    <span>${DEFAULT_MAX.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {activeCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-2">
                {q && (
                  <FilterTag onClick={() => onQ("")}>
                    Busqueda: "{q}"
                  </FilterTag>
                )}
                {city && (
                  <FilterTag onClick={() => onCity("")}>{city}</FilterTag>
                )}
                {sport && (
                  <FilterTag onClick={() => onSport("")}>
                    {sports.find((item) => item.key === sport)?.label}
                  </FilterTag>
                )}
                {maxPrice !== DEFAULT_MAX && (
                  <FilterTag onClick={() => onMaxPrice(DEFAULT_MAX)}>
                    Hasta ${maxPrice.toLocaleString()}
                  </FilterTag>
                )}
                {sort !== "relevance" && (
                  <FilterTag onClick={() => onSort("relevance")}>
                    {sortOptions.find((item) => item.value === sort)?.label}
                  </FilterTag>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function IconBall(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="2" />
      <path
        d="M8 8c2 1 6 1 8 0M8 16c2-1 6-1 8 0M12 3c1.5 2 1.5 6 0 9m0 0c-1.5 3-1.5 7 0 9"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
