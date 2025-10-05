import { PropsWithChildren } from "react"

export function Pill({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-lg text-gray-100">
      {children}
    </div>
  )
}
