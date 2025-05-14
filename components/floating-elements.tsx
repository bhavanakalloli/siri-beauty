"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles, Star, Gem, Crown, Wand2, Palette } from "lucide-react"

export default function FloatingElements() {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 })

  useEffect(() => {
    // Only access window in useEffect (client-side only)
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const floatingElements = [
    { icon: <Sparkles className="h-6 w-6" />, color: "text-[#FF007F]" },
    { icon: <Star className="h-6 w-6" />, color: "text-[#FFD500]" },
    { icon: <Gem className="h-6 w-6" />, color: "text-[#00E5CF]" },
    { icon: <Crown className="h-6 w-6" />, color: "text-white" },
    { icon: <Wand2 className="h-6 w-6" />, color: "text-[#FF5A36]" },
    { icon: <Palette className="h-6 w-6" />, color: "text-[#0077FF]" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.color} opacity-30`}
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: [Math.random() * dimensions.width, Math.random() * dimensions.width, Math.random() * dimensions.width],
            y: [
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
            ],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
            delay: index * 2,
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  )
}
