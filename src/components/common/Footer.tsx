export default function Footer() {
  return (
    <footer className="mt-10 border-t border-[var(--app-border)] bg-main-bg">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 px-4 py-8 text-base app-muted sm:items-center">
        <div className="flex justify-around w-full gap-4">
          <a className="hover:text-brand-600" href="#">
            Términos
          </a>
          <a className="hover:text-brand-600" href="#">
            Privacidad
          </a>
          <a className="hover:text-brand-600" href="#">
            Contacto
          </a>
        </div>
        <div className="text-center">© {new Date().getFullYear()} Cotejo. Todos los derechos reservados</div>
      </div>
    </footer>
  )
}
