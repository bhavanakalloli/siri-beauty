"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowRight, Scissors, Sparkles, X } from "lucide-react"
import Image from "next/image"

interface HairTreatmentsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function HairTreatmentsDialog({ open, onOpenChange }: HairTreatmentsDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        console.log("Hair treatments dialog state changing to:", newOpen)
        onOpenChange(newOpen)
      }}
    >
      <DialogContent className="max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#FF007F] to-[#0077FF]/30 sm:mx-4 mx-1 sm:p-8 p-3 scale-[0.85] sm:scale-100 origin-center border-2 border-white/20">
        {/* Static banner with no movement */}
        <div className="bg-gradient-to-r from-[#FF007F] to-[#FF5A36] py-2 sm:py-3 px-4 rounded-lg sm:rounded-xl mb-4 sm:mb-6 text-center">
          <p className="text-white font-bold text-sm sm:text-lg">✨ LUXURY HAIR TREATMENTS ✨</p>
        </div>

        <DialogHeader className="mb-2 sm:mb-6 mt-4">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl sm:text-3xl font-semibold text-white">Hair Treatments</DialogTitle>
            <DialogClose className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
              <X className="h-3 w-3 sm:h-4 sm:w-4 text-[#FF007F]" />
            </DialogClose>
          </div>
          <DialogDescription className="text-xs sm:text-base text-white/90">
            Say goodbye to hair fall and dandruff with PRP and scalp rejuvenation therapies at Siri Hair Clinic in
            Jayanagar, Bangalore
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-8">
          <div className="text-center mb-4 sm:mb-8 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-4 text-white">
              Stronger, Healthier Hair – With Expert Hair Treatments
            </h1>

            <div className="h-1 w-16 sm:w-20 bg-white mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-8">
            <div className="bg-white/95 rounded-xl sm:rounded-2xl p-3 sm:p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h2 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-6 text-[#FF007F]">PRP & Scalp Treatments</h2>
              <ul className="space-y-2 sm:space-y-4">
                {["PRP for Hair Regrowth", "Hair Fall Treatment", "Dandruff Control"].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                    <div className="bg-[#FF007F]/10 p-1.5 sm:p-2 rounded-full text-[#FF007F]">
                      <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 sm:mt-6 sm:pt-6 border-t border-[#FF007F]/10">
                <Image
                  src="/treatments/PRP_Hairloss_PhoenixSkin (1).jpg"
                  alt="PRP Hair Treatment"
                  width={400}
                  height={300}
                  className="rounded-xl w-full h-32 sm:h-48 object-cover"
                />
              </div>
            </div>

            <div className="bg-white/95 rounded-xl sm:rounded-2xl p-3 sm:p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <h2 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-6 text-[#FF007F]">Hair Styling & Repair</h2>
              <ul className="space-y-2 sm:space-y-4">
                {["Hair Smoothening", "Permanent Straightening", "Keratin & Botox Hair Therapy"].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                    <div className="bg-[#FF007F]/10 p-1.5 sm:p-2 rounded-full text-[#FF007F]">
                      <Scissors className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 sm:mt-6 sm:pt-6 border-t border-[#FF007F]/10">
                <Image
                  src="/treatments/istockphoto-1153438285-612x612.jpg"
                  alt="Hair Styling & Repair"
                  width={400}
                  height={300}
                  className="rounded-xl w-full h-32 sm:h-48 object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-8 text-center">
            <Button
              size="sm"
              className="bg-white text-[#FF007F] hover:bg-white/90 text-xs sm:text-lg px-4 sm:px-8 py-2 sm:py-6 rounded-full font-medium shadow-lg"
              onClick={() => {
                onOpenChange(false)
                const contactElement = document.getElementById("contact")
                if (contactElement) {
                  contactElement.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              Book Your Hair Consultation Now!
              <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
