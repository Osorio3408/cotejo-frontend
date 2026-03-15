export default function RatingStars({ value }: { value: number }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < full) return "★"
    if (i === full && half) return "☆" // (puedes dibujar media con SVG si quieres)
    return "☆"
  })
  return <span className="text-brand-500 text-lg leading-none">{stars.join(" ")}</span>
}
