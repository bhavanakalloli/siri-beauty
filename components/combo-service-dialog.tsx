"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sparkles, Clock, CheckCircle2, Star, ArrowRight, Scissors, Brush, Droplet, Heart, Feather } from "lucide-react"

// Service details data
const serviceDetails = {
  facial: {
    title: "Luxury Facial",
    description:
      "Our signature facial treatment deeply cleanses, exfoliates, and hydrates your skin for a radiant glow.",
    image: "/treatments/Facial.jpg",
    duration: "45-60 minutes",
    benefits: [
      "Deep cleansing and pore purification",
      "Gentle exfoliation to remove dead skin cells",
      "Hydrating mask for intense moisture",
      "Facial massage to improve circulation",
      "Customized to your skin type and concerns",
    ],
    icon: <Droplet className="h-4 w-4 sm:h-6 sm:w-6" />,
  },
  threading: {
    title: "Eyebrow Threading",
    description: "Precise eyebrow shaping using the ancient technique of threading for clean, defined brows.",
    image: "/treatments/Threading.jpg",
    duration: "15-20 minutes",
    benefits: [
      "Precise hair removal for perfect brow shape",
      "Less irritation compared to waxing",
      "Longer-lasting results than tweezing",
      "Suitable for sensitive skin",
      "Includes brow styling consultation",
    ],
    icon: <Scissors className="h-4 w-4 sm:h-6 sm:w-6" />,
  },
  pedicure: {
    title: "Spa Pedicure",
    description:
      "Rejuvenate your feet with our luxurious pedicure that includes soaking, exfoliation, massage, and polish.",
    image: "/treatments/pedicuar.jpg",
    duration: "45-60 minutes",
    benefits: [
      "Softens calluses and rough skin",
      "Relaxing foot massage improves circulation",
      "Nail shaping and cuticle care",
      "Exfoliation removes dead skin cells",
      "Includes polish application of your choice",
    ],
    icon: <Feather className="h-4 w-4 sm:h-6 sm:w-6" />,
  },
  manicure: {
    title: "Classic Manicure",
    description:
      "Pamper your hands with our classic manicure that includes nail shaping, cuticle care, hand massage, and polish.",
    image: "C:/treatments/manicure.jpg",
    duration: "30-45 minutes",
    benefits: [
      "Professional nail shaping and filing",
      "Gentle cuticle care and treatment",
      "Relaxing hand massage with moisturizer",
      "Nail buffing for natural shine",
      "Includes polish application of your choice",
    ],
    icon: <Heart className="h-4 w-4 sm:h-6 sm:w-6" />,
  },
  "head-massage": {
    title: "Relaxing Head Massage",
    description: "Relieve stress and tension with our therapeutic head massage that focuses on pressure points.",
    image: "\treatments\Head-Massage.jpeg",
    duration: "20-30 minutes",
    benefits: [
      "Relieves headaches and migraines",
      "Reduces stress and anxiety",
      "Improves blood circulation to the scalp",
      "Promotes hair growth and health",
      "Induces deep relaxation and mental clarity",
    ],
    icon: <Brush className="h-4 w-4 sm:h-6 sm:w-6" />,
  },
  "back-massage": {
    title: "Back Massage Therapy",
    description: "Target tension and knots with our specialized back massage that focuses on problem areas.",
    image: "/treatments/Back massage.jpeg",
    duration: "30-40 minutes",
    benefits: [
      "Relieves muscle tension and knots",
      "Improves posture and flexibility",
      "Reduces back pain and discomfort",
      "Promotes better sleep quality",
      "Enhances overall well-being",
    ],
    icon: <Feather className="h-4 w-4 sm:h-6 sm:w-6" />,
  },
  "foot-massage": {
    title: "Reflexology Foot Massage",
    description: "Experience the healing benefits of reflexology with our specialized foot massage therapy.",
    image: "/treatments/Foot massage.jpg",
    duration: "20-30 minutes",
    benefits: [
      "Stimulates reflex points connected to body organs",
      "Improves blood circulation in feet and legs",
      "Reduces foot pain and fatigue",
      "Promotes relaxation and stress relief",
      "Helps restore energy balance throughout the body",
    ],
    icon: <Droplet className="h-4 w-4 sm:h-6 sm:w-6" />,
  },
  "hair-wash": {
    title: "Luxury Hair Wash",
    description: "Indulge in our premium hair wash service with nourishing products and scalp massage.",
    image: "/treatments/Hairwash.jpg",
    duration: "20-25 minutes",
    benefits: [
      "Deep cleansing with premium shampoo",
      "Relaxing scalp massage improves circulation",
      "Conditioning treatment for soft, shiny hair",
      "Removes product buildup and impurities",
      "Includes aromatherapy for stress relief",
    ],
    icon: <Droplet className="h-4 w-4 sm:h-6 sm:w-6" />,
  },
  "blow-dry": {
    title: "Professional Blow Dry",
    description: "Get a perfect finish with our professional blow dry service for smooth, voluminous hair.",
    image: "/blow-dry-salon.png",
    duration: "30-45 minutes",
    benefits: [
      "Creates smooth, frizz-free finish",
      "Adds volume and body to hair",
      "Heat protection to prevent damage",
      "Styling consultation included",
      "Long-lasting results for special occasions",
    ],
    icon: <Brush className="h-4 w-4 sm:h-6 sm:w-6" />,
  },
  "hair-trim": {
    title: "Hair Trim & Shape",
    description:
      "Maintain your style with our precise hair trim service that removes split ends and refreshes your look.",
    image: "/hair-trim-salon.png",
    duration: "20-30 minutes",
    benefits: [
      "Removes split ends for healthier hair",
      "Maintains your current hairstyle",
      "Prevents further damage and breakage",
      "Refreshes layers and shape",
      "Includes styling consultation",
    ],
    icon: <Scissors className="h-4 w-4 sm:h-6 sm:w-6" />,
  },
}

interface ComboServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialService: string
}

export default function ComboServiceDialog({ open, onOpenChange, initialService }: ComboServiceDialogProps) {
  const service = serviceDetails[initialService as keyof typeof serviceDetails] || serviceDetails.facial

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl overflow-hidden bg-white p-0 rounded-2xl sm:mx-4 mx-1 scale-[0.85] sm:scale-100 origin-center border-2 border-[#FF007F]/10">
        <div className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF007F]/5 to-[#FFD500]/5 z-0" />

          <DialogHeader className="p-3 sm:p-6 md:p-8 relative z-10">
            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <div className="bg-gradient-to-r from-[#FF007F] to-[#FFD500] p-1.5 sm:p-2 rounded-full text-white">
                {service.icon}
              </div>
              <DialogTitle className="text-lg sm:text-2xl md:text-3xl font-semibold">{service.title}</DialogTitle>
            </div>
            <DialogDescription className="text-xs sm:text-base text-gray-600">{service.description}</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 p-3 sm:p-6 md:p-8 pt-0 relative z-10">
            <div className="space-y-3 sm:space-y-6">
              <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg h-36 sm:h-64 md:h-80">
                <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-2 sm:p-4 text-white flex items-center gap-1 sm:gap-2 text-xs sm:text-base">
                    <Clock className="h-3 w-3 sm:h-5 sm:w-5" />
                    <span>{service.duration}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-5 border border-[#FF007F]/10 shadow-md">
                <h4 className="font-medium text-sm sm:text-lg mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2">
                  <Star className="h-3 w-3 sm:h-5 sm:w-5 text-[#FFD500]" />
                  <span>Part of ₹999 Combo Offer</span>
                </h4>
                <p className="text-gray-600 text-xs sm:text-base">
                  Choose this service along with 4 other services from our menu to avail our special ₹999 combo package.
                  Regular price:{" "}
                  <span className="text-[#FF007F] font-semibold">
                    {initialService === "pedicure" || initialService === "back-massage"
                      ? "₹299"
                      : initialService === "head-massage"
                        ? "₹249"
                        : "₹199"}
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-5 border border-[#FF007F]/10 shadow-md">
                <h4 className="font-medium text-sm sm:text-lg mb-2 sm:mb-4">Benefits</h4>
                <ul className="space-y-2 sm:space-y-3">
                  {service.benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-2 sm:gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <CheckCircle2 className="h-3 w-3 sm:h-5 sm:w-5 text-[#00E5CF] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-xs sm:text-base">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div
                className="bg-gradient-to-r from-[#FF007F] to-[#FFD500] rounded-lg sm:rounded-xl p-2 sm:p-5 text-white shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h4 className="font-medium text-sm sm:text-lg mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2">
                  <Sparkles className="h-3 w-3 sm:h-5 sm:w-5" />
                  <span>Special Offer</span>
                </h4>
                <p className="mb-3 sm:mb-4 text-xs sm:text-base">
                  Book this service today and get a complimentary mini treatment worth ₹199!
                </p>
                <Button
                  className="bg-white text-[#FF007F] hover:bg-white/90 w-full text-xs sm:text-base py-1 sm:py-2 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => {
                    onOpenChange(false)
                    // Dispatch custom event
                    window.dispatchEvent(new CustomEvent("comboServiceDialogClosed", { bubbles: true }))
                    // Also handle direct navigation as fallback
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Book Now
                  <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </motion.div>
            </div>
          </div>

          <DialogFooter className="p-3 sm:p-6 md:p-8 pt-0 bg-gradient-to-r from-[#FF007F]/5 to-[#FFD500]/5 relative z-10">
            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between items-center">
              <p className="text-gray-600 text-[10px] sm:text-sm">
                * All services are performed by certified professionals using premium products
              </p>
              <Button
                variant="outline"
                className="border-[#FF007F] text-[#FF007F] hover:bg-[#FF007F]/10 text-xs sm:text-base py-1 px-2 sm:py-2 sm:px-4"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
