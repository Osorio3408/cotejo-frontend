import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-main-bg border-b">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        <NavLink
          to="/"
          className="font-extrabold text-2xl text-brand-600 tracking-wide"
        >
          COTEJO
        </NavLink>
        <nav className="hidden sm:flex gap-6 text-lg">
          <NavLink to="/" className="hover:text-brand-600">
            Inicio
          </NavLink>
          <NavLink to="/fields" className="hover:text-brand-600">
            Canchas
          </NavLink>
          <NavLink to="/booking" className="hover:text-brand-600">
            Reservar
          </NavLink>
        </nav>
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
