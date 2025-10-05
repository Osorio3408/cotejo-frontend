import { forwardRef, InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export const AuthInput = forwardRef<HTMLInputElement, Props>(
  ({ label, className = "", ...props }, ref) => (
    <label className="grid gap-2">
      {label && <span className="text-sm text-gray-300">{label}</span>}
      <input
        ref={ref}
        className={[
          "h-12 w-full rounded-xl",
          "bg-white text-gray-900 placeholder:text-gray-400",
          "px-4 outline-none border border-white/10",
          "focus:ring-2 focus:ring-brand-300",
          className,
        ].join(" ")}
        {...props}
      />
    </label>
  )
)
AuthInput.displayName = "AuthInput"
