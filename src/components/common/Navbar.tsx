import { Link, NavLink } from "react-router-dom"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useTheme } from "@/components/common/ThemeProvider"

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-10 border-b border-[var(--app-border)] bg-main-bg">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <NavLink
          to="/"
          className="text-2xl font-extrabold tracking-wide text-brand-600"
        >
          COTEJO
        </NavLink>

        <nav className="hidden gap-6 text-lg sm:flex">
          {[
            { path: "/", label: "Inicio" },
            { path: "/fields", label: "Canchas" },
            { path: "/booking", label: "Reservar" },
          ].map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"} // para que solo '/' marque Inicio
              className={({ isActive }) =>
                [
                  "relative pb-1 transition-colors",
                  isActive ? "text-brand-500" : "app-text hover:text-brand-500",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <span className="absolute left-0 -bottom-[2px] h-[2px] w-full bg-brand-500 rounded-full transition-all duration-300" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-heading)] transition hover:border-brand-400/40 hover:text-brand-500"
            aria-label={`Cambiar a tema ${theme === "dark" ? "claro" : "oscuro"}`}
            title={`Tema ${theme === "dark" ? "claro" : "oscuro"}`}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <Link to="/login">
            <Button variant="ghost">Ingresar</Button>
          </Link>
          <Link to="/register">
            <Button>Registrarme</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
