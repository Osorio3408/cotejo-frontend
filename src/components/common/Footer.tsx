export default function Footer() {
  return (
    <footer className="border-t mt-10 bg-main-bg">
      <div className="mx-auto max-w-7xl px-4 py-8 text-base text-gray-500 flex flex-col  gap-10 sm:items-center justify-between">
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
  );
}
