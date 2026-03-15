import { PropsWithChildren } from "react"

export default function AmenityChip({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-100">
      {children}
    </span>
  )
}
