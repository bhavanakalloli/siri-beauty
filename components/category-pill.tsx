import Link from "next/link"
import { cn } from "@/lib/utils"

interface CategoryPillProps {
  name: string
  href: string
  className?: string
}

export function CategoryPill({ name, href, className }: CategoryPillProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-block bg-[#F8F3C7] text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-[#F5EEA3] transition-colors",
        className,
      )}
    >
      {name}
    </Link>
  )
}
