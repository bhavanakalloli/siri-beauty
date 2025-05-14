"use client"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Sparkles, Star, Heart, Scissors } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"

interface MicrobladingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function MicrobladingDialog({ open, onOpenChange }: MicrobladingDialogProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClicking, setIsClicking] = useState(false)
  const dialogContentRef = useRef<HTMLDivElement>(null)
  const sparklesRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorGlowRef = useRef<HTMLDivElement>(null)
  const sparklePoolRef = useRef<HTMLDivElement[]>([])
  const lastSparkleTime = useRef(0)
  const animationFrameRef = useRef<number | null>(null)

  // Initialize sparkle pool
  useEffect(() => {
    if (!open) return

    // Create sparkle pool
    const createSparklePool = () => {
      if (!sparklesRef.current) return

      // Clear existing sparkles
      while (sparklesRef.current.firstChild) {
        sparklesRef.current.removeChild(sparklesRef.current.firstChild)
      }

      sparklePoolRef.current = []

      // Create pool of sparkle elements
      for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement("div")
        sparkle.className = "absolute pointer-events-none"
        sparkle.style.width = "0px"
        sparkle.style.height = "0px"
        sparkle.style.borderRadius = "50%"
        sparkle.style.background = "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,0,127,0.5) 100%)"
        sparkle.style.boxShadow = "0 0 10px 2px rgba(255, 0, 127, 0.3)"
        sparkle.style.transform = "translate(-50%, -50%) scale(0)"
        sparkle.style.opacity = "0"
        sparkle.style.position = "absolute"
        sparkle.style.zIndex = "100"

        sparklePoolRef.current.push(sparkle)
        sparklesRef.current.appendChild(sparkle)
      }
    }

    // Initialize cursor and sparkle pool with a slight delay to ensure DOM is ready
    const initTimer = setTimeout(() => {
      createSparklePool()

      // Create initial sparkles in the center of the dialog
      if (dialogContentRef.current && sparklesRef.current) {
        const rect = dialogContentRef.current.getBoundingClientRect()
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        // Create a burst of sparkles
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            createSparkle(centerX + (Math.random() * 100 - 50), centerY + (Math.random() * 100 - 50))
          }, i * 50)
        }
      }
    }, 100)

    return () => {
      clearTimeout(initTimer)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [open])

  // Create sparkle effect
  const createSparkle = (x: number, y: number) => {
    if (!sparklesRef.current) return

    // Throttle sparkle creation
    const now = performance.now()
    if (now - lastSparkleTime.current < 20) return
    lastSparkleTime.current = now

    // Find an available sparkle from the pool
    const availableSparkle = sparklePoolRef.current.find(
      (el) => el.style.opacity === "0" || Number.parseFloat(el.style.opacity) <= 0.1,
    )

    if (!availableSparkle) return

    // Reset and position the sparkle
    const size = Math.random() * 10 + 5
    availableSparkle.style.width = `${size}px`
    availableSparkle.style.height = `${size}px`
    availableSparkle.style.left = `${x}px`
    availableSparkle.style.top = `${y}px`
    availableSparkle.style.transform = "translate(-50%, -50%) scale(0)"
    availableSparkle.style.opacity = "1"

    // Random animation
    const duration = Math.random() * 800 + 400
    const angle = Math.random() * Math.PI * 2
    const distance = Math.random() * 80 + 40
    const destX = Math.cos(angle) * distance
    const destY = Math.sin(angle) * distance

    // Use requestAnimationFrame for smoother animation
    let startTime: number | null = null
    const animateSparkle = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function
      const easeOutQuad = (t: number) => t * (2 - t)
      const easedProgress = easeOutQuad(progress)

      // Apply animation
      const scaleValue = progress < 0.5 ? progress * 2 : 2 - progress * 2
      const translateX = destX * easedProgress
      const translateY = destY * easedProgress
      const opacity = progress < 0.7 ? 1 : 1 - (progress - 0.7) / 0.3

      availableSparkle.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(${scaleValue})`
      availableSparkle.style.opacity = `${opacity}`

      if (progress < 1) {
        requestAnimationFrame(animateSparkle)
      } else {
        availableSparkle.style.opacity = "0"
      }
    }

    requestAnimationFrame(animateSparkle)
  }

  // Handle mouse events
  useEffect(() => {
    if (!open || !dialogContentRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!dialogContentRef.current) return

      const rect = dialogContentRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Update cursor position
      setMousePosition({ x, y })

      // Update cursor element positions directly for smoother movement
      if (cursorRef.current) {
        cursorRef.current.style.left = `${x}px`
        cursorRef.current.style.top = `${y}px`
      }

      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${x}px`
        cursorGlowRef.current.style.top = `${y}px`
      }

      // Create sparkles occasionally
      if (Math.random() > 0.7) {
        createSparkle(x, y)
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true)

      if (!dialogContentRef.current) return
      const rect = dialogContentRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Create a burst of sparkles on click
      for (let i = 0; i < 10; i++) {
        setTimeout(() => createSparkle(x, y), i * 30)
      }
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [open])

  // Decorative elements
  const DecorativeElement = ({ className }: { className: string }) => (
    <motion.div
      className={`absolute w-12 h-12 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 opacity-30 ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    />
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white p-0 rounded-xl border-none shadow-[0_0_50px_rgba(255,0,127,0.15)]">
            <div ref={dialogContentRef} className="relative overflow-hidden">
              {/* Cursor effects container */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-[100]">
                {/* Main cursor glow */}
                <div
                  ref={cursorGlowRef}
                  className="absolute pointer-events-none z-[101] rounded-full mix-blend-screen"
                  style={{
                    background: "radial-gradient(circle, rgba(255,0,127,0.7) 0%, rgba(255,255,255,0) 70%)",
                    width: "300px",
                    height: "300px",
                    left: mousePosition.x,
                    top: mousePosition.y,
                    transform: "translate(-50%, -50%)",
                    filter: "blur(5px) brightness(1.5)",
                    opacity: isClicking ? 0.9 : 0.7,
                    transition: "opacity 0.3s, transform 0.3s",
                    willChange: "transform, opacity",
                  }}
                />

                {/* Sparkle container */}
                <div ref={sparklesRef} className="absolute inset-0 pointer-events-none z-[102] overflow-hidden" />

                {/* Small cursor dot */}
                <div
                  ref={cursorRef}
                  className="absolute pointer-events-none z-[103] rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,0,127,0.7) 100%)",
                    boxShadow: "0 0 15px 5px rgba(255, 0, 127, 0.5)",
                    width: "15px",
                    height: "15px",
                    left: mousePosition.x,
                    top: mousePosition.y,
                    transform: `translate(-50%, -50%) scale(${isClicking ? 1.5 : 1})`,
                    transition: "transform 0.3s",
                    willChange: "transform, left, top",
                  }}
                >
                  {/* Inner sparkle */}
                  <div
                    className="absolute inset-0 rounded-full animate-pulse"
                    style={{
                      background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
                      animation: "pulse 1.5s infinite ease-in-out",
                    }}
                  />
                </div>
              </div>

              {/* Decorative elements */}
              <DecorativeElement className="top-[-20px] left-[10%] z-10" />
              <DecorativeElement className="top-[30%] right-[-20px] z-10" />
              <DecorativeElement className="bottom-[10%] left-[-20px] z-10" />

              <DialogHeader className="p-6 md:p-8 bg-gradient-to-r from-[#FF007F] to-[#FF5A36] text-white rounded-t-xl relative overflow-hidden">
                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-10 z-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.4) 0%, transparent 8%), radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 8%)",
                    backgroundSize: "60px 60px",
                  }}
                  animate={{
                    backgroundPosition: ["0px 0px", "60px 60px"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />

                <motion.div
                  className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/20 p-1 rounded-full cursor-pointer hover:bg-white/40 transition-colors z-20"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onOpenChange(false)}
                >
                  <X className="h-4 w-4 md:h-6 md:w-6" />
                </motion.div>

                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <DialogTitle className="text-xl md:text-3xl font-bold flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
                    >
                      <Sparkles className="h-5 w-5 md:h-7 md:w-7" />
                    </motion.div>
                    Microblading Services
                  </DialogTitle>

                  <DialogDescription className="text-white/90 text-sm md:text-base mt-2">
                    Expert eyebrow enhancement techniques at Siri Beauty and Wellness Center
                  </DialogDescription>
                </motion.div>
              </DialogHeader>

              <div className="p-4 md:p-8 bg-gradient-to-b from-white to-pink-50/30 relative z-20">
                {/* Introduction Section */}
                <motion.div
                  className="mb-6 md:mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                    <div className="md:w-1/2">
                      <h3 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4 text-[#FF007F] flex items-center">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                          className="mr-2"
                        >
                          <Heart className="h-5 w-5 md:h-6 md:w-6 text-[#FF007F]" />
                        </motion.div>
                        Transform Your Eyebrows
                      </h3>
                      <motion.p
                        className="text-sm md:text-base text-gray-700 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        Microblading is a semi-permanent eyebrow enhancement technique that uses fine strokes to mimic
                        natural hairs. It gives fuller, well-defined brows that last for up to 2–3 years, transforming
                        your look and saving you time on your daily makeup routine.
                      </motion.p>
                    </div>
                    <motion.div
                      className="md:w-1/2 rounded-xl overflow-hidden shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <Image
                        src="/microblading-transformation.png"
                        alt="Microblading transformation"
                        width={500}
                        height={300}
                        className="w-full h-auto object-cover"
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Types of Microblading Section */}
                <motion.div
                  className="mb-6 md:mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h3 className="text-lg md:text-2xl font-semibold mb-3 md:mb-6 text-[#FF007F] flex items-center">
                    <motion.div
                      animate={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 4 }}
                      className="mr-2"
                    >
                      <Scissors className="h-5 w-5 md:h-6 md:w-6 text-[#FF007F]" />
                    </motion.div>
                    Types of Microblading
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {[
                      {
                        title: "Classic Microblading (Hair Stroke Brows)",
                        description:
                          "Fine, hair-like strokes are drawn manually using a blade. Best for: Sparse or uneven brows needing a natural look.",
                        image: "/classic-microblading.png",
                        color: "from-pink-500 to-rose-400",
                      },
                      {
                        title: "Microshading (Powder Brows / Ombre Brows)",
                        description:
                          "Uses a stippling method (dotting technique) to create a soft, powdered effect. Best for: Oily or sensitive skin; people wanting a makeup-filled look.",
                        image: "/microshading-powder-brows.png",
                        color: "from-fuchsia-500 to-purple-400",
                      },
                      {
                        title: "Combination Brows (Microblading + Microshading)",
                        description:
                          "Hair strokes at the front + shaded tails for density. Best for: Those wanting both natural texture and depth.",
                        image: "/combination-brows-microblading.png",
                        color: "from-rose-400 to-pink-500",
                      },
                      {
                        title: "Nano Brows",
                        description:
                          "Done with a machine using ultra-fine needles to create detailed hair strokes. Best for: All skin types, especially oily or mature skin.",
                        image: "/nano-brows-technique.png",
                        color: "from-purple-400 to-fuchsia-500",
                      },
                      {
                        title: "Blade and Shade",
                        description:
                          "Manual hair strokes + manual shading (no machine). Best for: Those wanting more intensity and definition.",
                        image: "/blade-and-shade-eyebrows.png",
                        color: "from-pink-400 to-rose-300",
                      },
                    ].map((type, index) => (
                      <motion.div
                        key={type.title}
                        className="bg-white rounded-xl p-4 shadow-md border border-[#FF007F]/10 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300 z-0" />
                        <div className="mb-3 rounded-lg overflow-hidden relative z-10">
                          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                            <Image
                              src={type.image || "/placeholder.svg"}
                              alt={type.title}
                              width={300}
                              height={200}
                              className="w-full h-[120px] md:h-[150px] object-cover"
                            />
                          </motion.div>
                          <motion.div
                            className={`absolute top-2 right-2 bg-gradient-to-r ${type.color} text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 * index, duration: 0.3 }}
                          >
                            Popular
                          </motion.div>
                        </div>
                        <h4 className="text-sm md:text-lg font-semibold mb-1 md:mb-2 text-[#FF007F]">{type.title}</h4>
                        <p className="text-xs md:text-sm text-gray-600">{type.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Benefits Section */}
                <motion.div
                  className="mb-6 md:mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <h3 className="text-lg md:text-2xl font-semibold mb-3 md:mb-6 text-[#FF007F] flex items-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                      className="mr-2"
                    >
                      <Star className="h-5 w-5 md:h-6 md:w-6 text-[#FF007F]" />
                    </motion.div>
                    Benefits of Microblading
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {[
                      {
                        benefit: "Time-saving",
                        description: "No need to fill in brows daily.",
                        color: "from-pink-500/10 to-rose-400/10",
                      },
                      {
                        benefit: "Natural-looking results",
                        description: "Especially with hair stroke techniques.",
                        color: "from-fuchsia-500/10 to-purple-400/10",
                      },
                      {
                        benefit: "Long-lasting",
                        description: "Results typically last 1–3 years with touch-ups.",
                        color: "from-rose-400/10 to-pink-500/10",
                      },
                      {
                        benefit: "Waterproof/sweatproof",
                        description: "Won't smudge or run.",
                        color: "from-purple-400/10 to-fuchsia-500/10",
                      },
                      {
                        benefit: "Customizable",
                        description: "Shape, color, and density tailored to your face and preferences.",
                        color: "from-pink-400/10 to-rose-300/10",
                      },
                      {
                        benefit: "Confidence boost",
                        description: "Enhances facial features and symmetry.",
                        color: "from-fuchsia-400/10 to-purple-300/10",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.benefit}
                        className={`bg-gradient-to-r ${item.color} rounded-xl p-3 md:p-4 border border-[#FF007F]/10 hover:shadow-md transition-shadow duration-300`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 * index + 0.5 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <h4 className="text-sm md:text-base font-semibold mb-1 text-[#FF007F] flex items-center">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 1,
                              delay: index * 0.2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatDelay: 5,
                            }}
                          >
                            <Check className="mr-1 h-3 w-3 md:h-4 md:w-4 inline-block" />
                          </motion.div>
                          {item.benefit}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-600">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Before & After Gallery */}
                <motion.div
                  className="mb-6 md:mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <h3 className="text-lg md:text-2xl font-semibold mb-3 md:mb-6 text-[#FF007F] flex items-center">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 4 }}
                      className="mr-2"
                    >
                      <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-[#FF007F]" />
                    </motion.div>
                    Before & After Gallery
                  </h3>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {[1, 2].map((item, index) => (
                      <motion.div
                        key={item}
                        className="rounded-xl overflow-hidden shadow-md relative group"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.2, duration: 0.6 }}
                        whileHover={{ scale: 1.03 }}
                      >
                        <Image
                          src={`/microblading-transformation.png`}
                          alt={`Before and after microblading ${item}`}
                          width={500}
                          height={300}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <div className="p-3 md:p-4 text-white">
                            <p className="text-xs md:text-sm font-medium">Client transformation {item}</p>
                            <p className="text-xs opacity-80">Real results, no filters</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                  className="text-center mt-6 md:mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      className="bg-gradient-to-r from-[#FF007F] to-[#FF5A36] text-white hover:opacity-90 px-6 md:px-10 py-2 md:py-6 rounded-full text-sm md:text-lg shadow-lg shadow-pink-500/20 relative overflow-hidden group"
                      onClick={() => {
                        onOpenChange(false)
                        // Dispatch custom event
                        window.dispatchEvent(new CustomEvent("microbladingDialogClosed", { bubbles: true }))
                        // Also handle direct navigation as fallback
                        const contactSection = document.getElementById("contact")
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                    >
                      <motion.span
                        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        animate={{
                          x: ["0%", "100%"],
                          opacity: [0, 0.1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 1,
                        }}
                      />
                      Book Your Microblading Consultation
                    </Button>
                  </motion.div>
                  <motion.p
                    className="text-xs md:text-sm text-gray-500 mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    Limited slots available this month • Special introductory pricing
                  </motion.p>
                </motion.div>
              </div>

              {/* Add cursor animation styles */}
              <style jsx global>{`
                @keyframes pulse {
                  0% { opacity: 0.5; transform: scale(0.5); }
                  50% { opacity: 1; transform: scale(1.5); }
                  100% { opacity: 0.5; transform: scale(0.5); }
                }
                
                /* Add subtle hover effect to all interactive elements inside the dialog */
                .dialog-content a, 
                .dialog-content button, 
                .dialog-content [role="button"] {
                  transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                
                .dialog-content a:hover, 
                .dialog-content button:hover, 
                .dialog-content [role="button"]:hover {
                  transform: scale(1.03);
                  box-shadow: 0 0 20px rgba(255, 0, 127, 0.5);
                }
              `}</style>
            </div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}
