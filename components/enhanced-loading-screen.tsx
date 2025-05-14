"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Star, Gem, Crown, Wand2, Palette, Scissors, Heart, Flower } from "lucide-react"

interface EnhancedLoadingScreenProps {
  onLoadingComplete: () => void
}

export default function EnhancedLoadingScreen({ onLoadingComplete }: EnhancedLoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState(0)
  const [loadingText, setLoadingText] = useState("Preparing your beauty experience")
  const [logoError, setLogoError] = useState(false)

  // Loading stages text
  const loadingStages = [
    "Preparing your beauty experience",
    "Gathering premium treatments",
    "Polishing the experience",
    "Almost ready to glow",
    "Welcome to beauty & wellness",
  ]

  // Beauty icons for the loading animation
  const beautyIcons = [
    { icon: <Scissors className="h-10 w-10" />, color: "#FF007F" },
    { icon: <Heart className="h-10 w-10" />, color: "#FF5A36" },
    { icon: <Flower className="h-10 w-10" />, color: "#FFD500" },
    { icon: <Gem className="h-10 w-10" />, color: "#00E5CF" },
    { icon: <Crown className="h-10 w-10" />, color: "#0077FF" },
    { icon: <Wand2 className="h-10 w-10" />, color: "#FF007F" },
    { icon: <Palette className="h-10 w-10" />, color: "#FF5A36" },
    { icon: <Star className="h-10 w-10" />, color: "#FFD500" },
    { icon: <Sparkles className="h-10 w-10" />, color: "#00E5CF" },
  ]

  // Handle logo loading error
  const handleLogoError = () => {
    console.error("Failed to load logo image in loading screen")
    setLogoError(true)
  }

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onLoadingComplete()
          }, 300)
          return 100
        }

        // Update loading stage based on progress
        const newProgress = prevProgress + (Math.random() * 5 + 3)
        const newStage = Math.min(Math.floor(newProgress / 20), 4)

        if (newStage !== stage) {
          setStage(newStage)
          setLoadingText(loadingStages[newStage])
        }

        return newProgress
      })
    }, 50)

    return () => clearInterval(interval)
  }, [stage, onLoadingComplete, loadingStages])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
    >
      {/* Background gradient with animated overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#FF007F] to-[#00E5CF]"
        animate={{
          background: [
            "linear-gradient(to bottom right, #FF007F, #00E5CF)",
            "linear-gradient(to bottom right, #FF5A36, #0077FF)",
            "linear-gradient(to bottom right, #FFD500, #FF007F)",
            "linear-gradient(to bottom right, #00E5CF, #FF5A36)",
            "linear-gradient(to bottom right, #FF007F, #00E5CF)",
          ],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Animated pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 L40 20 M20 0 L20 40" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-md px-6 py-10">
        {/* Logo animation */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-block relative"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            {logoError ? (
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#76B947]">Siri</span>{" "}
                Beauty and Wellness Center – Jayanagar
              </h1>
            ) : (
              <div className="relative w-40 h-40 mx-auto mb-4">
                <Image
                  src="/siri-new-logo.png"
                  alt="Siri Beauty"
                  fill
                  className="object-contain"
                  onError={handleLogoError}
                  sizes="160px"
                  priority
                />
              </div>
            )}
            <motion.div
              className="absolute -top-4 -right-4 text-white"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles className="h-8 w-8" />
            </motion.div>
          </motion.div>
          <p className="text-white/80 text-lg">Best Beauty and Wellness Center in Jayanagar</p>
        </motion.div>

        {/* Loading stage text */}
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-center mb-6"
        >
          <p className="text-white text-lg font-medium">{loadingText}</p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(to right, #FFD500, #FF007F)",
                width: `${progress}%`,
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <div className="mt-2 flex justify-between text-white/80 text-sm">
            <span>Loading your experience</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Animated beauty icons */}
        <div className="relative h-20 mb-4">
          <AnimatePresence>
            {beautyIcons.map((icon, index) => {
              // Only show icons for current and previous stages
              if (index > stage * 2 + 1) return null

              return (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    color: icon.color,
                    left: `${(index % 9) * 11 + 1}%`,
                    top: index % 2 === 0 ? "0%" : "50%",
                  }}
                  initial={{ y: 50, opacity: 0, scale: 0 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -50, opacity: 0, scale: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * index,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 10, 0, -10, 0],
                      scale: [1, 1.1, 1, 0.9, 1],
                    }}
                    transition={{
                      duration: 3 + index,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    {icon.icon}
                  </motion.div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Loading tips */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white/70 text-sm italic"
          >
            {
              [
                "Our salon uses premium products for all treatments",
                "Try our signature Hydrafacial for glowing skin",
                "Book any 5 services and save with our ₹999 combo offer",
                "We offer advanced weight loss and slimming treatments",
                "Thank you for choosing Siri Beauty & Wellness",
              ][stage]
            }
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [0, -100],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
