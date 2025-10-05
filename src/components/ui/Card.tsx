import { PropsWithChildren } from "react"

export function Card({ children }: PropsWithChildren) {
  return <div className="rounded-2xl border bg-white">{children}</div>
}
export function CardContent({ children, className = "" }: PropsWithChildren & { className?: string }) {
  return <div className={`p-4 ${className}`}>{children}</div>
}
