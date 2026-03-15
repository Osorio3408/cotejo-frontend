import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-main-bg border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="font-extrabold text-2xl text-brand-600 tracking-wide"
        >
          COTEJO
        </NavLink>

        {/* Nav links */}
        <nav className="hidden sm:flex gap-6 text-lg">
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
                  isActive
                    ? "text-brand-500"
                    : "text-gray-300 hover:text-brand-500",
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

        {/* Botones de auth */}
        <div className="flex gap-2">
          <Link to="/login">
            <Button variant="ghost">Ingresar</Button>
          </Link>
          <Link to="/register">
            <Button>Registrarme</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
