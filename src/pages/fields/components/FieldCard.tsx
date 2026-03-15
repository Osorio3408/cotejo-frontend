import { MapPin, Star } from "lucide-react"
import { Link } from "react-router-dom"
import type { Field } from "@/types/field"

const sportLabels: Record<Field["sport"], string> = {
  futbol: "Futbol",
  basket: "Basket",
  tenis: "Tenis",
  voley: "Voley",
  beisbol: "Beisbol",
  natacion: "Natacion",
}

export default function FieldCard({ f }: { f: Field }) {
  return (
    <Link
      to={`/fields/${f.id}`}
      className="group overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-brand-400/30 hover:bg-white/[0.06]"
    >
      <div className="relative">
        <div
          className="h-48 w-full bg-cover bg-center transition duration-500 group-hover:scale-[1.03]"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(18,28,33,0.08) 0%, rgba(18,28,33,0.45) 100%), url(${f.image})`,
          }}
        />
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-main-bg/80 px-3 py-1 text-xs font-medium text-brand-300 backdrop-blur">
          {sportLabels[f.sport]}
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">{f.name}</h3>
            <div className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-2.5 py-1 text-sm text-gray-200">
              <Star className="h-3.5 w-3.5 fill-brand-400 text-brand-400" />
              {f.rating.toFixed(1)}
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="h-4 w-4" />
            {f.city}
          </div>
        </div>

        <div className="flex items-end justify-between gap-3 border-t border-white/10 pt-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Desde
            </div>
            <div className="text-xl font-semibold text-white">
              ${f.pricePerHour.toLocaleString()}
              <span className="ml-1 text-sm font-normal text-gray-400">
                / hora
              </span>
            </div>
          </div>

          <span className="text-sm font-medium text-brand-300 transition group-hover:text-brand-200">
            Ver detalle
          </span>
        </div>
      </div>
    </Link>
  )
}
