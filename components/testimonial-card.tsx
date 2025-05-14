"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  image: string
  quote: string
  text: string
}

interface TestimonialCardProps {
  inView: boolean
}

export default function TestimonialCard({ inView }: TestimonialCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Vaishnavi Shetty",
      image: "/placeholder.svg?height=80&width=80",
      quote: "Best weight loss program in Jayanagar!",
      text: "I've tried many weight loss programs, but Siri Beauty and Wellness offered personalized plans that actually worked for me. Lost 8kg in just 2 months!",
    },
    {
      id: 2,
      name: "Priya Sha",
      image: "/placeholder.svg?height=80&width=80",
      quote: "Amazing Hydrafacial results!",
      text: "The hydrafacial treatment at Siri Beauty completely transformed my skin. The staff was professional and the results were visible after just one session.",
    },
    {
      id: 3,
      name: "Bhavya Sharma",
      image: "/placeholder.svg?height=80&width=80",
      quote: "PRP hair treatment worked wonders!",
      text: "I was skeptical about PRP for hair regrowth, but after 3 sessions at Siri Hair Clinic, I can see significant improvement. Highly recommended!",
    },
  ]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100, rotateY: 45 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          exit={{ opacity: 0, x: -100, rotateY: -45 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <Card className="border-[#FF007F]/10 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: 90 }}
                  transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
                  className="relative"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-[#FF007F]/20 relative z-10">
                    <Image
                      src={testimonials[currentIndex].image || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <motion.div
                    className="absolute -top-2 -right-2 text-[#FF007F]"
                    animate={{
                      rotate: [0, 10, 0, -10, 0],
                      scale: [1, 1.2, 1, 0.8, 1],
                    }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <Quote className="h-8 w-8" />
                  </motion.div>
                </motion.div>

                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <h3 className="text-xl md:text-2xl font-semibold mb-2 text-[#FF007F]">
                      "{testimonials[currentIndex].quote}"
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">{testimonials[currentIndex].text}</p>
                    <p className="mt-4 font-medium text-sm md:text-base">{testimonials[currentIndex].name}</p>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mt-6 gap-4">
        <motion.button
          onClick={handlePrev}
          className="bg-white p-3 rounded-full shadow-md hover:shadow-lg text-[#FF007F] border border-[#FF007F]/10"
          whileHover={{ scale: 1.2, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>

        <motion.button
          onClick={handleNext}
          className="bg-white p-3 rounded-full shadow-md hover:shadow-lg text-[#FF007F] border border-[#FF007F]/10"
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  )
}
