import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveTextProps {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  preserveWhitespace?: boolean
}

export function ResponsiveText({
  children,
  className,
  as: Component = "p",
  preserveWhitespace = false,
}: ResponsiveTextProps) {
  return (
    <Component
      className={cn(
        "max-w-full overflow-hidden text-ellipsis",
        preserveWhitespace ? "whitespace-pre-wrap" : "whitespace-normal",
        className,
      )}
    >
      {children}
    </Component>
  )
}
