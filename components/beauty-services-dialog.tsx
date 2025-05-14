"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scissors, Sparkles, Flower, Heart, Star, Palette, Gem } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BeautyServicesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function BeautyServicesDialog({ open, onOpenChange }: BeautyServicesDialogProps) {
  // Refs for cursor effects
  const dialogContentRef = useRef<HTMLDivElement>(null)
  const sparklesRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const sparklePool = useRef<HTMLDivElement[]>([])
  const sparkleIndex = useRef(0)
  const isAnimating = useRef(false)

  // Create sparkle elements
  useEffect(() => {
    if (!sparklesRef.current || !open) return

    // Clear existing sparkles
    sparklesRef.current.innerHTML = ""
    sparklePool.current = []

    // Create sparkle pool
    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement("div")
      sparkle.className =
        "absolute w-3 h-3 md:w-5 md:h-5 rounded-full bg-white opacity-0 pointer-events-none transition-all duration-700 z-50"
      sparkle.style.boxShadow = "0 0 10px 2px rgba(255, 255, 255, 0.8), 0 0 20px 6px rgba(255, 105, 180, 0.6)"
      sparkle.style.top = "0px"
      sparkle.style.left = "0px"
      sparklesRef.current.appendChild(sparkle)
      sparklePool.current.push(sparkle)
    }

    // Add initial sparkles around the content
    if (dialogContentRef.current) {
      const rect = dialogContentRef.current.getBoundingClientRect()
      for (let i = 0; i < 5; i++) {
        createSparkle(Math.random() * rect.width, Math.random() * rect.height, Math.random() * 360, 1 + Math.random())
      }
    }
  }, [open])

  // Track mouse position
  useEffect(() => {
    if (!open) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!dialogContentRef.current) return

      const rect = dialogContentRef.current.getBoundingClientRect()
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }

      if (!isAnimating.current && Math.random() > 0.85) {
        createSparkle(mousePosition.current.x, mousePosition.current.y, Math.random() * 360, 1 + Math.random())
      }
    }

    const handleClick = () => {
      if (!dialogContentRef.current) return

      // Create multiple sparkles on click
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          createSparkle(
            mousePosition.current.x + (Math.random() - 0.5) * 40,
            mousePosition.current.y + (Math.random() - 0.5) * 40,
            Math.random() * 360,
            1 + Math.random() * 2,
          )
        }, i * 50)
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    dialogContentRef.current?.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      dialogContentRef.current?.removeEventListener("click", handleClick)
    }
  }, [open])

  // Create sparkle animation
  const createSparkle = (x: number, y: number, hue: number, scale: number) => {
    if (!sparklePool.current.length) return

    isAnimating.current = true
    const sparkle = sparklePool.current[sparkleIndex.current]
    sparkleIndex.current = (sparkleIndex.current + 1) % sparklePool.current.length

    const size = 3 + Math.random() * 10
    sparkle.style.width = `${size}px`
    sparkle.style.height = `${size}px`
    sparkle.style.left = `${x}px`
    sparkle.style.top = `${y}px`
    sparkle.style.transform = `scale(${scale}) rotate(${Math.random() * 360}deg)`
    sparkle.style.boxShadow = `0 0 ${10 + scale * 5}px ${2 + scale}px rgba(255, 255, 255, 0.8), 0 0 ${
      20 + scale * 10
    }px ${6 + scale * 2}px rgba(255, 105, 180, 0.6)`
    sparkle.style.opacity = "0"

    // Animate the sparkle
    setTimeout(() => {
      sparkle.style.opacity = "1"
    }, 10)

    setTimeout(() => {
      sparkle.style.opacity = "0"
    }, 700)

    setTimeout(() => {
      isAnimating.current = false
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={dialogContentRef}
        className="max-w-[95vw] max-h-[90vh] w-[1000px] overflow-y-auto bg-gradient-to-b from-[#FFF5F9] to-[#FFF] p-0 rounded-xl border border-[#FF007F]/20 shadow-[0_0_30px_10px_rgba(255,0,127,0.1)]"
      >
        {/* Sparkles container */}
        <div ref={sparklesRef} className="absolute inset-0 pointer-events-none z-50"></div>

        <DialogHeader className="p-6 md:p-8 bg-gradient-to-r from-[#FF007F]/10 to-[#FF5A36]/10 rounded-t-xl border-b border-[#FF007F]/10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-[#FF007F] flex items-center gap-2">
              <Scissors className="h-6 w-6 md:h-8 md:w-8" />
              <span>Beauty Services</span>
              <motion.div
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.2, 1, 0.9, 1],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Sparkles className="h-5 w-5 md:h-7 md:w-7 text-[#FF5A36] ml-2" />
              </motion.div>
            </DialogTitle>
            <DialogDescription className="text-sm md:text-base text-gray-600 mt-2">
              Discover our comprehensive range of beauty services designed to enhance your natural beauty and provide a
              relaxing, rejuvenating experience.
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <Tabs defaultValue="facials" className="p-6 md:p-8">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 bg-[#FFF5F9] p-1 rounded-lg mb-6">
            <TabsTrigger
              value="facials"
              className="data-[state=active]:bg-[#FF007F] data-[state=active]:text-white rounded-md text-xs md:text-sm"
            >
              Facials
            </TabsTrigger>
            <TabsTrigger
              value="pedicure"
              className="data-[state=active]:bg-[#FF007F] data-[state=active]:text-white rounded-md text-xs md:text-sm"
            >
              Pedicure
            </TabsTrigger>
            <TabsTrigger
              value="manicure"
              className="data-[state=active]:bg-[#FF007F] data-[state=active]:text-white rounded-md text-xs md:text-sm"
            >
              Manicure
            </TabsTrigger>
            <TabsTrigger
              value="hair"
              className="data-[state=active]:bg-[#FF007F] data-[state=active]:text-white rounded-md text-xs md:text-sm"
            >
              Hair Services
            </TabsTrigger>
            <TabsTrigger
              value="waxing"
              className="data-[state=active]:bg-[#FF007F] data-[state=active]:text-white rounded-md text-xs md:text-sm"
            >
              Waxing
            </TabsTrigger>
            <TabsTrigger
              value="bleach"
              className="data-[state=active]:bg-[#FF007F] data-[state=active]:text-white rounded-md text-xs md:text-sm"
            >
              Bleach
            </TabsTrigger>
          </TabsList>

          {/* Facials Content */}
          <TabsContent value="facials" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-[#FF007F]/10">
                <h3 className="text-lg md:text-xl font-semibold text-[#FF007F] mb-3 flex items-center">
                  <Flower className="h-5 w-5 md:h-6 md:w-6 mr-2" />
                  Rejuvenate Your Skin
                </h3>
                <p className="text-sm md:text-base text-gray-700 mb-4">
                  Rejuvenate your skin with our customized facials, designed to target different skin concerns and
                  restore your natural glow.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {[
                    {
                      name: "Fruit Facial",
                      description:
                        "A gentle, natural treatment ideal for sensitive or young skin, packed with vitamins from fruit extracts.",
                      icon: <Flower />,
                    },
                    {
                      name: "Gold Facial",
                      description:
                        "Infused with 24k gold particles to improve blood circulation, reduce wrinkles, and give a radiant glow.",
                      icon: <Star />,
                    },
                    {
                      name: "Pearl Facial",
                      description:
                        "Ideal for brightening dull skin; enriched with pearl extracts to improve complexion and smooth texture.",
                      icon: <Gem />,
                    },
                    {
                      name: "Diamond Facial",
                      description:
                        "A luxurious exfoliating facial that helps remove dead skin and boost cell regeneration.",
                      icon: <Sparkles />,
                    },
                    {
                      name: "Whitening Facial",
                      description: "Targets pigmentation and uneven tone to promote brighter, clearer skin.",
                      icon: <Heart />,
                    },
                    {
                      name: "De-Tan Facial",
                      description: "Designed to remove sun tan and restore your skin's natural tone and freshness.",
                      icon: <Palette />,
                    },
                  ].map((facial, index) => (
                    <motion.div
                      key={facial.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-[#FFF5F9] p-3 md:p-4 rounded-lg border border-[#FF007F]/10 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start">
                        <div className="text-[#FF007F] mr-3 mt-1">{facial.icon}</div>
                        <div>
                          <h4 className="font-medium text-sm md:text-base">{facial.name}</h4>
                          <p className="text-xs md:text-sm text-gray-600 mt-1">{facial.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative h-[200px] md:h-[250px] rounded-xl overflow-hidden"
                >
                  <Image src="/luxury-facial-spa.png" alt="Luxury Facial Treatment" fill className="object-cover" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative h-[200px] md:h-[250px] rounded-xl overflow-hidden"
                >
                  <Image src="/treatments/laser2.jpg" alt="Gold Facial Treatment" fill className="object-cover" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative h-[200px] md:h-[250px] rounded-xl overflow-hidden"
                >
                  <Image
                    src="/treatments/Laser 1.avif"
                    alt="Diamond Facial Treatment"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Button
                  className="bg-gradient-to-r from-[#FF007F] to-[#FF5A36] hover:opacity-90 text-white rounded-full px-6 py-2"
                  onClick={() => {
                    onOpenChange(false)
                    // Dispatch custom event
                    window.dispatchEvent(new CustomEvent("beautyServicesDialogClosed", { bubbles: true }))
                    // Also handle direct navigation as fallback
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Book a Facial Treatment
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Pedicure Content */}
          <TabsContent value="pedicure" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-[#FF007F]/10">
                <h3 className="text-lg md:text-xl font-semibold text-[#FF007F] mb-3 flex items-center">
                  <Sparkles className="h-5 w-5 md:h-6 md:w-6 mr-2" />
                  Pamper Your Feet
                </h3>
                <p className="text-sm md:text-base text-gray-700 mb-4">
                  Pamper your feet with our relaxing and revitalizing pedicure treatments.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {[
                    {
                      name: "Ice Cream Pedicure",
                      description: "A fun, moisturizing treat with dessert-like fragrances and creamy products.",
                      icon: <Heart />,
                    },
                    {
                      name: "Crystal Pedicure",
                      description: "Detoxifies and smooths your feet using mineral-rich crystals for a polished feel.",
                      icon: <Gem />,
                    },
                    {
                      name: "Paraffin Pedicure",
                      description: "Softens cracked heels and deeply hydrates with warm paraffin wax.",
                      icon: <Flower />,
                    },
                    {
                      name: "Aroma Pedicure",
                      description:
                        "Combines essential oils and massage to relax your senses while nourishing your feet.",
                      icon: <Sparkles />,
                    },
                  ].map((pedicure, index) => (
                    <motion.div
                      key={pedicure.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-[#FFF5F9] p-3 md:p-4 rounded-lg border border-[#FF007F]/10 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start">
                        <div className="text-[#FF007F] mr-3 mt-1">{pedicure.icon}</div>
                        <div>
                          <h4 className="font-medium text-sm md:text-base">{pedicure.name}</h4>
                          <p className="text-xs md:text-sm text-gray-600 mt-1">{pedicure.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative h-[200px] md:h-[250px] rounded-xl overflow-hidden"
                >
                  <Image src="/luxury-pedicure-spa.png" alt="Luxury Pedicure Treatment" fill className="object-cover" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative h-[200px] md:h-[250px] rounded-xl overflow-hidden"
                >
                  <Image
                    src="/treatments/pedicuar.jpg"
                    alt="Crystal Pedicure Treatment"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Button
                  className="bg-gradient-to-r from-[#FF007F] to-[#FF5A36] hover:opacity-90 text-white rounded-full px-6 py-2"
                  onClick={() => {
                    onOpenChange(false)
                    // Dispatch custom event
                    window.dispatchEvent(new CustomEvent("beautyServicesDialogClosed", { bubbles: true }))
                    // Also handle direct navigation as fallback
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Book a Pedicure Treatment
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Manicure Content */}
          <TabsContent value="manicure" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-[#FF007F]/10">
                <h3 className="text-lg md:text-xl font-semibold text-[#FF007F] mb-3 flex items-center">
                  <Gem className="h-5 w-5 md:h-6 md:w-6 mr-2" />
                  Beautiful Hands
                </h3>
                <p className="text-sm md:text-base text-gray-700 mb-4">
                  Get beautifully groomed hands with our manicure services, which mirror the pedicure range for complete
                  coordination.
                </p>

                <div className="bg-[#FFF5F9] p-4 md:p-6 rounded-lg border border-[#FF007F]/10 mt-4">
                  <h4 className="font-medium text-base md:text-lg mb-2">All Pedicure Options Available</h4>
                  <p className="text-sm md:text-base text-gray-600">
                    Choose from ice cream, crystal, paraffin, or aroma styles for your manicure as well!
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                    {["Ice Cream", "Crystal", "Paraffin", "Aroma"].map((type, index) => (
                      <motion.div
                        key={type}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                        className="bg-white p-2 md:p-3 rounded-md text-center text-sm font-medium text-[#FF007F] shadow-sm"
                      >
                        {type}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative h-[200px] md:h-[250px] rounded-xl overflow-hidden"
                >
                  <Image
                    src="/treatments/manicure.jpg"
                    alt="Luxury Manicure Treatment"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative h-[200px] md:h-[250px] rounded-xl overflow-hidden"
                >
                  <Image src="/treatments/Manicure 2.jpg" alt="Nail Art Manicure" fill className="object-cover" />
                </motion.div>
              </div>
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Button
                  className="bg-gradient-to-r from-[#FF007F] to-[#FF5A36] hover:opacity-90 text-white rounded-full px-6 py-2"
                  onClick={() => {
                    onOpenChange(false)
                    // Dispatch custom event
                    window.dispatchEvent(new CustomEvent("beautyServicesDialogClosed", { bubbles: true }))
                    // Also handle direct navigation as fallback
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Book a Manicure Treatment
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Hair Services Content */}
          <TabsContent value="hair" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-[#FF007F]/10">
                <h3 className="text-lg md:text-xl font-semibold text-[#FF007F] mb-3 flex items-center">
                  <Scissors className="h-5 w-5 md:h-6 md:w-6 mr-2" />
                  Hair Services
                </h3>
                <p className="text-sm md:text-base text-gray-700 mb-4">
                  We offer a range of hair services to transform and maintain healthy, beautiful hair.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {[
                    {
                      name: "Hair Spa",
                      description: "Deep conditioning and massage to nourish your scalp and strands.",
                      icon: <Heart />,
                    },
                    {
                      name: "Hair Cut & Styling",
                      description: "Trendy and classic cuts tailored to your face shape and style.",
                      icon: <Scissors />,
                    },
                    {
                      name: "Hair Coloring",
                      description: "From highlights to global color, using high-quality products.",
                      icon: <Palette />,
                    },
                    {
                      name: "Smoothening/Rebonding",
                      description: "Achieve sleek, frizz-free hair with our expert treatments.",
                      icon: <Sparkles />,
                    },
                  ].map((service, index) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-[#FFF5F9] p-3 md:p-4 rounded-lg border border-[#FF007F]/10 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start">
                        <div className="text-[#FF007F] mr-3 mt-1">{service.icon}</div>
                        <div>
                          <h4 className="font-medium text-sm md:text-base">{service.name}</h4>
                          <p className="text-xs md:text-sm text-gray-600 mt-1">{service.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative h-[200px] md:h-[250px] rounded-xl overflow-hidden"
                >
                  <Image src="/treatments/Hair spa.avif" alt="Hair Spa Treatment" fill className="object-cover" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative h-[200px] md:h-[250px] rounded-xl overflow-hidden"
                >
                  <Image src="/treatments/hair coloring.jpg" alt="Hair Styling" fill className="object-cover" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="relative h-[200px] md:h-[250px] rounded-xl overflow-hidden"
                >
                  <Image src="/hair-coloring-salon.png" alt="Hair Coloring" fill className="object-cover" />
                </motion.div>
              </div>
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Button
                  className="bg-gradient-to-r from-[#FF007F] to-[#FF5A36] hover:opacity-90 text-white rounded-full px-6 py-2"
                  onClick={() => {
                    onOpenChange(false)
                    // Dispatch custom event
                    window.dispatchEvent(new CustomEvent("beautyServicesDialogClosed", { bubbles: true }))
                    // Also handle direct navigation as fallback
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Book a Hair Treatment
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Waxing Services Content */}
          <TabsContent value="waxing" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-[#FF007F]/10">
                <h3 className="text-lg md:text-xl font-semibold text-[#FF007F] mb-3 flex items-center">
                  <Sparkles className="h-5 w-5 md:h-6 md:w-6 mr-2" />
                  Waxing Services
                </h3>
                <p className="text-sm md:text-base text-gray-700 mb-4">
                  Enjoy smooth, hair-free skin with our range of waxing options.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {[
                    "Painless Wax",
                    "Full Arm / Half Arm",
                    "Full Body / Half Body",
                    "Chocolate Wax",
                    "Honey Wax",
                    "Rica Wax",
                    "Half Leg / Full Leg",
                    "Underarm Wax",
                    "Face Wax",
                    "Bikini Wax",
                  ].map((service, index) => (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-[#FFF5F9] p-3 md:p-4 rounded-lg border border-[#FF007F]/10 hover:shadow-md transition-all duration-300 text-center"
                    >
                      <h4 className="font-medium text-sm md:text-base text-[#FF007F]">{service}</h4>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative h-[200px] md:h-[250px] rounded-xl overflow-hidden"
                >
                  <Image src="/treatments/waxing 2.jpeg" alt="Waxing Treatment" fill className="object-cover" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative h-[200px] md:h-[250px] rounded-xl overflow-hidden"
                >
                  <Image src="/treatments/waxing 1.jpeg" alt="Chocolate Wax Treatment" fill className="object-cover" />
                </motion.div>
              </div>
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Button
                  className="bg-gradient-to-r from-[#FF007F] to-[#FF5A36] hover:opacity-90 text-white rounded-full px-6 py-2"
                  onClick={() => {
                    onOpenChange(false)
                    // Dispatch custom event
                    window.dispatchEvent(new CustomEvent("beautyServicesDialogClosed", { bubbles: true }))
                    // Also handle direct navigation as fallback
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Book a Waxing Treatment
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Bleach Services Content */}
          <TabsContent value="bleach" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-[#FF007F]/10">
                <h3 className="text-lg md:text-xl font-semibold text-[#FF007F] mb-3 flex items-center">
                  <Gem className="h-5 w-5 md:h-6 md:w-6 mr-2" />
                  Bleach Services
                </h3>
                <p className="text-sm md:text-base text-gray-700 mb-4">
                  Give your skin an instant glow and lighter appearance with our bleaching services.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {[
                    {
                      name: "Herbal Bleach",
                      description: "Natural ingredients to brighten and soothe skin.",
                      icon: <Flower />,
                    },
                    {
                      name: "Gold Bleach",
                      description: "Adds a golden shine and helps reduce dullness.",
                      icon: <Star />,
                    },
                    {
                      name: "Oxy Bleach",
                      description: "Oxygen-enriched formula that gives a clean, fairer appearance.",
                      icon: <Sparkles />,
                    },
                    {
                      name: "Detan Bleach",
                      description: "Combats tanning and lightens stubborn dark patches.",
                      icon: <Heart />,
                    },
                  ].map((bleach, index) => (
                    <motion.div
                      key={bleach.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-[#FFF5F9] p-3 md:p-4 rounded-lg border border-[#FF007F]/10 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start">
                        <div className="text-[#FF007F] mr-3 mt-1">{bleach.icon}</div>
                        <div>
                          <h4 className="font-medium text-sm md:text-base">{bleach.name}</h4>
                          <p className="text-xs md:text-sm text-gray-600 mt-1">{bleach.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative h-[200px] md:h-[250px] rounded-xl overflow-hidden"
                >
                  <Image src="/treatments/Bleach1.png" alt="Facial Bleach Treatment" fill className="object-cover" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative h-[200px] md:h-[250px] rounded-xl overflow-hidden"
                >
                  <Image src="/treatments/Bleach2.webp" alt="Gold Bleach Treatment" fill className="object-cover" />
                </motion.div>
              </div>
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Button
                  className="bg-gradient-to-r from-[#FF007F] to-[#FF5A36] hover:opacity-90 text-white rounded-full px-6 py-2"
                  onClick={() => {
                    onOpenChange(false)
                    // Dispatch custom event
                    window.dispatchEvent(new CustomEvent("beautyServicesDialogClosed", { bubbles: true }))
                    // Also handle direct navigation as fallback
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Book a Bleach Treatment
                </Button>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
