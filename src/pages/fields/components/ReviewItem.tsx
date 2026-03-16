type Review = {
  id: string
  author: string
  date: string
  rating: number
  text: string
  avatar: string
}

import RatingStars from "./RatingStars"

export default function ReviewItem({ r }: { r: Review }) {
  return (
    <div className="py-5 first:border-t-0 border-t border-white/10">
      <div className="flex items-center gap-3">
        <img
          src={r.avatar}
          alt={r.author}
          className="h-11 w-11 rounded-full object-cover ring-1 ring-white/10"
        />
        <div>
          <div className="text-sm font-medium text-gray-100">{r.author}</div>
          <div className="text-xs text-gray-500">{r.date}</div>
        </div>
      </div>
      <div className="mt-2">
        <RatingStars value={r.rating} />
      </div>
      <p className="mt-2 text-sm leading-6 text-gray-300">{r.text}</p>
    </div>
  )
}
