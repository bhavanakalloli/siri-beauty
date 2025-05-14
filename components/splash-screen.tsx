"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SplashScreenProps {
  beautyIcons: ReactNode[]
}

export default function SplashScreen({ beautyIcons }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 5
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-[#FF007F] to-[#FF5A36]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full max-w-md px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Beauty & Wellness</h1>
          <p className="text-white/80">Your premium salon experience</p>
        </motion.div>

        <div className="relative">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="mt-2 text-right text-white/80 text-sm">{progress}%</div>
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
          {beautyIcons.map((icon, index) => (
            <motion.div
              key={index}
              className="absolute text-white/30"
              initial={{
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                scale: 0,
                rotate: Math.random() * 360,
              }}
              animate={{
                x: [Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100],
                y: [Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100],
                scale: [0, 1.5, 0],
                rotate: [0, 180, 360],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 3,
                times: [0, 0.5, 1],
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.2,
              }}
              style={{
                left: `${50 + Math.random() * 40 - 20}%`,
                top: `${50 + Math.random() * 40 - 20}%`,
              }}
            >
              {icon}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
