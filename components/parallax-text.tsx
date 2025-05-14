"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { useAnimationFrame } from "framer-motion"

interface ParallaxTextProps {
  children: React.ReactNode
  baseVelocity?: number
}

export default function ParallaxText({ children, baseVelocity = 20 }: ParallaxTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const baseX = useRef(0)

  // Reset position when component mounts
  useEffect(() => {
    baseX.current = 0
    if (scrollerRef.current) {
      scrollerRef.current.style.transform = `translateX(${baseX.current}px)`
    }
  }, [])

  useAnimationFrame((_, delta) => {
    if (!containerRef.current || !scrollerRef.current) return

    // Move to the right by using positive velocity
    baseX.current += baseVelocity * (delta / 16)

    // Get the width of the scroller element
    const scrollerWidth = scrollerRef.current.offsetWidth / 2

    // Reset position when needed for infinite loop
    if (baseX.current >= scrollerWidth) {
      baseX.current = 0
    }

    // Apply the transform
    scrollerRef.current.style.transform = `translateX(${baseX.current}px)`
  })

  return (
    <div
      ref={containerRef}
      className="overflow-hidden whitespace-nowrap py-4 relative"
      style={{ background: "linear-gradient(90deg, #FF1493 0%, #FF4500 100%)" }}
    >
      <div ref={scrollerRef} className="inline-flex whitespace-nowrap items-center">
        {children}
        {children}
        {children}
        {children}
      </div>
    </div>
  )
}
