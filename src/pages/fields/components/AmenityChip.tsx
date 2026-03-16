import { PropsWithChildren } from "react"

export default function AmenityChip({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-gray-100">
      {children}
    </span>
  )
}
