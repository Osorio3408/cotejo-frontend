export default function AppLoadingScreen() {
  return (
    <div className="min-h-dvh bg-main-bg text-gray-200">
      <div className="mx-auto flex min-h-dvh max-w-7xl items-center justify-center px-4">
        <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-12 text-center shadow-2xl shadow-black/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,196,129,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.05),_transparent_28%)]" />

          <div className="relative space-y-6">
            <div className="inline-flex items-center rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-300">
              COTEJO
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-semibold text-white">
                Cargando tu siguiente jugada
              </h1>
              <p className="mx-auto max-w-md text-sm leading-6 text-gray-400">
                Estamos preparando la experiencia para que encuentres, reserves
                y juegues sin friccion.
              </p>
            </div>

            <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-brand-500" />
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-brand-500" />
                Cargando contenido
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
