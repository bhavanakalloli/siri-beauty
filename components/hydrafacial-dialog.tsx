"use client"
import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, Sparkles } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HydrafacialDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function HydrafacialDialog({ open, onOpenChange }: HydrafacialDialogProps) {
  // Use a simple number for tab state to avoid any string comparison issues
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  // Debug the active tab
  useEffect(() => {
    console.log("Active tab index:", activeTabIndex)
  }, [activeTabIndex])

  // Reset tab when dialog opens/closes
  useEffect(() => {
    if (open) {
      console.log("Dialog opened, setting tab to 0")
      setActiveTabIndex(0)
    }
  }, [open])

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

  // Tab data
  const tabs = [
    {
      name: "HydraFacial",
      description:
        "HydraFacial is a patented skin treatment available in medical spas and dermatology offices. It's the only hydradermabrasion procedure that uses patented technology to cleanse, extract, and hydrate.",
      benefits: [
        "Deep cleansing and exfoliation",
        "Painless extractions",
        "Hydration and antioxidant protection",
        "Immediate results with no downtime",
        "Customizable for all skin types",
      ],
      image: "/treatments/Hydra-Facial-Price-In-Parlour.jpg",
    },
    {
      name: "Chemical Peels",
      description:
        "Chemical peels are skin-resurfacing treatments that use safe acid solutions to exfoliate the outer layers of the skin. This stimulates skin regeneration, helping treat acne, pigmentation, fine lines, and uneven skin tone.",
      benefits: [
        "Removes dead skin cells for a smoother complexion",
        "Fades dark spots, acne scars, and pigmentation",
        "Stimulates collagen and cell turnover",
        "Brightens dull skin and improves texture",
      ],
      image: "/treatments/chemical-peels.png",
    },
    {
      name: "Microdermabrasion",
      description:
        "Microdermabrasion is a non-invasive exfoliation technique that uses a diamond tip or crystals to gently remove the outermost layer of dead skin. It reveals fresher, younger-looking skin underneath and enhances product absorption.",
      benefits: [
        "Gently exfoliates and smoothens skin",
        "Reduces fine lines, acne scars, and sun damage",
        "Promotes even skin tone and glow",
        "Boosts circulation and skin regeneration",
      ],
      image: "/treatments/microdermabrasion.png",
    },
    {
      name: "LED Therapy",
      description:
        "LED Therapy uses different wavelengths of light (like red, blue, and green) to target various skin concerns such as acne, inflammation, aging, and dullness — all without heat or discomfort.",
      benefits: [
        "Blue light kills acne-causing bacteria",
        "Red light stimulates collagen and reduces wrinkles",
        "Green light helps with pigmentation and skin tone",
        "Non-invasive, soothing, and safe for all skin types",
      ],
      image: "/treatments/LED Theropy.jpg",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl p-0 bg-transparent border-none shadow-none overflow-hidden sm:mx-4 mx-1 scale-[0.85] sm:scale-100 origin-center">
        <div className="relative w-full max-h-[85vh] sm:max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-b from-[#FF007F] to-[#0077FF]/30 p-3 md:p-6 border-2 border-white/20">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 bg-white/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <X className="h-4 w-4 sm:h-6 sm:w-6" />
          </button>

          <div className="py-3 sm:py-12 container px-4 relative z-10">
            {/* Tab Navigation - Extremely Simple */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => {
                    console.log(`Clicking tab ${index}: ${tab.name}`)
                    setActiveTabIndex(index)
                  }}
                  className={`px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                    activeTabIndex === index
                      ? "bg-[#FF007F] text-white shadow-lg"
                      : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Tab Content - Super Simple */}
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">{tabs[activeTabIndex].name} Treatment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Image
                      src={tabs[activeTabIndex].image || "/placeholder.svg"}
                      alt={`${tabs[activeTabIndex].name} Treatment`}
                      width={600}
                      height={400}
                      className="rounded-xl shadow-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      About <span className="text-[#FF007F]">{tabs[activeTabIndex].name}</span>
                    </h3>
                    <p className="text-white/90 mb-4">{tabs[activeTabIndex].description}</p>
                    <h4 className="text-xl font-semibold text-white mb-2">Benefits:</h4>
                    <ul className="space-y-2">
                      {tabs[activeTabIndex].benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-white">
                          <span className="text-[#FF007F] mr-2">❯</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-6 bg-[#FF007F] hover:bg-[#FF007F]/90 text-white"
                      onClick={handleConsultationClick}
                    >
                      Book a {tabs[activeTabIndex].name} Consultation
                      <Sparkles className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-8">
              <Button
                size="lg"
                className="bg-white text-[#00E5CF] hover:bg-white/90 text-lg px-8 py-6 rounded-full"
                onClick={handleConsultationClick}
              >
                Schedule Your Skin Glow Consultation Today!
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
