import { ButtonHTMLAttributes, forwardRef } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost"
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className = "", variant = "primary", isLoading, children, ...props }, ref) => {
    const base = "hover:cursor-pointer inline-flex items-center justify-center rounded-xl px-4 py-2 text-l font-medium transition disabled:opacity-60 disabled:cursor-not-allowed shadow-soft"
    const styles = {
      primary: "bg-brand-500 text-white hover:bg-brand-600",
      secondary: "border border-[var(--app-border)] bg-[var(--app-surface-strong)] text-[var(--app-heading)] hover:bg-brand-50/70",
      ghost: "bg-transparent text-[var(--app-heading)] hover:bg-brand-50/70",
    }[variant]
    return (
      <button ref={ref} className={`${base} ${styles} ${className}`} {...props}>
        {isLoading ? "Cargando..." : children}
      </button>
    )
  }
)
Button.displayName = "Button"
