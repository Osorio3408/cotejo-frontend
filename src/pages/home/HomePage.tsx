import { Button } from "@/components/ui/Button";
import { IconCalendar, IconSearch, IconBall } from "@/components/ui/Icons";
import { Pill } from "@/components/ui/Pill";
import BenefitItem from "./components/BenefitItem";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="space-y-10 text-gray-200">
      {/* HERO */}
      <section className="flex flex-col items-center lg:items-left lg:flex-row gap-10">
        {/* Imagen */}
        <div className="h-[250px] lg:h-[300px] w-[100%] md:w-[40%] bg-[url('https://plus.unsplash.com/premium_photo-1661889192152-443b1c96b527?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center border border-white/10" />

        {/* Copy */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-white">
            ¡Tu <span className="text-brand-500">cotejo</span> empieza aquí!
            <br />
            Reserva canchas al toque y arma el partido
            <br /> con tus amigos.
          </h1>

          <div className="text-sm text-gray-400 space-y-1">
            <p>
              <span className="text-gray-300 font-medium">Para jugadores:</span>{" "}
              Las mejores canchas, al mejor precio y sin estrés.
            </p>
            <p>
              <span className="text-gray-300 font-medium">Para dueños:</span>{" "}
              Llena tu espacio de buen rol y ganancias.
            </p>
          </div>

          <div className="flex gap-3">
            <Link to={"/fields"}>
              {" "}
              <Button variant="primary">Buscar canchas</Button>
            </Link>
            <Button variant="secondary">Publicar mi cancha…</Button>
          </div>
        </div>
      </section>

      <section className="text-center">
        <p className="text-md text-gray-500">
          500+ canchas disponibles | 4.8★ (2,000+ reseñas) | Reservas 100%
          seguras
        </p>
      </section>

      {/* ¿Por qué Cotejo? */}
      <section className="space-y-4 mt-10">
        <h2 className="text-2xl font-semibold text-white">
          ¿Por qué <span className="text-brand-500">Cotejo</span>?
        </h2>
        <h3 className="text-xl">
          Porque un <span className="text-brand-500">Cotejo</span> no es solo un
          partido, es:
        </h3>
        <div className="space-y-2 text-xl">
          <BenefitItem>El gol que se celebra como una gran final</BenefitItem>
          <BenefitItem>Esas puyas entre amigos</BenefitItem>
          <BenefitItem>La emoción de llevar la ventaja</BenefitItem>
          <p className="text-gray-400">
            Acá te ayudamos a que solo te preocupes por jugar.
          </p>
        </div>
      </section>

      {/* Beneficios (pills) */}
      <section className="space-y-3 mt-10">
        <h3 className="text-2xl font-medium text-gray-200">Beneficios</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <Pill>✓ Reserva rápida</Pill>
          <Pill>✓ Precios sin sorpresas</Pill>
          <Pill>✓ Canchas de calidad</Pill>
          <Pill>📷 Más clientes, menos esfuerzos</Pill>
          <Pill>📊 Reportes automáticos</Pill>
          <Pill>🛡️ Sin fraudes</Pill>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="space-y-3 mt-10">
        <h3 className="text-2xl font-medium text-gray-200">Cómo funciona</h3>
        <div className="grid gap-3 sm:grid-cols-3 text-xl">
          <div className="flex items-center gap-2 rounded-lg bg-transparent border border-white text-gray-300 px-3 py-2">
            <IconSearch className="h-4 w-4" />
            <span>Encuentra</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-transparent border border-white text-gray-300 px-3 py-2">
            <IconCalendar className="h-4 w-4" />
            <span>Reserva</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-transparent border border-white text-gray-300 px-3 py-2">
            ✓<span>Disfruta y juega</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-20">
          <Link to={"/fields"}>
            <Button variant="secondary" className="rounded-full px-5">
              ¿Listo para el cotejo?
            </Button>
          </Link>
          <Button variant="primary" className="rounded-full px-5">
            ¿Tienes una cancha?
          </Button>
        </div>
      </section>
    </div>
  );
}
