import { SelectHTMLAttributes } from "react"

type Props = SelectHTMLAttributes<HTMLSelectElement> & { label?: string }

export function Select({ label, className = "", children, ...props }: Props) {
  return (
    <label className="grid gap-1">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <select className={`h-10 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-brand-200 ${className}`} {...props}>
        {children}
      </select>
    </label>
  )
}
