import type { LucideIcon } from "lucide-react"

interface MarqueeItemProps {
  text: string
  icon: LucideIcon
}

export function MarqueeItem({ text, icon: Icon }: MarqueeItemProps) {
  return (
    <div className="flex items-center mx-8 text-white">
      <Icon className="mr-2 h-6 w-6" />
      <span className="text-xl font-bold tracking-wider">{text}</span>
    </div>
  )
}
