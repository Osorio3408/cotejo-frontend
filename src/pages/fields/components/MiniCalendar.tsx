import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

function getMonthMatrix(base: Date) {
  const year = base.getFullYear()
  const month = base.getMonth()
  const firstDay = new Date(year, month, 1)
  const start = new Date(firstDay)
  start.setDate(firstDay.getDate() - ((firstDay.getDay() + 6) % 7)) // semana empieza Lunes
  const weeks: Date[][] = []
  let cur = new Date(start)
  for (let w = 0; w < 6; w++) {
    const row: Date[] = []
    for (let d = 0; d < 7; d++) {
      row.push(new Date(cur))
      cur.setDate(cur.getDate() + 1)
    }
    weeks.push(row)
  }
  return weeks
}

export default function MiniCalendar({
  value,
  onChange,
  disabledDates = [],
  availableDates,
}: {
  value?: Date | null
  onChange: (d: Date) => void
  disabledDates?: string[] // YYYY-MM-DD
  availableDates?: string[]
}) {
  const [cursor, setCursor] = useState<Date>(value ?? new Date())
  const weeks = useMemo(() => getMonthMatrix(cursor), [cursor])

  const isSameDay = (a: Date, b?: Date | null) =>
    !!b && a.toDateString() === b.toDateString()
  const dateKey = (date: Date) => date.toISOString().slice(0, 10)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const isDisabled = (d: Date) => {
    const key = dateKey(d)
    const isPast = d < today
    const manuallyDisabled = disabledDates.includes(key)
    const unavailable = availableDates ? !availableDates.includes(key) : false
    return isPast || manuallyDisabled || unavailable
  }

  const monthName = cursor.toLocaleString("es-ES", { month: "long", year: "numeric" })

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth()-1, 1))} className="p-1 rounded hover:bg-white/10">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-sm font-medium text-gray-200 capitalize">{monthName}</div>
        <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth()+1, 1))} className="p-1 rounded hover:bg-white/10">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-xs text-gray-400 mb-1">
        {["L","M","X","J","V","S","D"].map((d) => <div key={d} className="text-center py-1">{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((d, i) => {
          const isCurMonth = d.getMonth() === cursor.getMonth()
          const selected = isSameDay(d, value)
          const disabled = isDisabled(d)
          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => onChange(d)}
              className={[
                "h-9 rounded-xl text-sm tabular-nums transition",
                selected && "bg-brand-500 text-white shadow-lg shadow-brand-500/20",
                !selected && isCurMonth && !disabled && "bg-white/10 text-gray-100 hover:bg-white/20",
                !selected && !isCurMonth && "bg-white/5 text-gray-500",
                disabled && "cursor-not-allowed bg-white/[0.03] text-gray-600",
              ].filter(Boolean).join(" ")}
            >
              {d.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
