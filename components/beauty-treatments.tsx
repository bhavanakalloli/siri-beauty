"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Sparkles, Droplet, FlaskRoundIcon as Flask, Scissors, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BeautyTreatmentsProps {
  inView: boolean
}

export default function BeautyTreatments({ inView }: BeautyTreatmentsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="container px-4 relative z-10">
      <motion.div
        className="text-center mb-8 md:mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF007F] to-[#FF5A36]"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          Advanced Beauty Treatments
        </motion.h2>

        <motion.div
          className="h-1 w-16 md:w-20 bg-gradient-to-r from-[#FF007F] to-[#FF5A36] mx-auto rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: 64 } : { width: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        <motion.p
          className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto mt-2 md:mt-4"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Discover our range of advanced beauty treatments designed to enhance your natural beauty and boost your
          confidence
        </motion.p>
      </motion.div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"> */}
        {/* HydraFacial Treatment */}
        {/* <motion.div
          className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#FF007F]/10 h-full flex flex-col"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <div className="text-[#FF007F] mb-3 md:mb-4">
            <Droplet className="h-6 w-6 md:h-8 md:w-8" />
          </div>
          <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-3">HydraFacial</h3>
          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 flex-grow">
            HydraFacial is a patented skin treatment available in medical spas and dermatology offices. It's the only
            hydradermabrasion procedure that uses patented technology to cleanse, extract, and hydrate.
          </p> */}
          {/* <div className="mt-auto">
            <h4 className="text-sm md:text-base font-medium mb-2">Benefits:</h4>
            <ul className="text-xs md:text-sm text-gray-600 space-y-1">
              <li className="flex items-start">
                <span className="text-[#FF007F] mr-1 text-xs">❯</span>
                <span>Deep cleansing and exfoliation</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF007F] mr-1 text-xs">❯</span>
                <span>Painless extractions</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF007F] mr-1 text-xs">❯</span>
                <span>Hydration and antioxidant protection</span>
              </li>
            </ul>
          </div>
        </motion.div> */}

        {/* Chemical Peels Treatment */}
        {/* <motion.div
          className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#FF007F]/10 h-full flex flex-col"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <div className="text-[#FF007F] mb-3 md:mb-4">
            <Flask className="h-6 w-6 md:h-8 md:w-8" />
          </div>
          <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-3">Chemical Peels</h3>
          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 flex-grow">
            Chemical peels are skin-resurfacing treatments that use safe acid solutions to exfoliate the outer layers of
            the skin. This stimulates skin regeneration, helping treat acne, pigmentation, fine lines, and uneven skin
            tone.
          </p>
          <div className="mt-auto">
            <h4 className="text-sm md:text-base font-medium mb-2">Benefits:</h4>
            <ul className="text-xs md:text-sm text-gray-600 space-y-1">
              <li className="flex items-start">
                <span className="text-[#FF007F] mr-1 text-xs">❯</span>
                <span>Removes dead skin cells for a smoother complexion</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF007F] mr-1 text-xs">❯</span>
                <span>Fades dark spots, acne scars, and pigmentation</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF007F] mr-1 text-xs">❯</span>
                <span>Stimulates collagen and cell turnover</span>
              </li>
            </ul>
          </div>
        </motion.div> */}

        {/* Microdermabrasion Treatment */}
        {/* <motion.div
          className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#FF007F]/10 h-full flex flex-col"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <div className="text-[#FF007F] mb-3 md:mb-4">
            <Scissors className="h-6 w-6 md:h-8 md:w-8" />
          </div>
          <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-3">Microdermabrasion</h3>
          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 flex-grow">
            Microdermabrasion is a non-invasive exfoliation technique that uses a diamond tip or crystals to gently
            remove the outermost layer of dead skin. It reveals fresher, younger-looking skin underneath and enhances
            product absorption.
          </p>
          <div className="mt-auto">
            <h4 className="text-sm md:text-base font-medium mb-2">Benefits:</h4>
            <ul className="text-xs md:text-sm text-gray-600 space-y-1">
              <li className="flex items-start">
                <span className="text-[#FF007F] mr-1 text-xs">❯</span>
                <span>Gently exfoliates and smoothens skin</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF007F] mr-1 text-xs">❯</span>
                <span>Reduces fine lines, acne scars, and sun damage</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF007F] mr-1 text-xs">❯</span>
                <span>Promotes even skin tone and glow</span>
              </li>
            </ul>
          </div>
        </motion.div> */}

        {/* LED Therapy Treatment */}
        {/* <motion.div
          className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#FF007F]/10 h-full flex flex-col"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <div className="text-[#FF007F] mb-3 md:mb-4">
            <Lightbulb className="h-6 w-6 md:h-8 md:w-8" />
          </div>
          <h3 className="text-base md:text-xl font-semibold mb-2 md:mb-3">LED Therapy</h3>
          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 flex-grow">
            LED Therapy uses different wavelengths of light (like red, blue, and green) to target various skin concerns
            such as acne, inflammation, aging, and dullness — all without heat or discomfort.
          </p>
          <div className="mt-auto">
            <h4 className="text-sm md:text-base font-medium mb-2">Benefits:</h4>
            <ul className="text-xs md:text-sm text-gray-600 space-y-1">
              <li className="flex items-start">
                <span className="text-[#FF007F] mr-1 text-xs">❯</span>
                <span>Blue light kills acne-causing bacteria</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF007F] mr-1 text-xs">❯</span>
                <span>Red light stimulates collagen and reduces wrinkles</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF007F] mr-1 text-xs">❯</span>
                <span>Green light helps with pigmentation and skin tone</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div> */}

      <motion.div
        className="mt-8 md:mt-12 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Button
          size="sm"
          className="bg-gradient-to-r from-[#FF007F] to-[#FF5A36] text-white hover:opacity-90 text-xs md:text-lg px-4 md:px-8 py-2 md:py-6 rounded-full"
          onClick={() => {
            const contactSection = document.getElementById("contact")
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" })
            }
          }}
        >
          Book Your Beauty Treatment Today
          <Sparkles className="ml-1 md:ml-2 h-3 w-3 md:h-5 md:w-5" />
        </Button>
      </motion.div>
    </div>
  )
}
