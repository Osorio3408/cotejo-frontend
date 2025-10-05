import { ButtonHTMLAttributes } from "react"

export default function GoogleButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={[
        "h-12 w-full rounded-full",
        "bg-white text-gray-900",
        "border border-white/10",
        "inline-flex items-center justify-center gap-3",
        "font-medium transition hover:bg-gray-50",
      ].join(" ")}
    >
      {/* logo google minimal */}
      <svg viewBox="0 0 24 24" width="18" height="18">
        <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-1.6 3.6-5.1 3.6-3.1 0-5.7-2.6-5.7-5.8s2.6-5.8 5.7-5.8c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.6 3.7 14.5 2.8 12 2.8 6.9 2.8 2.7 7 2.7 12s4.2 9.2 9.3 9.2c5.4 0 9-3.8 9-9.1 0-.6-.1-1-.2-1.5H12z"/>
      </svg>
      <span>Continuar con Google</span>
    </button>
  )
}
