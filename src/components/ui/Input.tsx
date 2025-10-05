import { InputHTMLAttributes, forwardRef } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string }

export const Input = forwardRef<HTMLInputElement, Props>(({ label, hint, className = "", ...props }, ref) => (
  <label className="grid gap-1">
    {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
    <input ref={ref} className={`h-10 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-brand-200 ${className}`} {...props} />
    {hint && <span className="text-xs text-gray-500">{hint}</span>}
  </label>
))
Input.displayName = "Input"
