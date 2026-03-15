import { useEffect, useMemo, useState } from "react"
import type { Field } from "@/types/field"
import FieldCard from "./components/FieldCard"
import FieldFilters from "./components/FieldFilters"

const MOCK: Field[] = [
  { id:"1", name:"Camp Nou - Armenia", city:"Armenia", sport:"futbol",   pricePerHour:50000, rating:4.8, image:"https://images.unsplash.com/photo-1487466365202-1afdb86c764e?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id:"2", name:"Basketball Court",   city:"Pereira", sport:"basket",   pricePerHour:40000, rating:4.4, image:"https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop" },
  { id:"3", name:"Tennis Court",       city:"Manizales", sport:"tenis",  pricePerHour:30000, rating:4.3, image:"https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1200&auto=format&fit=crop" },
  { id:"4", name:"Volleyball Court",   city:"Armenia", sport:"voley",    pricePerHour:35000, rating:4.2, image:"https://plus.unsplash.com/premium_photo-1708696237452-f38898c48457?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id:"5", name:"Baseball Field",     city:"Pereira", sport:"beisbol",  pricePerHour:60000, rating:4.6, image:"https://images.unsplash.com/photo-1624375664562-fff61869fe8f?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id:"6", name:"Swimming Pool",      city:"Manizales", sport:"natacion", pricePerHour:70000, rating:4.9, image:"https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop" },
]

export default function FieldsPage() {
  // lee filtros iniciales de la URL
  const params = new URLSearchParams(location.search)
  const [q, setQ] = useState(params.get("q") ?? "")
  const [city, setCity] = useState(params.get("city") ?? "")
  const [sport, setSport] = useState(params.get("sport") ?? "")
  const [maxPrice, setMaxPrice] = useState<number>(parseInt(params.get("maxPrice") || "120000"))
  const [sort, setSort] = useState<"relevance"|"price_asc"|"price_desc">((params.get("sort") as any) || "relevance")

  // sincroniza con la URL cuando cambian filtros
  useEffect(() => {
    const s = new URLSearchParams()
    if (q) s.set("q", q)
    if (city) s.set("city", city)
    if (sport) s.set("sport", sport)
    if (maxPrice !== 120000) s.set("maxPrice", String(maxPrice))
    if (sort !== "relevance") s.set("sort", sort)
    history.replaceState(null, "", `/fields?${s.toString()}`)
  }, [q, city, sport, maxPrice, sort])

  const data = useMemo(() => {
    let list = MOCK.filter(f =>
      (q ? f.name.toLowerCase().includes(q.toLowerCase()) : true) &&
      (city ? f.city === city : true) &&
      (sport ? f.sport === sport : true) &&
      f.pricePerHour <= maxPrice
    )
    if (sort === "price_asc") list = [...list].sort((a,b)=>a.pricePerHour-b.pricePerHour)
    if (sort === "price_desc") list = [...list].sort((a,b)=>b.pricePerHour-a.pricePerHour)
    return list
  }, [q, city, sport, maxPrice, sort])

  return (
    <div className="space-y-8">
      <FieldFilters
        q={q} city={city} sport={sport} maxPrice={maxPrice} sort={sort}
        onQ={setQ} onCity={setCity} onSport={setSport} onMaxPrice={setMaxPrice} onSort={setSort}
      />

      <h1 className="text-2xl md:text-3xl font-semibold text-gray-100">Canchas cerca a ti</h1>

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {data.map((f) => <FieldCard key={f.id} f={f} />)}
      </div>

      {!data.length && (
        <div className="text-gray-400">No encontramos canchas con esos filtros.</div>
      )}
    </div>
  )
}
