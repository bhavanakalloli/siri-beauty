"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Sparkles, Zap, Crop, Feather } from "lucide-react"

interface WeightLossDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialCategory?: string
}

export default function WeightLossDialog({ open, onOpenChange, initialCategory = "inch-loss" }: WeightLossDialogProps) {
  const [activeTab, setActiveTab] = useState(initialCategory)

  // Update active tab when initialCategory changes
  useEffect(() => {
    if (initialCategory && open) {
      setActiveTab(initialCategory)
    }
  }, [initialCategory, open])

  const treatments = {
    "inch-loss": {
      title: "Inch Loss & Fat Reduction",
      icon: <Zap className="h-5 w-5 sm:h-6 sm:w-6" />,
      description:
        "Our targeted fat reduction treatments use advanced technology to help you lose inches in specific problem areas without surgery or downtime.",
      services: [
        {
          name: "Ultrasonic Cavitation",
          description:
            "Uses ultrasound waves to break down fat cells, which are then naturally eliminated by your body's lymphatic system.",
          benefits: ["Non-invasive", "No downtime", "Visible results in 2-3 sessions", "Targets stubborn fat deposits"],
          image: "/treatments/Ultrasound-Cavitation.jpg",
        },
        {
          name: "Radio Frequency Fat Reduction",
          description:
            "Heats fat cells to break them down while simultaneously tightening skin for a smoother, more contoured appearance.",
          benefits: [
            "Reduces fat and tightens skin simultaneously",
            "Comfortable treatment",
            "Long-lasting results",
            "Safe for all skin types",
            "Increases collagen and elastin",
          ],
          image: "/treatments/Radio Frequency Fat Reduction.jpg",
        },
        {
          name: "BCA Consultation",
          description:
            "A personalized beauty and wellness assessment that helps clients understand the unique needs of their skin, hair, and body. Conducted by trained beauty professionals, this consultation provides expert guidance on choosing the right salon services and products.",
          benefits: [
            "Personalized Recommendations",
            "Better Results from Treatments",
            "Prevent Common Beauty Issues",
            "Cost-Effective Planning",
            "Perfect for Brides & Grooms",
            "Build Confidence",
          ],
          image: "/treatments/BCA Consultation.webp",
        },
      ],
    },
    "body-contouring": {
      title: "Body Contouring & Figure Correction",
      icon: <Crop className="h-5 w-5 sm:h-6 sm:w-6" />,
      description:
        "Sculpt and shape your body to perfection with our specialized body contouring treatments that target specific areas for a more balanced silhouette.",
      services: [
        {
          name: "Heat Therapy",
          description:
            "Uses electrical heat blankets to generate sweat and removes toxics from the body while improving the instant inch loss.",
          benefits: [
            "Promotes detoxification, enhances sweat-induced inch loss, and improves circulation for a refreshed, slimmer feel.",
          ],
          image: "/classic-microblading.png",
        },
        {
          name: "Laser Body Sculpting",
          description:
            "Targets fat cells with laser energy to disrupt their membranes, allowing the body to naturally eliminate them while tightening surrounding skin.",
          benefits: [
            "Precise targeting of problem areas",
            "Minimal discomfort",
            "No scarring",
            "Natural-looking results",
          ],
          image: "/treatments/Laser Body Sculpting.jpg",
        },
        {
          name: "Electro Muscle Stimulation (EMS)",
          description:
            "Uses electrical impulses to contract muscles, building strength and tone while improving posture and body shape.",
          benefits: [
            "Equivalent to intense workout",
            "Strengthens core muscles",
            "Improves posture",
            "Enhances athletic performance",
          ],
          image: "/treatments/Electro Muscle Stimulation (EMS).jpg",
        },
      ],
    },
    "skin-tightening": {
      title: "Skin Tightening & Toning",
      icon: <Feather className="h-5 w-5 sm:h-6 sm:w-6" />,
      description:
        "Firm and tighten loose skin for a more youthful appearance with our advanced skin tightening treatments that stimulate collagen production.",
      services: [
        {
          name: "Radiofrequency Skin Tightening",
          description:
            "Uses radiofrequency energy to heat the deeper layers of skin, stimulating collagen production for firmer, tighter skin.",
          benefits: [
            "Immediate visible lifting effect",
            "Progressive improvement over time",
            "Non-surgical alternative to facelift",
            "Minimal downtime",
          ],
          image: "/treatments/Radiofrequency Skin Tightening.jpg",
        },
        {
          name: "Ultrasound Cavitation",
          description:
            "Delivers focused ultrasound energy deep into the skin to trigger collagen regeneration and natural skin lifting.",
          benefits: [
            "Targets deep skin layers",
            "Long-lasting results",
            "Single-session treatment option",
            "Natural-looking results",
          ],
          image: "/treatments/Ultrasound-Cavitation.jpg",
        },
        {
          name: "Laser Lipolysis",
          description:
            "Uses infrared light to heat collagen fibers, causing them to contract and stimulating new collagen production for firmer skin.",
          benefits: [
            "Comfortable treatment experience",
            "Works on face and body",
            "Gradual, natural-looking improvement",
            "No recovery time needed",
          ],
          image: "/treatments/Laser Lipolysis.avif",
        },
      ],
    },
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto sm:mx-4 mx-1 scale-[0.85] sm:scale-100 origin-center bg-white/95 backdrop-blur-sm border-2 border-[#FFD500]/20">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FFD500] to-[#FF5A36]">
            Weight Loss & Slimming Treatments
          </DialogTitle>
          <DialogDescription className="text-center text-xs sm:text-base lg:text-lg">
            Advanced non-invasive treatments for targeted fat reduction, body contouring, and skin tightening
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-3 sm:mt-6">
          <TabsList className="grid grid-cols-3 mb-3 sm:mb-8 text-[10px] sm:text-sm">
            <TabsTrigger value="inch-loss" className="flex items-center gap-1 sm:gap-2 px-1 py-1 sm:px-2 sm:py-2">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4" /> Inch Loss
            </TabsTrigger>
            <TabsTrigger value="body-contouring" className="flex items-center gap-1 sm:gap-2 px-1 py-1 sm:px-2 sm:py-2">
              <Crop className="h-3 w-3 sm:h-4 sm:w-4" /> Body Contouring
            </TabsTrigger>
            <TabsTrigger value="skin-tightening" className="flex items-center gap-1 sm:gap-2 px-1 py-1 sm:px-2 sm:py-2">
              <Feather className="h-3 w-3 sm:h-4 sm:w-4" /> Skin Tightening
            </TabsTrigger>
          </TabsList>

          {Object.entries(treatments).map(([key, category]) => (
            <TabsContent key={key} value={key} className="space-y-4 sm:space-y-8">
              <div className="text-center mb-3 sm:mb-6">
                <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 flex items-center justify-center gap-1 sm:gap-2">
                  {category.icon}
                  {category.title}
                </h2>
                <p className="text-gray-600 text-xs sm:text-base">{category.description}</p>
              </div>

              <div className="space-y-4 sm:space-y-8">
                {category.services.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-6 shadow-md border border-[#FFD500]/20 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-3 sm:gap-6">
                      <div className="md:w-1/3">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.name}
                          width={300}
                          height={200}
                          className="rounded-lg w-full h-28 sm:h-48 object-cover"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2 text-[#FF5A36]">{service.name}</h3>
                        <p className="text-gray-600 mb-2 sm:mb-4 text-xs sm:text-base">{service.description}</p>
                        <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Benefits:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-2">
                          {service.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-1 sm:gap-2">
                              <div className="text-[#FFD500]">
                                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                              </div>
                              <span className="text-[10px] sm:text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-4 sm:mt-8">
                <Button
                  className="bg-gradient-to-r from-[#FFD500] to-[#FF5A36] text-white hover:opacity-90 px-3 sm:px-8 py-1.5 sm:py-6 rounded-full text-xs sm:text-base shadow-md hover:shadow-lg transition-all duration-300"
                  size="sm"
                  onClick={() => {
                    onOpenChange(false)
                    // Dispatch custom event
                    window.dispatchEvent(new CustomEvent("weightLossDialogClosed", { bubbles: true }))
                    // Also handle direct navigation as fallback
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Book Your {category.title} Consultation
                  <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
