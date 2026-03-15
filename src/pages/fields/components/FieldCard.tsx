import type { Field } from "@/types/field"
import { Link } from "react-router-dom"

export default function FieldCard({ f }: { f: Field }) {
  return (
    <Link
      to={`/fields/${f.id}`}
      className="block rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition"
    >
      <div className="h-36 w-full bg-cover bg-center" style={{ backgroundImage: `url(${f.image})` }} />
      <div className="p-3 space-y-1">
        <h3 className="text-gray-100 font-medium">{f.name}</h3>
        <div className="text-sm text-gray-400">${f.pricePerHour.toLocaleString()}/hr</div>
      </div>
    </Link>
  )
}
