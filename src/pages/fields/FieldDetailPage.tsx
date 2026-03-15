import { useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import AmenityChip from "./components/AmenityChip";
import RatingStars from "./components/RatingStars";
import ProgressBar from "./components/ProgressBar";
import ReviewItem from "./components/ReviewItem";
import MiniCalendar from "./components/MiniCalendar";
import { Button } from "@/components/ui/Button";
import { MapPin, Volleyball } from "lucide-react";

type FieldDetail = {
  id: string;
  name: string;
  city: string;
  address: string;
  description: string;
  pricePerHour: number;
  rating: number;
  reviewsCount: number;
  ratingBreakdown: { stars: 5 | 4 | 3 | 2 | 1; pct: number }[];
  amenities: string[];
  image: string;
};

const MOCK: Record<string, FieldDetail> = {
  "1": {
    id: "1",
    name: "Canchas Sintéticas Camp Nou Armenia",
    city: "Armenia, Quindío",
    address: "Carrera 8, Armenia, Quindío",
    description:
      "Este campo de fútbol bien mantenido en la Avenida Centenario ofrece una fantástica superficie de juego, amplio espacio para los equipos y excelente iluminación para los juegos nocturnos. Es perfecto para juegos casuales, sesiones de práctica o torneos organizados.",
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
      "Baños",
      "Balones de fútbol",
      "Buena iluminación",
      "Parqueaderos",
    ],
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1600&auto=format&fit=crop",
  },
};

export default function FieldDetailPage() {
  const { id = "1" } = useParams();
  const data = useMemo(() => MOCK[id] ?? MOCK["1"], [id]);

  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className="grid gap-8">
      {/* HERO */}
      <div
        className="h-56 md:h-72 rounded-2xl border border-white/10 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.image})` }}
      />

      <div className="grid gap-8 md:grid-cols-[1fr,320px]">
        {/* LEFT */}
        <div className="space-y-6">
          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-100">
              {data.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {data.address}
              </span>
              <span className="inline-flex items-center gap-1">
                <Volleyball className="h-4 w-4" /> Sintética
              </span>
            </div>
          </div>

          {/* Información */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-gray-100">Información</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              {data.description}
            </p>
          </section>

          {/* Servicios */}
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-100">Servicios</h3>
            <div className="flex flex-wrap gap-2">
              {data.amenities.map((a) => (
                <AmenityChip key={a}>{a}</AmenityChip>
              ))}
            </div>
          </section>

          {/* Fecha */}
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-100">Fecha</h3>
            <MiniCalendar value={date} onChange={setDate} disabledDates={[]} />
          </section>

          {/* RIGHT – precio y CTA */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-gray-400 mb-1">Desde</div>
              <div className="text-2xl font-semibold text-white">
                ${data.pricePerHour.toLocaleString()}/hora
              </div>
              <div className="mt-4">
                <Button className="w-full h-11 rounded-full" disabled={!date}>
                  {date ? "Alquilar" : "Selecciona una fecha"}
                </Button>
              </div>
              <div className="mt-3 text-xs text-gray-500">
                Reserva segura • Cancelación flexible
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
              ¿Eres administrador?{" "}
              <Link to="/register" className="text-brand-500 hover:underline">
                publica tu cancha
              </Link>
            </div>
          </aside>

          {/* Reviews */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-100">Reviews</h3>

            <div className="grid gap-4 md:grid-cols-[160px,1fr]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <div className="text-4xl font-bold text-white">
                  {data.rating.toFixed(1)}
                </div>
                <div className="mt-1">
                  <RatingStars value={data.rating} />
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  {data.reviewsCount} reviews
                </div>
              </div>

              <div className="grid gap-2">
                {data.ratingBreakdown.map((r) => (
                  <div
                    key={r.stars}
                    className="grid grid-cols-[24px,1fr,40px] items-center gap-2 text-sm"
                  >
                    <span className="text-gray-300">{r.stars}</span>
                    <ProgressBar pct={r.pct} />
                    <span className="text-gray-400">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lista de reviews (mock cortito) */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <ReviewItem
                r={{
                  id: "1",
                  author: "Liam Carter",
                  date: "Jun 5, 2024",
                  rating: 5,
                  text: "Great field! Well-maintained and perfect for our team practice. The lighting was excellent for our evening session.",
                }}
              />
              <ReviewItem
                r={{
                  id: "2",
                  author: "Sophia Bennett",
                  date: "May 24, 2024",
                  rating: 4,
                  text: "The field was in good condition, but the restrooms could have been cleaner. Overall, a decent experience.",
                }}
              />
              <ReviewItem
                r={{
                  id: "3",
                  author: "Ethan Harper",
                  date: "Apr 10, 2024",
                  rating: 5,
                  text: "Fantastic field! The surface was excellent, and the location was convenient. We had a great time playing here.",
                }}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
