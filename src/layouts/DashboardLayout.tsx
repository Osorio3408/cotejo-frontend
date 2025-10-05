import { PropsWithChildren } from "react"

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Panel</h2>
        <div className="text-sm text-gray-500">Sede: Armenia</div>
      </div>
      {children}
    </div>
  )
}
