export default function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
      <div className="h-full bg-brand-500" style={{ width: `${pct}%` }} />
    </div>
  )
}
