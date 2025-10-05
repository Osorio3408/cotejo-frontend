import { PropsWithChildren } from "react"
import { IconCheck } from "@/components/ui/Icons"

export default function BenefitItem({ children }: PropsWithChildren) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-brand-600/20 text-brand-400">
        <IconCheck className="h-4 w-4" />
      </span>
      <p className="text-gray-100">{children}</p>
    </div>
  )
}
