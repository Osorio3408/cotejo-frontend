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
  const hasAvailability = (d: Date) =>
    availableDates ? availableDates.includes(dateKey(d)) : !isDisabled(d)

  return (
    <div className="rounded-[1.65rem] border border-white/10 bg-white/[0.04] p-4 shadow-xl shadow-black/10">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          className="rounded-xl border border-white/10 bg-black/15 p-2 transition hover:border-brand-400/40 hover:bg-white/[0.08]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-sm font-semibold capitalize text-white">{monthName}</div>
        <button
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          className="rounded-xl border border-white/10 bg-black/15 p-2 transition hover:border-brand-400/40 hover:bg-white/[0.08]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 text-xs font-medium text-gray-400">
        {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
          <div key={d} className="py-1 text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((d, i) => {
          const isCurMonth = d.getMonth() === cursor.getMonth()
          const selected = isSameDay(d, value)
          const disabled = isDisabled(d)
          const available = isCurMonth && !disabled && hasAvailability(d)
          const outOfMonth = !isCurMonth

          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => onChange(d)}
              className={[
                "relative h-10 rounded-xl border text-sm font-medium tabular-nums transition",
                selected &&
                  "border-brand-700 bg-brand-600 text-white shadow-lg shadow-brand-500/30 ring-2 ring-brand-200/80",
                !selected &&
                  available &&
                  "border-brand-300/70 bg-brand-500/12 text-white shadow-sm shadow-brand-500/10 hover:border-brand-500 hover:bg-brand-500/18",
                !selected &&
                  !disabled &&
                  !available &&
                  isCurMonth &&
                  "border-white/10 bg-black/15 text-gray-300 hover:border-white/20 hover:bg-white/[0.08]",
                outOfMonth &&
                  "border-transparent bg-transparent text-gray-500 opacity-55",
                disabled &&
                  isCurMonth &&
                  "cursor-not-allowed border-white/5 bg-white/[0.02] text-gray-500 opacity-80",
              ].filter(Boolean).join(" ")}
              aria-pressed={selected}
            >
              {d.getDate()}
              {available && !selected ? (
                <span className="absolute inset-x-0 bottom-1 flex justify-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
