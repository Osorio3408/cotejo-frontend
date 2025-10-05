import DashboardLayout from "@/layouts/DashboardLayout"

function DashboardContent() {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ejemplos de KPIs únicos del dashboard */}
        <div className="rounded-2xl border bg-white p-4">Reservas hoy: 12</div>
        <div className="rounded-2xl border bg-white p-4">Ingresos: $420.000</div>
        <div className="rounded-2xl border bg-white p-4">Cancelaciones: 1</div>
      </div>
      <div className="rounded-2xl border bg-white p-4 h-64">Calendario / Tabla</div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  )
}
