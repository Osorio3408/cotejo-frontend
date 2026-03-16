import { forwardRef, InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export const AuthInput = forwardRef<HTMLInputElement, Props>(
  ({ label, className = "", ...props }, ref) => (
    <label className="grid gap-2">
      {label && <span className="text-sm app-text">{label}</span>}
      <input
        ref={ref}
        className={[
          "h-12 w-full rounded-xl",
          "app-input px-4 outline-none border",
          "focus:ring-2 focus:ring-brand-300",
          className,
        ].join(" ")}
        {...props}
      />
    </label>
  )
)
AuthInput.displayName = "AuthInput"
