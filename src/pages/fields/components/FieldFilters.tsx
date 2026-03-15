// src/pages/fields/components/FieldFilters.tsx
import { ChangeEvent, useMemo, useState } from "react";
import {
  Search,
  MapPin,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";

type Props = {
  q: string;
  city: string;
  sport: string;
  maxPrice: number;
  sort: "relevance" | "price_asc" | "price_desc";
  onQ: (v: string) => void;
  onCity: (v: string) => void;
  onSport: (v: string) => void;
  onMaxPrice: (v: number) => void;
  onSort: (v: Props["sort"]) => void;
};

const DEFAULT_MAX = 120000;
const MIN_PRICE = 20000;

const cities = ["Armenia", "Pereira", "Manizales"];
const sports = [
  { key: "", label: "Todos" },
  { key: "futbol", label: "Fútbol" },
  { key: "basket", label: "Basket" },
  { key: "tenis", label: "Tenis" },
  { key: "voley", label: "Vóley" },
  { key: "beisbol", label: "Béisbol" },
  { key: "natacion", label: "Natación" },
];

function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-9 px-3 rounded-lg text-sm transition border",
        active
          ? "bg-brand-500 text-white border-brand-500"
          : "bg-white/5 text-gray-200 border-white/10 hover:bg-white/10",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default function FieldFilters({
  q,
  city,
  sport,
  maxPrice,
  sort,
  onQ,
  onCity,
  onSport,
  onMaxPrice,
  onSort,
}: Props) {
  const [open, setOpen] = useState(true);

  const change =
    (fn: (v: string) => void) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      fn(e.target.value);

  const pricePct = useMemo(() => {
    const span = DEFAULT_MAX - MIN_PRICE;
    const clamped = Math.min(DEFAULT_MAX, Math.max(MIN_PRICE, maxPrice));
    return Math.round(((clamped - MIN_PRICE) / span) * 100);
  }, [maxPrice]);

  const activeCount = useMemo(() => {
    let n = 0;
    if (q) n++;
    if (city) n++;
    if (sport) n++;
    if (maxPrice !== DEFAULT_MAX) n++;
    if (sort !== "relevance") n++;
    return n;1
  }, [q, city, sport, maxPrice, sort]);

  const clearAll = () => {
    onQ("");
    onCity("");
    onSport("");
    onMaxPrice(DEFAULT_MAX);
    onSort("relevance");
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5">
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 md:px-5 ${open ? 'border-b' : ''} border-white/10`}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 text-gray-200"
          aria-expanded={open}
        >
          <ChevronDown
            className={`mr-4 h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
          <SlidersHorizontal className="h-4 w-4" />
          <span className="text-sm">Filtros</span>
          <span className="text-xs text-gray-400">
            {activeCount ? `(${activeCount} activos)` : ""}
          </span>
        </button>

        <div className="flex items-center gap-3">
          {/* cuando está cerrado, deja la búsqueda rápida */}
          {!open && (
            <label className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={q}
                onChange={change(onQ)}
                placeholder="Buscar…"
                className="h-9 w-56 pl-9 pr-9 rounded-lg bg-white/10 text-gray-100 placeholder:text-gray-400 border border-white/10 outline-none focus:ring-2 focus:ring-brand-300"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => onQ("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="h-3.5 w-3.5 text-gray-400" />
                </button>
              )}
            </label>
          )}
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-gray-400 hover:text-white inline-flex items-center gap-1"
            title="Limpiar filtros"
          >
            <X className="h-3.5 w-3.5" /> Limpiar
          </button>
        </div>
      </div>

      {/* Contenido colapsable */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-4 md:p-5 space-y-4">
            {/* Search */}
            <label className="relative block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                value={q}
                onChange={change(onQ)}
                placeholder="Buscar canchas (nombre, barrio, sede...)"
                className="w-full h-12 pl-12 pr-12 rounded-xl bg-white/10 text-gray-100 placeholder:text-gray-400 border border-white/10 outline-none focus:ring-2 focus:ring-brand-300"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => onQ("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/10"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </label>

            {/* Controls row */}
            <div className="grid gap-3 md:grid-cols-[220px,1fr,260px]">
              {/* City select */}
              <label className="grid gap-1">
                <span className="text-xs text-gray-400">Lugar</span>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <select
                    value={city}
                    onChange={change(onCity)}
                    className="w-full h-10 pl-9 pr-8 rounded-lg bg-white text-gray-900 border border-white/10 outline-none"
                  >
                    <option value="">Cualquier ciudad</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </label>

              {/* Sports chips */}
              <div className="grid gap-1">
                <span className="text-xs text-gray-400">Deporte</span>
                <div className="flex flex-wrap gap-2">
                  {sports.map((s) => (
                    <Chip
                      key={s.key || "all"}
                      active={sport === s.key}
                      onClick={() => onSport(s.key)}
                    >
                      {s.label}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* Sort segmented */}
              <div className="grid gap-1">
                <span className="text-xs text-gray-400">Ordenar</span>
                <div className="grid grid-cols-3 rounded-lg border border-white/10 bg-white/5 p-1">
                  {[
                    { v: "relevance", label: "Relevancia" },
                    { v: "price_asc", label: "↑ Precio" },
                    { v: "price_desc", label: "↓ Precio" },
                  ].map((opt) => (
                    <button
                      key={opt.v}
                      type="button"
                      onClick={() => onSort(opt.v as Props["sort"])}
                      className={[
                        "h-8 rounded-md text-sm transition",
                        sort === opt.v
                          ? "bg-brand-500 text-white"
                          : "text-gray-200 hover:bg-white/10",
                      ].join(" ")}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {opt.v === "relevance" && (
                          <ArrowUpDown className="h-4 w-4" />
                        )}
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price slider */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Precio por hora</span>
                <span className="tabular-nums text-gray-300">
                  Hasta{" "}
                  <strong className="text-white">
                    ${maxPrice.toLocaleString()}
                  </strong>{" "}
                  / hr
                </span>
              </div>

              <input
                type="range"
                min={MIN_PRICE}
                max={DEFAULT_MAX}
                step={5000}
                value={maxPrice}
                onChange={(e) => onMaxPrice(parseInt(e.target.value))}
                className="w-full appearance-none bg-transparent relative top-5 z-10"
              />

              <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-brand-500"
                  style={{ width: `${pricePct}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-gray-500 tabular-nums">
                <span>${MIN_PRICE.toLocaleString()}</span>
                <span>${DEFAULT_MAX.toLocaleString()}</span>
              </div>
            </div>

            {/* Active filters summary */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {q && (
                <Chip onClick={() => onQ("")}>
                  <span className="opacity-80 mr-1">Búsqueda:</span> “{q}”{" "}
                  <X className="ml-2 h-3.5 w-3.5 opacity-80" />
                </Chip>
              )}
              {city && (
                <Chip onClick={() => onCity("")}>
                  {city} <X className="ml-2 h-3.5 w-3.5 opacity-80" />
                </Chip>
              )}
              {sport && (
                <Chip onClick={() => onSport("")}>
                  {sports.find((s) => s.key === sport)?.label}{" "}
                  <X className="ml-2 h-3.5 w-3.5 opacity-80" />
                </Chip>
              )}
              {maxPrice !== DEFAULT_MAX && (
                <Chip onClick={() => onMaxPrice(DEFAULT_MAX)}>
                  Hasta ${maxPrice.toLocaleString()}{" "}
                  <X className="ml-2 h-3.5 w-3.5 opacity-80" />
                </Chip>
              )}
              {sort !== "relevance" && (
                <Chip onClick={() => onSort("relevance")}>
                  Orden: {sort === "price_asc" ? "↑ Precio" : "↓ Precio"}{" "}
                  <X className="ml-2 h-3.5 w-3.5 opacity-80" />
                </Chip>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
