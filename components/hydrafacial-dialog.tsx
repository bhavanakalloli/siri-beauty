"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, Shield, Sun, Clock, Zap, Star, Droplet, Sparkles } from "lucide-react"
import Image from "next/image"

interface HydrafacialDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function HydrafacialDialog({ open, onOpenChange }: HydrafacialDialogProps) {
  // Handle consultation button click
  const handleConsultationClick = () => {
    onOpenChange(false) // Close the dialog
    setTimeout(() => {
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 bg-transparent border-none shadow-none overflow-hidden sm:mx-4 mx-1">
        <div className="relative w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FF007F] p-4 md:p-6 border-2 border-white/20">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 bg-white/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <X className="h-4 w-4 sm:h-6 sm:w-6" />
          </button>

          {/* Header */}
          <div className="text-center mb-8 text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Glow with Confidence – Skin Treatments That Work</h1>
            <div className="w-16 h-1 bg-white mx-auto my-4"></div>
            <p className="text-xs md:text-sm max-w-2xl mx-auto">
              Reveal flawless skin with our advanced treatments at Siri Beauty in Jayanagar, Bangalore. Our
              comprehensive skin solutions address all your concerns from acne to aging.
            </p>
          </div>

          {/* Advanced Facial Treatments */}
          <div className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-white">
              Advanced Facial Treatments
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Hydrafacial Card */}
              <div className="bg-[#9C1458] rounded-xl overflow-hidden">
                <div className="relative h-40 md:h-48">
                  <Image src="/treatments/Hydrafacial.avif" alt="Hydrafacial Treatment" fill className="object-cover" />
                </div>
                <div className="p-4 text-white">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Hydrafacial</h3>
                  <p className="text-xs md:text-sm text-white/90">
                    Deep cleansing, exfoliation, extraction, and hydration for radiant skin
                  </p>
                </div>
              </div>

              {/* Skin Brightening Card */}
              <div className="bg-[#9C1458] rounded-xl overflow-hidden">
                <div className="relative h-40 md:h-48">
                  <Image
                    src="/treatments/Skin Brightning.jpg"
                    alt="Skin Brightening Treatment"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-white">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Skin Brightening</h3>
                  <p className="text-xs md:text-sm text-white/90">
                    Revitalize dull skin and achieve a luminous, even-toned complexion
                  </p>
                </div>
              </div>

              {/* Hydrafacial with High Frequency Card */}
              <div className="bg-[#9C1458] rounded-xl overflow-hidden">
                <div className="relative h-40 md:h-48">
                  <Image
                    src="/treatments/High Frequency hydrafacial.jpg"
                    alt="Hydrafacial with High Frequency"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-white">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Hydrafacial with High Frequency</h3>
                  <p className="text-xs md:text-sm text-white/90">
                    Enhanced treatment combining deep cleansing with high frequency for acne and skin tightening
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skin Correction Therapies */}
          <div className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-white">Skin Correction Therapies</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Acne & Pimple Marks */}
              <div className="bg-[#6D1158] rounded-xl p-4">
                <div className="flex justify-center mb-3">
                  <Shield className="h-6 w-6 md:h-8 md:w-8 text-cyan-300" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2 text-center text-white">Acne & Pimple Marks</h3>
                <p className="text-xs text-center text-white/90">
                  Targeted treatments to clear acne and reduce scarring
                </p>
              </div>

              {/* Pigmentation Removal */}
              <div className="bg-[#6D1158] rounded-xl p-4">
                <div className="flex justify-center mb-3">
                  <Sun className="h-6 w-6 md:h-8 md:w-8 text-cyan-300" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2 text-center text-white">Pigmentation Removal</h3>
                <p className="text-xs text-center text-white/90">
                  Advanced solutions for dark spots and uneven skin tone
                </p>
              </div>

              {/* Anti-Aging & Wrinkle Reduction */}
              <div className="bg-[#6D1158] rounded-xl p-4">
                <div className="flex justify-center mb-3">
                  <Clock className="h-6 w-6 md:h-8 md:w-8 text-cyan-300" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2 text-center text-white">
                  Anti-Aging & Wrinkle Reduction
                </h3>
                <p className="text-xs text-center text-white/90">
                  Turn back the clock with our rejuvenating treatments
                </p>
              </div>

              {/* Dark Circle Removal */}
              <div className="bg-[#6D1158] rounded-xl p-4">
                <div className="flex justify-center mb-3">
                  <Zap className="h-6 w-6 md:h-8 md:w-8 text-cyan-300" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2 text-center text-white">Dark Circle Removal</h3>
                <p className="text-xs text-center text-white/90">Brighten under-eye areas and look refreshed</p>
              </div>

              {/* Carbon Laser Peel */}
              <div className="bg-[#6D1158] rounded-xl p-4">
                <div className="flex justify-center mb-3">
                  <Star className="h-6 w-6 md:h-8 md:w-8 text-cyan-300" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2 text-center text-white">Carbon Laser Peel</h3>
                <p className="text-xs text-center text-white/90">Advanced exfoliation for smoother, clearer skin</p>
              </div>

              {/* Tattoo Removal */}
              <div className="bg-[#6D1158] rounded-xl p-4">
                <div className="flex justify-center mb-3">
                  <Zap className="h-6 w-6 md:h-8 md:w-8 text-cyan-300" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2 text-center text-white">Tattoo Removal</h3>
                <p className="text-xs text-center text-white/90">Safe and effective removal of unwanted tattoos</p>
              </div>

              {/* BB Glow */}
              <div className="bg-[#6D1158] rounded-xl p-4">
                <div className="flex justify-center mb-3">
                  <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-cyan-300" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2 text-center text-white">BB Glow</h3>
                <p className="text-xs text-center text-white/90">
                  Semi-permanent foundation treatment for flawless, radiant skin
                </p>
              </div>

              {/* PRP for Face - Now included in the same grid */}
              <div className="bg-[#6D1158] rounded-xl p-4">
                <div className="flex justify-center mb-3">
                  <Droplet className="h-6 w-6 md:h-8 md:w-8 text-cyan-300" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2 text-center text-white">PRP for Face</h3>
                <p className="text-xs text-center text-white/90">
                  Rejuvenate your skin with platelet-rich plasma therapy
                </p>
              </div>
            </div>
          </div>

          {/* Book Your Service Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleConsultationClick}
              className="px-8 py-3 bg-white text-[#FF007F] rounded-full font-semibold hover:bg-white/90 transition-colors shadow-lg"
            >
              Book Your Service Now
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center mt-8 space-x-2 md:space-x-4 text-xs">
            <div className="px-3 py-2 bg-[#6D1158] rounded-full text-white">
              <span className="flex items-center">
                <Droplet className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                PREMIUM BEAUTY SERVICES
              </span>
            </div>
            <div className="px-3 py-2 bg-[#6D1158] rounded-full text-white">
              <span className="flex items-center">
                <Star className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                LUXURY TREATMENTS
              </span>
            </div>
            <div className="px-3 py-2 bg-[#6D1158] rounded-full text-white">
              <span className="flex items-center">
                <Zap className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                EXPERT STYLISTS
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

