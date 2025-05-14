"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Diamond, Sparkles, Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface BeautyTreatmentsProps {
  inView: boolean
}

export default function BeautyTreatments({ inView }: BeautyTreatmentsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="container px-4 relative z-10 max-w-6xl mx-auto"> {/* Increased max-width */}
      <motion.div
        className="text-center mb-5 md:mb-8" // Increased margin
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 md:mb-3" // Increased font sizes
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          Luxury Beauty Treatments
        </motion.h2>

        <motion.div
          className="h-1 w-12 md:w-16 bg-[#FF007F] mx-auto rounded-full" // Increased height and width
          initial={{ width: 0 }}
          animate={inView ? { width: 48 } : { width: 0 }} // Increased animation width
          transition={{ duration: 1, delay: 0.3 }}
        />

        <motion.p
          className="text-xs md:text-sm text-gray-600 max-w-lg mx-auto mt-2 md:mt-3" // Increased font size and margin
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Experience the ultimate in beauty and wellness with our premium treatments
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"> {/* Increased gap */}
        {/* Advanced Facial Treatments */}
        <motion.div
          className="bg-pink-50 rounded-lg md:rounded-xl p-3 md:p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-pink-200 overflow-hidden" // Increased padding and shadow
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ y: -5, scale: 1.02 }} // Increased hover effect
        >
          <div className="relative h-32 md:h-40 mb-3 rounded-lg overflow-hidden"> {/* Increased height */}
            <Image src="/treatments/Advanced1.png" alt="Advanced Facial Treatments" fill className="object-cover" />
            <div className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full"> {/* Increased padding */}
              <Diamond className="h-4 w-4 text-[#FF007F]" /> {/* Increased icon size */}
            </div>
          </div>

          <h3 className="text-base md:text-lg font-semibold mb-1.5 text-[#FF007F]"> {/* Increased font size and margin */}
            Advanced Facial Treatments
          </h3>

          <p className="text-xs md:text-sm text-gray-600 mb-3"> {/* Increased font size and margin */}
            Hydrafacial and Skin Brightening treatments for glowing skin
          </p>

          <Button
            className="w-full bg-white hover:bg-[#FF007F] text-[#FF007F] hover:text-white border border-[#FF007F] transition-colors group text-xs md:text-sm py-1.5 h-auto" // Increased height and padding
            onClick={() => {
              const contactSection = document.getElementById("contact")
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Book Now
            <Sparkles className="ml-1.5 h-3 w-3 group-hover:text-white" /> {/* Increased icon size */}
          </Button>
        </motion.div>

        {/* Skin Correction Therapies */}
        <motion.div
          className="bg-pink-50 rounded-lg md:rounded-xl p-3 md:p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-pink-200 overflow-hidden" // Increased padding and shadow
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ y: -5, scale: 1.02 }} // Increased hover effect
        >
          <div className="relative h-32 md:h-40 mb-3 rounded-lg overflow-hidden"> {/* Increased height */}
            <Image src="/treatments/Advanced2.png" alt="Skin Correction Therapies" fill className="object-cover" />
            <div className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full"> {/* Increased padding */}
              <Sparkles className="h-4 w-4 text-[#FF007F]" /> {/* Increased icon size */}
            </div>
          </div>

          <h3 className="text-base md:text-lg font-semibold mb-1.5 text-[#FF007F]"> {/* Increased font size and margin */}
            Skin Correction Therapies
          </h3>

          <p className="text-xs md:text-sm text-gray-600 mb-3"> {/* Increased font size and margin */}
            Acne & Pimple Marks, Pigmentation Removal, Anti-Aging
          </p>

          <Button
            className="w-full bg-white hover:bg-[#FF007F] text-[#FF007F] hover:text-white border border-[#FF007F] transition-colors group text-xs md:text-sm py-1.5 h-auto" // Increased height and padding
            onClick={() => {
              const contactSection = document.getElementById("contact")
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Book Now
            <Sparkles className="ml-1.5 h-3 w-3 group-hover:text-white" /> {/* Increased icon size */}
          </Button>
        </motion.div>

        {/* PRP for Face */}
        <motion.div
          className="bg-pink-50 rounded-lg md:rounded-xl p-3 md:p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-pink-200 overflow-hidden" // Increased padding and shadow
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ y: -5, scale: 1.02 }} // Increased hover effect
        >
          <div className="relative h-32 md:h-40 mb-3 rounded-lg overflow-hidden"> {/* Increased height */}
            <Image src="/treatments/Advanced3.png" alt="PRP for Face" fill className="object-cover" />
            <div className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full"> {/* Increased padding */}
              <Clock className="h-4 w-4 text-[#FF007F]" /> {/* Increased icon size */}
            </div>
          </div>

          <h3 className="text-base md:text-lg font-semibold mb-1.5 text-[#FF007F]"> {/* Increased font size and margin */}
            PRP for Face
          </h3>

          <p className="text-xs md:text-sm text-gray-600 mb-3"> {/* Increased font size and margin */}
            Rejuvenate your skin with platelet-rich plasma therapy
          </p>

          <Button
            className="w-full bg-white hover:bg-[#FF007F] text-[#FF007F] hover:text-white border border-[#FF007F] transition-colors group text-xs md:text-sm py-1.5 h-auto" // Increased height and padding
            onClick={() => {
              const contactSection = document.getElementById("contact")
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Book Now
            <Sparkles className="ml-1.5 h-3 w-3 group-hover:text-white" /> {/* Increased icon size */}
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="mt-5 md:mt-8 text-center" // Increased margin
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Button
          size="sm"
          className="bg-gradient-to-r from-[#FF007F] to-[#FF5A36] text-white hover:opacity-90 text-xs md:text-sm px-4 py-2 md:py-3 rounded-full" // Increased padding
          onClick={() => {
            const contactSection = document.getElementById("contact")
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" })
            }
          }}
        >
          Book Your Beauty Treatment Today
          <Sparkles className="ml-1.5 h-3 w-3 md:h-4 md:w-4" /> {/* Increased icon size */}
        </Button>
      </motion.div>
    </div>
  )
}