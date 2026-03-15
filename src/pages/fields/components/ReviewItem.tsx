type Review = {
  id: string
  author: string
  date: string
  rating: number
  text: string
}

import RatingStars from "./RatingStars"

export default function ReviewItem({ r }: { r: Review }) {
  return (
    <div className="py-5 border-t border-white/10">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-white/10" />
        <div>
          <div className="text-sm font-medium text-gray-100">{r.author}</div>
          <div className="text-xs text-gray-500">{r.date}</div>
        </div>
      </div>
      <div className="mt-2">
        <RatingStars value={r.rating} />
      </div>
      <p className="mt-2 text-gray-300 text-sm">{r.text}</p>
    </div>
  )
}
