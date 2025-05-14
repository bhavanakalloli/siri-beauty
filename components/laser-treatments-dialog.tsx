"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sparkles, Zap, Flame, Sun, Scissors, Lightbulb, ArrowRight, Check } from "lucide-react"
import CursorEffects from "./cursor-effects"

interface LaserTreatmentsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function LaserTreatmentsDialog({ open, onOpenChange }: LaserTreatmentsDialogProps) {
  // Add console log to verify props
  useEffect(() => {
    console.log("LaserTreatmentsDialog - open state:", open)
  }, [open])

  // Refs for cursor effects
  const dialogContentRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [contentRect, setContentRect] = useState({ top: 0, left: 0, width: 0, height: 0 })

  // Reset scroll position when dialog opens
  useEffect(() => {
    if (open && dialogContentRef.current) {
      dialogContentRef.current.scrollTop = 0
    }
  }, [open])

  // Update content rect for cursor effects
  useEffect(() => {
    if (open && dialogContentRef.current) {
      const updateRect = () => {
        const rect = dialogContentRef.current?.getBoundingClientRect()
        if (rect) {
          setContentRect({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          })
        }
      }

      updateRect()
      window.addEventListener("resize", updateRect)
      return () => window.removeEventListener("resize", updateRect)
    }
  }, [open])

  // Track mouse position for cursor effects
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dialogContentRef.current) {
      const rect = dialogContentRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  // Handle dialog close and dispatch event
  const handleOpenChange = (newOpen: boolean) => {
    console.log("LaserTreatmentsDialog - handleOpenChange:", newOpen)
    onOpenChange(newOpen)
    if (!newOpen) {
      // Dispatch event when dialog closes
      const event = new CustomEvent("laserTreatmentsDialogClosed", { bubbles: true })
      document.dispatchEvent(event)
    }
  }

  // Scroll to contact section
  const scrollToContact = () => {
    onOpenChange(false)
    setTimeout(() => {
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" })
      }
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        ref={dialogContentRef}
        onMouseMove={handleMouseMove}
        className="bg-gradient-to-b from-pink-50 to-white max-w-4xl w-[90vw] max-h-[85vh] overflow-y-auto p-0 rounded-2xl border border-pink-200"
      >
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#FF007F] to-[#FF5A36] text-white p-4 md:p-6 rounded-t-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-3xl font-bold flex items-center gap-2">
              <Zap className="h-6 w-6 md:h-8 md:w-8" />
              Laser Treatments
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-4 md:p-6 lg:p-8 relative">
          {/* Cursor effects */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <CursorEffects
              mouseX={mousePosition.x}
              mouseY={mousePosition.y}
              contentRect={contentRect}
              sparkleColors={["#FF007F", "#FF5A36", "#FFD500"]}
            />
          </div>

          <div className="relative z-10">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
                <Sparkles className="inline-block mr-2 text-[#FF007F]" />
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Laser treatments use focused light energy to target specific skin and hair concerns with precision.
                These non-invasive or minimally invasive procedures are safe, effective, and offer long-lasting results
                for skin rejuvenation, hair removal, pigmentation, acne scars, and more.
              </p>
            </motion.div>

            {/* Popular Laser Treatments & Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
                <Zap className="inline-block mr-2 text-[#FF007F]" />
                Popular Laser Treatments & Benefits
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {[
                  {
                    title: "Laser Hair Removal",
                    benefit: "Long-term hair reduction for smoother, hair-free skin with minimal discomfort.",
                    icon: <Scissors />,
                  },
                  {
                    title: "Laser Skin Rejuvenation",
                    benefit: "Reduces wrinkles, fine lines, and dullness by boosting collagen production.",
                    icon: <Sparkles />,
                  },
                  {
                    title: "Laser Pigmentation Removal",
                    benefit: "Fades dark spots, sun damage, melasma, and uneven skin tone safely.",
                    icon: <Sun />,
                  },
                  {
                    title: "Laser Acne Scar Treatment",
                    benefit: "Smoothens skin texture and fades acne scars by resurfacing the skin.",
                    icon: <Zap />,
                  },
                  {
                    title: "Laser Tattoo Removal",
                    benefit:
                      "Breaks down ink particles safely over multiple sessions with minimal damage to surrounding skin.",
                    icon: <Flame />,
                  },
                  {
                    title: "Laser Skin Tightening",
                    benefit: "Firms loose or sagging skin by stimulating natural collagen, with no downtime.",
                    icon: <Lightbulb />,
                  },
                ].map((treatment, index) => (
                  <motion.div
                    key={treatment.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    className="bg-white p-4 rounded-xl shadow-md border border-pink-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-[#FF007F] mt-1">{treatment.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{treatment.title}</h3>
                        <p className="text-gray-600 text-sm">{treatment.benefit}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* General Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
                <Check className="inline-block mr-2 text-[#FF007F]" />
                General Benefits of Laser Treatments
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Non-surgical and safe with fast recovery",
                  "Customizable to skin type and concern",
                  "Visible, lasting results with minimal sessions",
                  "Boosts skin clarity, texture, and youthfulness",
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="text-[#FF007F] flex-shrink-0">
                      <Check className="h-5 w-5" />
                    </div>
                    <p className="text-gray-700">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 text-center"
            >
              <Button
                onClick={scrollToContact}
                className="bg-gradient-to-r from-[#FF007F] to-[#FF5A36] text-white hover:opacity-90 px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book Your Laser Treatment Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
