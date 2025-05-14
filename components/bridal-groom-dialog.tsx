"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Heart, Crown, Sparkle, Scissors, Gem, Brush, PenTool, Palette, Flower, Droplet, Sun } from "lucide-react"
import Image from "next/image"

interface BridalGroomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function BridalGroomDialog({ open, onOpenChange }: BridalGroomDialogProps) {
  // Refs for cursor animation
  const dialogContentRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const sparklesContainerRef = useRef<HTMLDivElement>(null)

  // State for active section
  const [activeSection, setActiveSection] = useState<"bridal" | "preBridal" | "preGroom">("bridal")

  // Create sparkle elements for cursor animation
  useEffect(() => {
    if (!open) return

    // Cursor following effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!dialogContentRef.current || !cursorRef.current || !sparklesContainerRef.current) return

      const dialogRect = dialogContentRef.current.getBoundingClientRect()
      const x = e.clientX - dialogRect.left
      const y = e.clientY - dialogRect.top

      // Update cursor position
      cursorRef.current.style.left = `${x}px`
      cursorRef.current.style.top = `${y}px`
    }

    // Handle mouse clicks to create sparkles
    const handleMouseClick = (e: MouseEvent) => {
      if (!dialogContentRef.current || !sparklesContainerRef.current) return

      const dialogRect = dialogContentRef.current.getBoundingClientRect()
      const x = e.clientX - dialogRect.left
      const y = e.clientY - dialogRect.top

      // Create multiple sparkles on click
      for (let i = 0; i < 10; i++) {
        createSparkle(x, y)
      }
    }

    // Create a single sparkle
    const createSparkle = (x: number, y: number) => {
      if (!sparklesContainerRef.current) return

      const sparkle = document.createElement("div")
      sparkle.className = "absolute w-3 h-3 rounded-full bg-pink-400/30 animate-sparkle"
      sparkle.style.left = `${x + (Math.random() - 0.5) * 100}px`
      sparkle.style.top = `${y + (Math.random() - 0.5) * 100}px`
      sparkle.style.scale = `${0.3 + Math.random() * 0.7}`
      sparkle.style.opacity = "0.7"
      sparklesContainerRef.current.appendChild(sparkle)

      // Remove sparkle after animation
      setTimeout(() => {
        if (sparklesContainerRef.current?.contains(sparkle)) {
          sparklesContainerRef.current.removeChild(sparkle)
        }
      }, 1500)
    }

    // Add initial sparkles
    const addInitialSparkles = () => {
      if (!dialogContentRef.current) return

      const dialogRect = dialogContentRef.current.getBoundingClientRect()
      const centerX = dialogRect.width / 2
      const centerY = dialogRect.height / 3

      for (let i = 0; i < 20; i++) {
        createSparkle(centerX, centerY)
      }
    }

    // Add event listeners
    const dialogContentElement = dialogContentRef.current
    if (dialogContentElement) {
      dialogContentElement.addEventListener("mousemove", handleMouseMove)
      dialogContentElement.addEventListener("click", handleMouseClick)

      // Add initial sparkles with a delay to ensure dialog is visible
      setTimeout(addInitialSparkles, 200)
    }

    // Clean up
    return () => {
      if (dialogContentElement) {
        dialogContentElement.removeEventListener("mousemove", handleMouseMove)
        dialogContentElement.removeEventListener("click", handleMouseClick)
      }
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl w-[95vw] sm:w-[90vw] max-h-[90vh] overflow-y-auto bg-white rounded-xl p-0"
        ref={dialogContentRef}
      >
        {/* Custom cursor elements */}
        <div
          ref={cursorRef}
          className="fixed w-20 h-20 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: "radial-gradient(circle, rgba(244,114,182,0.3) 0%, rgba(255,255,255,0) 70%)",
            mixBlendMode: "screen",
          }}
        />
        <div ref={sparklesContainerRef} className="absolute inset-0 pointer-events-none z-[99] overflow-hidden" />

        {/* Gradient Header */}
        <DialogHeader className="p-4 sm:p-6 bg-gradient-to-r from-[#FF007F] to-[#FFD500] text-white rounded-t-xl relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Crown className="w-20 sm:w-40 h-20 sm:h-40 text-white" />
          </div>
          <DialogTitle className="text-xl sm:text-2xl md:text-4xl font-bold flex items-center gap-2">
            <Crown className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
            <span className="font-dance">Bridal & Groom Services</span>
          </DialogTitle>
          <DialogDescription className="text-white/90 text-sm sm:text-lg md:text-xl font-medium">
            Premium beauty services for your special day at Siri Beauty and Wellness Center
          </DialogDescription>
        </DialogHeader>

        {/* Content */}
        <div className="p-3 sm:p-4 md:p-6">
          {/* Navigation Tabs */}
          <div className="flex mb-4 sm:mb-6 border-b border-pink-100 overflow-x-auto">
            <button
              onClick={() => setActiveSection("bridal")}
              className={`px-2 sm:px-4 py-1 sm:py-2 font-medium text-xs sm:text-sm md:text-base flex items-center gap-1 whitespace-nowrap ${
                activeSection === "bridal"
                  ? "text-[#FF007F] border-b-2 border-[#FF007F]"
                  : "text-gray-600 hover:text-[#FF007F]"
              }`}
            >
              <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Bridal & Groom</span>
            </button>
            <button
              onClick={() => setActiveSection("preBridal")}
              className={`px-2 sm:px-4 py-1 sm:py-2 font-medium text-xs sm:text-sm md:text-base flex items-center gap-1 whitespace-nowrap ${
                activeSection === "preBridal"
                  ? "text-[#FF007F] border-b-2 border-[#FF007F]"
                  : "text-gray-600 hover:text-[#FF007F]"
              }`}
            >
              <Flower className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Pre-Bridal</span>
            </button>
            <button
              onClick={() => setActiveSection("preGroom")}
              className={`px-2 sm:px-4 py-1 sm:py-2 font-medium text-xs sm:text-sm md:text-base flex items-center gap-1 whitespace-nowrap ${
                activeSection === "preGroom"
                  ? "text-[#FF007F] border-b-2 border-[#FF007F]"
                  : "text-gray-600 hover:text-[#FF007F]"
              }`}
            >
              <Scissors className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Pre-Groom</span>
            </button>
          </div>

          {/* Bridal & Groom Services Content */}
          <AnimatePresence mode="wait">
            {activeSection === "bridal" && (
              <motion.div
                key="bridal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="mb-6 sm:mb-8 max-w-3xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <motion.h3
                    className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-[#FF007F]"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    <span>Transform Your Special Day</span>
                  </motion.h3>

                  <motion.p
                    className="text-xs sm:text-sm md:text-base text-gray-700 mb-4 sm:mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Make your big day truly unforgettable with our exclusive bridal and groom services, specially
                    curated to enhance your natural beauty and boost your confidence. We understand that every bride and
                    groom deserves to look and feel their best, which is why we offer a complete range of grooming,
                    beauty, and styling solutions tailored to suit your personality and wedding theme.
                  </motion.p>

                  <motion.div
                    className="mb-4 sm:mb-6 rounded-lg overflow-hidden shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Image
                      src="/bridal-makeup-beauty.png"
                      alt="Bridal Services"
                      width={800}
                      height={300}
                      className="w-full h-auto object-cover max-h-[150px] sm:max-h-[200px] md:max-h-[300px]"
                    />
                  </motion.div>

                  <motion.h4
                    className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-[#FF007F]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    Bridal and Groom Services
                  </motion.h4>

                  {/* Services Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    {[
                      {
                        title: "Nail Services",
                        icon: <PenTool className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF007F]" />,
                        description:
                          "Our comprehensive nail services ensure your hands and feet are celebration-ready. From manicures and pedicures to cuticle care and nail shaping, we provide a clean, polished look perfect for your special day.",
                      },
                      {
                        title: "Gel Nail Polishes",
                        icon: <Palette className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF007F]" />,
                        description:
                          "Experience long-lasting shine and vibrant color with our premium gel nail polish options. Designed to resist chipping and dullness, gel nails keep your hands looking flawless throughout the wedding festivities.",
                      },
                      {
                        title: "Nail Art",
                        icon: <Brush className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF007F]" />,
                        description:
                          "Add a touch of creativity and glamour with customized nail art. From intricate bridal patterns to subtle shimmer, our skilled technicians design nail art that complements your outfit and personal style.",
                      },
                      {
                        title: "Makeup Services",
                        icon: <Sparkle className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF007F]" />,
                        description:
                          "Our expert makeup artists specialize in both traditional and HD makeup to create a flawless bridal or groom look. We tailor every detail to your skin tone, attire, and event theme, ensuring you look radiant in person and on camera.",
                      },
                      {
                        title: "Hair Do",
                        icon: <Scissors className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF007F]" />,
                        description:
                          "Whether it's elegant updos, soft curls, or sleek styles, our hair styling professionals work with your hair type and desired look to create the perfect hairstyle that stays in place from vows to celebrations.",
                      },
                      {
                        title: "Saree Draping",
                        icon: <Gem className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF007F]" />,
                        description:
                          "Perfect the traditional look with professional saree draping services. We offer multiple draping styles, ensuring your saree fits comfortably and looks elegant for photos and long hours of celebration.",
                      },
                    ].map((service, index) => (
                      <motion.div
                        key={service.title}
                        className="bg-white rounded-lg shadow-md p-3 sm:p-4 border border-pink-100 hover:border-pink-300 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(255, 0, 127, 0.1)" }}
                      >
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                          <div className="p-1.5 sm:p-2 bg-pink-50 rounded-full">{service.icon}</div>
                          <h4 className="font-semibold text-sm sm:text-base text-gray-800">{service.title}</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">{service.description}</p>
                      </motion.div>
                    ))}
                    {[
                      {
                        title: "Haircut & Styling",
                        icon: <Scissors className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF007F]" />,
                        description: "Custom haircut and style for a clean, polished look.",
                      },
                      {
                        title: "Beard Shaping",
                        icon: <PenTool className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF007F]" />,
                        description: "Defines beard lines and enhances facial structure.",
                      },
                      {
                        title: "Hair Spa",
                        icon: <Droplet className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF007F]" />,
                        description: "Deep conditioning treatment for healthy, shiny hair.",
                      },
                      {
                        title: "Hair Color",
                        icon: <Palette className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF007F]" />,
                        description: "Covers greys or adds a stylish new tone.",
                      },
                      {
                        title: "De-Tan Facial",
                        icon: <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF007F]" />,
                        description: "Removes sun tan and revives natural skin tone.",
                      },
                    ].map((service, index) => (
                      <motion.div
                        key={service.title}
                        className="bg-white rounded-lg shadow-md p-3 sm:p-4 border border-pink-100 hover:border-pink-300 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + (index + 6) * 0.1 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(255, 0, 127, 0.1)" }}
                      >
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                          <div className="p-1.5 sm:p-2 bg-pink-50 rounded-full">{service.icon}</div>
                          <h4 className="font-semibold text-sm sm:text-base text-gray-800">{service.title}</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">{service.description}</p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="mt-6 sm:mt-8 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Button
                      className="bg-gradient-to-r from-[#FF007F] to-[#FFD500] hover:opacity-90 text-white rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm"
                      onClick={() => {
                        onOpenChange(false)
                        // Dispatch custom event
                        window.dispatchEvent(new CustomEvent("bridalGroomDialogClosed", { bubbles: true }))
                        // Also handle direct navigation as fallback
                        const contactSection = document.getElementById("contact")
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                    >
                      Book Your Bridal Service Now
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Pre-Bridal Packages Content */}
            {activeSection === "preBridal" && (
              <motion.div
                key="preBridal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="mb-6 sm:mb-8 max-w-3xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <motion.h3
                    className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-[#FF007F]"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Flower className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    <span>🌸 Pre-Bridal Packages</span>
                  </motion.h3>

                  <motion.p
                    className="text-xs sm:text-sm md:text-base text-gray-700 mb-4 sm:mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Prepare for your special day with our curated pre-bridal packages designed to enhance your natural
                    beauty and boost your confidence.
                  </motion.p>

                  <motion.div
                    className="mb-4 sm:mb-6 rounded-lg overflow-hidden shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Image
                      src="/pre-bridal-beauty.png"
                      alt="Pre-Bridal Packages"
                      width={800}
                      height={300}
                      className="w-full h-auto object-cover max-h-[150px] sm:max-h-[200px] md:max-h-[300px]"
                    />
                  </motion.div>

                  {/* Pre-Bridal Packages */}
                  <div className="space-y-4 sm:space-y-6">
                    {[
                      {
                        title: "Glow & Go (Basic)",
                        tagline: "Ideal for brides on the go.",
                        includes: "Clean-up, threading, waxing, manicure, pedicure, and basic facial.",
                        duration: "2–3 hours",
                        color: "from-pink-400 to-red-400",
                      },
                      {
                        title: "Radiant Bride (Standard)",
                        tagline: "Designed for a fresh, de-tanned, and glowing skin tone.",
                        includes:
                          "Body waxing, full body polish, advanced facial, manicure-pedicure with massage, hair spa.",
                        duration: "1–2 days",
                        color: "from-pink-500 to-purple-500",
                      },
                      {
                        title: "Luxury Bridal Ritual (Premium)",
                        tagline: "A head-to-toe pampering package to leave you glowing.",
                        includes:
                          "Skin detox treatment, full body scrub and wrap, aromatherapy massage, luxury facial, hair spa, hand & foot spa, and trial makeup.",
                        duration: "Multiple sessions (7–10 days before the wedding)",
                        color: "from-[#FF007F] to-[#FFD500]",
                      },
                    ].map((package_, index) => (
                      <motion.div
                        key={package_.title}
                        className="bg-white rounded-lg shadow-md overflow-hidden border border-pink-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(255, 0, 127, 0.1)" }}
                      >
                        <div className={`p-3 sm:p-4 bg-gradient-to-r ${package_.color} text-white`}>
                          <h4 className="font-semibold text-sm sm:text-lg">{package_.title}</h4>
                          <p className="text-white/90 text-xs sm:text-sm">{package_.tagline}</p>
                        </div>
                        <div className="p-3 sm:p-4">
                          <div className="mb-1 sm:mb-2">
                            <span className="font-medium text-xs sm:text-sm text-gray-700">Includes:</span>
                            <p className="text-xs sm:text-sm text-gray-600">{package_.includes}</p>
                          </div>
                          <div>
                            <span className="font-medium text-xs sm:text-sm text-gray-700">Duration:</span>
                            <p className="text-xs sm:text-sm text-gray-600">{package_.duration}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="mt-6 sm:mt-8 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Button
                      className="bg-gradient-to-r from-[#FF007F] to-[#FFD500] hover:opacity-90 text-white rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm"
                      onClick={() => {
                        onOpenChange(false)
                        // Dispatch custom event
                        window.dispatchEvent(new CustomEvent("bridalGroomDialogClosed", { bubbles: true }))
                        // Also handle direct navigation as fallback
                        const contactSection = document.getElementById("contact")
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                    >
                      Schedule Your Pre-Bridal Consultation
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* Pre-Groom Packages Content */}
            {activeSection === "preGroom" && (
              <motion.div
                key="preGroom"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="mb-6 sm:mb-8 max-w-3xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <motion.h3
                    className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-[#FF007F]"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Crown className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    <span>🤵 Pre-Groom Packages</span>
                  </motion.h3>

                  <motion.p
                    className="text-xs sm:text-sm md:text-base text-gray-700 mb-4 sm:mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Look your absolute best on your wedding day with our specialized pre-groom packages designed for
                    modern men.
                  </motion.p>

                  <motion.div
                    className="mb-4 sm:mb-6 rounded-lg overflow-hidden shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Image
                      src="/well-groomed-man.png"
                      alt="Pre-Groom Packages"
                      width={800}
                      height={300}
                      className="w-full h-auto object-cover max-h-[150px] sm:max-h-[200px] md:max-h-[300px]"
                    />
                  </motion.div>

                  {/* Pre-Groom Packages */}
                  <div className="space-y-4 sm:space-y-6">
                    {[
                      {
                        title: "Gentlemen's Refresh (Basic)",
                        tagline: "Quick grooming for the modern groom.",
                        includes: "Haircut, beard styling, clean-up, and manicure.",
                        duration: "1–2 hours",
                        color: "from-blue-400 to-indigo-500",
                      },
                      {
                        title: "Grooming Glow-Up (Standard)",
                        tagline: "Focused on skin clarity and relaxation.",
                        includes: "Facial, hair spa, body polish, manicure, pedicure, and tan removal.",
                        duration: "1–2 days",
                        color: "from-indigo-500 to-purple-500",
                      },
                      {
                        title: "The Royal Groom (Premium)",
                        tagline: "A complete rejuvenation experience.",
                        includes:
                          "Premium facial, full body massage, detan therapy, body spa, hand & foot care, and hair & beard styling.",
                        duration: "Multiple sessions (up to 7 days before the event)",
                        color: "from-[#0077B6] to-[#00B4D8]",
                      },
                    ].map((package_, index) => (
                      <motion.div
                        key={package_.title}
                        className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 119, 182, 0.1)" }}
                      >
                        <div className={`p-3 sm:p-4 bg-gradient-to-r ${package_.color} text-white`}>
                          <h4 className="font-semibold text-sm sm:text-lg">{package_.title}</h4>
                          <p className="text-white/90 text-xs sm:text-sm">{package_.tagline}</p>
                        </div>
                        <div className="p-3 sm:p-4">
                          <div className="mb-1 sm:mb-2">
                            <span className="font-medium text-xs sm:text-sm text-gray-700">Includes:</span>
                            <p className="text-xs sm:text-sm text-gray-600">{package_.includes}</p>
                          </div>
                          <div>
                            <span className="font-medium text-xs sm:text-sm text-gray-700">Duration:</span>
                            <p className="text-xs sm:text-sm text-gray-600">{package_.duration}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="mt-6 sm:mt-8 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Button
                      className="bg-gradient-to-r from-[#0077B6] to-[#00B4D8] hover:opacity-90 text-white rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm"
                      onClick={() => {
                        onOpenChange(false)
                        // Dispatch custom event
                        window.dispatchEvent(new CustomEvent("bridalGroomDialogClosed", { bubbles: true }))
                        // Also handle direct navigation as fallback
                        const contactSection = document.getElementById("contact")
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                    >
                      Book Your Pre-Groom Package
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CSS for sparkle animation */}
          <style jsx global>{`
            @keyframes sparkle {
              0% { transform: scale(0); opacity: 0; }
              50% { transform: scale(1); opacity: 0.7; }
              100% { transform: scale(0); opacity: 0; }
            }
            .animate-sparkle {
              animation: sparkle 1.5s forwards;
              pointer-events: none;
            }
          `}</style>
        </div>
      </DialogContent>
    </Dialog>
  )
}
