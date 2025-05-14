"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  ArrowRight,
  Scissors,
  Droplet,
  Flower,
  Heart,
  Zap,
  Feather,
  Brush,
  Crop,
  Palette,
  Gem,
  Crown,
  Star,
  Wand2,
  Sparkle,
  Plus,
  Minus,
} from "lucide-react"

import HeroSparkles from "@/components/hero-sparkles"
import ServiceCard from "@/components/service-card"
import TestimonialCard from "@/components/testimonial-card"
import GalleryGrid from "@/components/gallery-grid"
import FloatingElements from "@/components/floating-elements"
import BeautyTreatments from "@/components/beauty-treatments"
import EnhancedLoadingScreen from "@/components/enhanced-loading-screen"
import CursorEffects from "@/components/cursor-effects"
import NavigationBar from "@/components/navigation-bar"
import HydrafacialDialog from "@/components/hydrafacial-dialog"
import HairTreatmentsDialog from "@/components/hair-treatments-dialog"
import WeightLossDialog from "@/components/weight-loss-dialog"
import ComboServiceDialog from "@/components/combo-service-dialog"
import MicrobladingDialog from "@/components/microblading-dialog"
import BridalGroomDialog from "@/components/bridal-groom-dialog"
import Footer from "@/components/footer"
import BeautyServicesDialog from "@/components/beauty-services-dialog"
import LaserTreatmentsDialog from "@/components/laser-treatments-dialog"
import BookingForm from "@/components/booking-form"

// Add import for image utilities
import { preloadCriticalImages } from "@/lib/image-utils"

export default function Home() {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [loading, setLoading] = useState(false)
  const [hydrafacialDialogOpen, setHydrafacialDialogOpen] = useState(false)
  const [hairTreatmentsDialogOpen, setHairTreatmentsDialogOpen] = useState(false)
  const [weightLossDialogOpen, setWeightLossDialogOpen] = useState(false)
  const [comboServiceDialogOpen, setComboServiceDialogOpen] = useState(false)
  const [microbladingDialogOpen, setMicrobladingDialogOpen] = useState(false)
  const [bridalGroomDialogOpen, setBridalGroomDialogOpen] = useState(false)
  const [laserTreatmentsDialogOpen, setLaserTreatmentsDialogOpen] = useState(false)
  const [weightLossCategory, setWeightLossCategory] = useState("inch-loss")
  const [comboService, setComboService] = useState("facial")
  const [openFaq, setOpenFaq] = useState(0) // Track which FAQ is open
  const [beautyServicesDialogOpen, setBeautyServicesDialogOpen] = useState(false)

  // Handle loading complete
  const handleLoadingComplete = () => {
    setLoading(false)
    // Store in session storage that we've loaded the page
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pageLoaded", "true")
    }
  }

  // Check if we should show loading screen
  useEffect(() => {
    // Only show loading on initial page load, not on internal navigation
    if (typeof window !== "undefined") {
      const hasLoaded = sessionStorage.getItem("pageLoaded")
      if (!hasLoaded) {
        setLoading(true)
      }
    }
  }, [])

  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const slimmingRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const partnersRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const comboRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const treatmentsRef = useRef<HTMLDivElement>(null)
  const hydrafacialRef = useRef<HTMLDivElement>(null)
  const hairTreatmentsRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  // InView states
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 })
  const servicesInView = useInView(servicesRef, { once: false, amount: 0.3 })
  const slimmingInView = useInView(slimmingRef, { once: false, amount: 0.3 })
  const galleryInView = useInView(galleryRef, { once: false, amount: 0.3 })
  const partnersInView = useInView(partnersRef, { once: false, amount: 0.3 })
  const testimonialsInView = useInView(testimonialsRef, { once: false, amount: 0.3 })
  const comboInView = useInView(comboRef, { once: false, amount: 0.3 })
  const contactInView = useInView(contactRef, { once: false, amount: 0.3 })
  const treatmentsInView = useInView(treatmentsRef, { once: false, amount: 0.3 })
  const hydrafacialInView = useInView(hydrafacialRef, { once: false, amount: 0.3 })
  const hairTreatmentsInView = useInView(hairTreatmentsRef, { once: false, amount: 0.3 })
  const faqInView = useInView(faqRef, { once: false, amount: 0.3 })

  // Parallax effects
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2])
  const heroRotate = useTransform(scrollYProgress, [0, 0.2], [0, -5])

  // Services data
  const services = [
    { name: "Weight Loss & Slimming", icon: <Droplet className="h-8 w-8" />, link: "slimming" },
    { name: "Skin & Hydrafacial", icon: <Flower className="h-8 w-8" />, link: "hydrafacial" },
    { name: "Hair Treatments", icon: <Scissors className="h-8 w-8" />, link: "hair-treatments" },
    { name: "Beauty Combo", icon: <Heart className="h-8 w-8" />, link: "combo" },
    { name: "Laser Treatments", icon: <Zap className="h-8 w-8" />, link: "" },
    { name: "Microblading", icon: <Brush className="h-8 w-8" />, link: "" },
    { name: "Bridal & Groom Services", icon: <Crown className="h-8 w-8" />, link: "" },
    { name: "Beauty Services", icon: <Sparkles className="h-8 w-8" />, link: "" },
  ]

  // Beauty icons for animations
  const beautyIcons = [
    <Scissors key="scissors" className="h-10 w-10" />,
    <Droplet key="droplet" className="h-10 w-10" />,
    <Flower key="flower" className="h-10 w-10" />,
    <Heart key="heart" className="h-10 w-10" />,
    <Brush key="brush" className="h-10 w-10" />,
    <Palette key="palette" className="h-10 w-10" />,
    <Gem key="gem" className="h-10 w-10" />,
    <Crown key="crown" className="h-10 w-10" />,
    <Star key="star" className="h-10 w-10" />,
    <Wand2 key="wand" className="h-10 w-10" />,
  ]

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=80&width=80",
      quote: "Absolutely transformed my look!",
      text: "The facial treatment was incredible. My skin has never felt so refreshed and glowing. The staff was professional and made me feel so comfortable.",
    },
    {
      id: 2,
      name: "Emily Parker",
      image: "/placeholder.svg?height=80&width=80",
      quote: "Best salon experience ever!",
      text: "I've tried many salons, but this one stands out. The ambiance, the service, and the results are all top-notch. I'm a customer for life now!",
    },
    {
      id: 3,
      name: "Michael Chen",
      image: "/placeholder.svg?height=80&width=80",
      quote: "Worth every penny!",
      text: "The combo package was an amazing value. I got multiple services for a great price, and each one was done with such care and expertise.",
    },
  ]

  // Update the partners data array to include descriptions
  const partners = [
    {
      name: "L'Oréal Professional",
      logo: "/loreal-logo.png",
      description:
        "A global leader in cosmetics and beauty, offering a wide range of skincare, haircare, and makeup products.",
    },
    {
      name: "Brillare",
      logo: "/brillare-logo.png",
      description:
        "An Indian personal care brand focused on 100% natural, dermatology-grade hair and skincare solutions.",
    },
    {
      name: "Alpha Beta",
      logo: "/treatments/AlphaBEta.png",
      description: "A former American supermarket chain known for grocery retailing in the western United States.",
    },
  ]

  // Combo offers
  const comboAddons = [
    { name: "Facial", price: "", id: "facial" },
    { name: "Threading", price: "", id: "threading" },
    { name: "Pedicure", price: "", id: "pedicure" },
    { name: "Manicure", price: "", id: "manicure" },
    { name: "Head Massage", price: "", id: "head-massage" },
    { name: "Back Massage", price: "", id: "back-massage" },
    { name: "Foot Massage", price: "", id: "foot-massage" },
    { name: "Hair Wash", price: "", id: "hair-wash" },
    // { name: "Blow Dry", price: "₹199", id: "blow-dry" },
    // { name: "Hair Trim", price: "₹149", id: "hair-trim" },
  ]

  // FAQ data
  const faqs = [
    {
      question: "What is the best weight loss program available in Jayanagar?",
      answer:
        "At Siri Beauty and Wellness, we offer the best weight loss programs in Jayanagar with customized slimming plans, inch loss treatments, and body contouring tailored to your unique needs.",
    },
    {
      question: "Where can I get Hydrafacial treatment near me in Bangalore?",
      answer:
        'Siri Beauty Center in Jayanagar offers the latest Hydrafacial treatments for deep cleansing, skin rejuvenation, and glowing skin – perfect for anyone searching for "Hydrafacial near me."',
    },
    {
      question: "Which center in Bangalore provides advanced hair fall and PRP treatment?",
      answer:
        "Siri Hair Clinic in Jayanagar specializes in hair fall control and PRP hair regrowth treatment using proven technologies and expert consultation.",
    },
    {
      question: "Are there any affordable beauty packages in Jayanagar?",
      answer:
        "Yes! We have a 5-in-1 beauty combo offer including facial, waxing, threading, massage, and hair trimming. It's one of the most budget-friendly beauty services in Jayanagar.",
    },
    {
      question: "Do you offer permanent laser hair removal in Bangalore?",
      answer:
        "Siri Beauty and Wellness provides safe and effective permanent laser hair reduction treatments in Bangalore using advanced, skin-friendly technologies.",
    },
  ]

  // Utility function for smooth scrolling to sections
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Function to open weight loss dialog with specific category
  const openWeightLossDialog = (category: string) => {
    setWeightLossCategory(category)
    setWeightLossDialogOpen(true)
  }

  // Function to open combo service dialog with specific service
  const openComboServiceDialog = (serviceId: string) => {
    setComboService(serviceId)
    setComboServiceDialogOpen(true)
  }

  // Add this after the other useEffect hooks
  useEffect(() => {
    // Ensure dialog state is properly initialized
    const handleCardClick = (serviceName: string) => {
      if (serviceName === "Skin & Hydrafacial") {
        setHydrafacialDialogOpen(true)
      } else if (serviceName === "Hair Treatments") {
        setHairTreatmentsDialogOpen(true)
      } else if (serviceName === "Weight Loss & Slimming") {
        setWeightLossDialogOpen(true)
        setWeightLossCategory("inch-loss")
      } else if (serviceName === "Microblading") {
        setMicrobladingDialogOpen(true)
      } else if (serviceName === "Bridal & Groom Services") {
        setBridalGroomDialogOpen(true)
      } else if (serviceName === "Beauty Services") {
        setBeautyServicesDialogOpen(true)
      } else if (serviceName === "Laser Treatments") {
        setLaserTreatmentsDialogOpen(true)
      }
    }

    // Expose the function to window for debugging if needed
    if (typeof window !== "undefined") {
      ;(window as any).handleServiceCardClick = handleCardClick
    }

    return () => {
      if (typeof window !== "undefined") {
        delete (window as any).handleServiceCardClick
      }
    }
  }, [])

  // Add event emitter for dialog close events
  // Add this after the useEffect for handleCardClick

  useEffect(() => {
    // Create custom event for dialog closures
    const createDialogCloseEvent = (dialogName: string) => {
      return new CustomEvent(`${dialogName}DialogClosed`, { bubbles: true })
    }

    // Setup event listeners for dialog close events
    const handleDialogClose = (dialogName: string) => {
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" })
      }
    }

    // Add event listeners for all dialogs
    const dialogTypes = [
      "hydrafacial",
      "hairTreatments",
      "weightLoss",
      "comboService",
      "microblading",
      "bridalGroom",
      "beautyServices",
      "laserTreatments",
    ]

    dialogTypes.forEach((dialog) => {
      window.addEventListener(`${dialog}DialogClosed`, () => handleDialogClose(dialog), { once: false })
    })

    return () => {
      // Clean up event listeners
      dialogTypes.forEach((dialog) => {
        window.removeEventListener(`${dialog}DialogClosed`, () => handleDialogClose(dialog))
      })
    }
  }, [])

  // Fix the animation frame cleanup in cursor effects
  useEffect(() => {
    // Ensure all animation frames are properly canceled when components unmount
    const animationFrameIds: number[] = []

    return () => {
      // Clean up all animation frames
      animationFrameIds.forEach((id) => {
        if (id) cancelAnimationFrame(id)
      })
    }
  }, [])

  // Ensure all service cards are properly initialized with click handlers
  useEffect(() => {
    // Add a small delay to ensure DOM is fully loaded
    const initTimer = setTimeout(() => {
      const serviceCards = document.querySelectorAll("[data-service-card]")

      if (serviceCards.length === 0) {
        console.warn("Service cards not found. Check if they are properly rendered.")
      } else {
        console.log(`${serviceCards.length} service cards initialized successfully.`)
      }
    }, 1000)

    return () => clearTimeout(initTimer)
  }, [])

  // Toggle FAQ function
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? -1 : index)
  }

  // Add a console log to help debug the click handler
  const handleServiceCardClick = (serviceName: string) => {
    console.log(`Service card clicked: ${serviceName}`)

    if (serviceName === "Laser Treatments") {
      console.log("Opening Laser Treatments dialog")
      setLaserTreatmentsDialogOpen(true)
    } else if (serviceName === "Skin & Hydrafacial") {
      setHydrafacialDialogOpen(true)
    } else if (serviceName === "Hair Treatments") {
      setHairTreatmentsDialogOpen(true)
    } else if (serviceName === "Weight Loss & Slimming") {
      setWeightLossDialogOpen(true)
      setWeightLossCategory("inch-loss")
    } else if (serviceName === "Microblading") {
      setMicrobladingDialogOpen(true)
    } else if (serviceName === "Bridal & Groom Services") {
      setBridalGroomDialogOpen(true)
    } else if (serviceName === "Beauty Services") {
      setBeautyServicesDialogOpen(true)
    }
  }

  // Fix potential issues with animations and dialog boxes

  // Add this useEffect to ensure animations and dialog boxes work properly
  // Add it after the existing useEffect hooks
  useEffect(() => {
    // Fix for Framer Motion animations in production
    const fixFramerMotionAnimations = () => {
      const animationElements = document.querySelectorAll("[data-framer-animation-status]")
      animationElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          // Force animation refresh if needed
          const currentDisplay = el.style.display
          el.style.display = "none"
          // Trigger reflow
          void el.offsetHeight
          el.style.display = currentDisplay
        }
      })
    }

    // Fix for dialog boxes in production
    const ensureDialogsWork = () => {
      // Make sure dialog components are properly initialized
      const dialogTriggers = document.querySelectorAll("[data-service-card]")
      dialogTriggers.forEach((trigger) => {
        if (trigger instanceof HTMLElement) {
          // Reinforce click handler
          const serviceName = trigger.getAttribute("data-service-card")
          if (serviceName) {
            trigger.addEventListener(
              "click",
              () => {
                handleServiceCardClick(serviceName)
              },
              { passive: true },
            )
          }
        }
      })
    }

    // Run fixes after a short delay to ensure DOM is fully loaded
    const timeoutId = setTimeout(() => {
      fixFramerMotionAnimations()
      ensureDialogsWork()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [])

  // Add this to the existing useEffect hooks
  useEffect(() => {
    // Preload critical images to ensure they're available
    preloadCriticalImages()
  }, [])

  // Add debugging for section navigation
  // Add debugging for section navigation
useEffect(() => {
  const checkSections = () => {
    const sections = [
      { id: "gallery", ref: galleryRef },
      { id: "testimonials", ref: testimonialsRef },
      { id: "contact", ref: contactRef },
      { id: "services", ref: servicesRef },
      { id: "slimming", ref: slimmingRef },
      { id: "treatments", ref: treatmentsRef },
      { id: "hair-treatments", ref: hairTreatmentsRef },
      { id: "combo", ref: comboRef },
      { id: "faq", ref: faqRef },
    ]

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (!element) {
        console.warn(`Section with ID "${section.id}" not found in the DOM`)
      }
    })
  }

  // Run check after DOM is fully loaded
  if (typeof window !== "undefined") {
    window.addEventListener("load", checkSections)
  }

  return () => {
    if (typeof window !== "undefined") {
      window.removeEventListener("load", checkSections)
    }
  }
}, [])

  return (
    <>
      <AnimatePresence>
        {loading && <EnhancedLoadingScreen onLoadingComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <main className="relative overflow-hidden font-['Poppins']">
        {typeof window !== "undefined" && <FloatingElements />}
        {typeof window !== "undefined" && <CursorEffects />}
        <NavigationBar />

        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#C9093B] to-[#A00732] z-0"
            style={{
              y: heroY,
              opacity: heroOpacity,
              scale: heroScale,
              rotateZ: heroRotate,
            }}
          />

          <div className="absolute inset-0 z-10 opacity-50">
            <HeroSparkles />
          </div>

          <div className="container relative z-20 px-4 py-10 md:py-20 text-center">
            <motion.div
              className="mb-4 md:mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center whitespace-normal md:whitespace-nowrap leading-tight md:leading-normal tracking-tight">
                <span className="block md:inline whitespace-normal">Welcome to Siri Beauty</span>{" "}
                <span className="block md:inline whitespace-normal">and Wellness Center</span>{" "}
                <span className="block md:inline whitespace-normal">– Jayanagar, Bangalore</span>
              </motion.h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="relative"
            >
              <Button
                size="sm"
                className="relative bg-transparent border-2 border-white text-white hover:bg-white/10 text-xs sm:text-sm md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-4 md:py-6 rounded-full group overflow-hidden"
                asChild
              >
                <Link href="#contact" onClick={(e) => scrollToSection(e, "contact")}>
                  <span className="relative z-10">Book Your Consultation Today!</span>
                  <motion.span
                    className="absolute inset-0 bg-white/20 z-0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  <Sparkles className="ml-1 md:ml-2 h-3 w-3 md:h-5 md:w-5 inline-block group-hover:text-[#FF007F] transition-colors" />
                </Link>
              </Button>

              <motion.div
                className="absolute -top-2 -right-2 md:-top-4 md:-right-4 text-white"
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.2, 1, 0.8, 1],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Sparkles className="h-4 w-4 md:h-8 md:w-8" />
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 text-white"
                animate={{
                  rotate: [0, -10, 0, 10, 0],
                  scale: [1, 0.8, 1, 1.2, 1],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
              >
                <Sparkles className="h-4 w-4 md:h-8 md:w-8" />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-5 md:bottom-10 left-1/2 transform -translate-x-1/2 text-white/70"
            animate={{ y: [0, 10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <ChevronRight className="h-5 w-5 md:h-8 md:w-8 rotate-90" />
          </motion.div>
        </section>

        {/* Marquee Text Section */}
        <section className="py-3 md:py-6 bg-gradient-to-r from-[#C9093B] to-[#A00732] text-white overflow-hidden">
          <div className="flex justify-center items-center">
            <div className="text-lg md:text-2xl font-bold mx-4 flex items-center">
              <Sparkle className="mr-1 md:mr-2 h-4 w-4 md:h-6 md:w-6" /> PREMIUM BEAUTY SERVICES
            </div>
            <div className="text-lg md:text-2xl font-bold mx-4 flex items-center">
              <Crown className="mr-1 md:mr-2 h-4 w-4 md:h-6 md:w-6" /> LUXURY TREATMENTS
            </div>
            <div className="text-lg md:text-2xl font-bold mx-4 flex items-center">
              <Star className="mr-1 md:mr-2 h-4 w-4 md:h-6 md:w-6" /> EXPERT STYLISTS
            </div>
          </div>
        </section>

        {/* Services Showcase */}
        <section ref={servicesRef} className="py-10 md:py-20 lg:py-32 bg-white relative overflow-hidden" id="services">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#FF5A36]/10 to-transparent z-0 opacity-50"
            style={{ y: useTransform(scrollYProgress, [0.1, 0.3], [0, -100]) }}
          />

          <div className="container px-4">
            <motion.div
              className="text-center mb-8 md:mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF007F] to-[#FF5A36]"
                initial={{ opacity: 0, y: 50 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
              >
                Discover Our Services
              </motion.h2>

              <motion.div
                className="h-1 w-16 md:w-20 bg-gradient-to-r from-[#FF007F] to-[#FF5A36] mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={servicesInView ? { width: 64 } : { width: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              />

              <motion.p
                className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto mt-2 md:mt-4"
                initial={{ opacity: 0, y: 50 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Discover a new you at Siri Beauty and Wellness Center – the leading destination in Jayanagar for weight
                loss, slimming treatments, and rejuvenating skin & hair care.
              </motion.p>
            </motion.div>

            {/* Update the services grid layout for better mobile display */}
            <div className="overflow-hidden">
              <motion.div
                className="flex flex-wrap justify-center gap-2 md:gap-6 lg:gap-8"
                initial={{ opacity: 0 }}
                animate={servicesInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {services.map((service, index) => (
                  <ServiceCard
                    key={service.name}
                    service={service}
                    index={index}
                    inView={servicesInView}
                    data-cursor-rotate
                    setHydrafacialDialogOpen={setHydrafacialDialogOpen}
                    setHairTreatmentsDialogOpen={setHairTreatmentsDialogOpen}
                    setBeautyServicesDialogOpen={setBeautyServicesDialogOpen}
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault()
                      handleServiceCardClick(service.name)

                      // Only scroll to section if it has a link and is not a dialog service
                      if (
                        service.link &&
                        service.name !== "Laser Treatments" &&
                        service.name !== "Skin & Hydrafacial" &&
                        service.name !== "Hair Treatments" &&
                        service.name !== "Microblading" &&
                        service.name !== "Bridal & Groom Services" &&
                        service.name !== "Beauty Services"
                      ) {
                        const element = document.getElementById(service.link)
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" })
                        }
                      }
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Beauty Treatments Section */}
<section
  ref={treatmentsRef}
  className="py-8 md:py-12 lg:py-20 relative overflow-hidden bg-pink-50" // Adjusted padding
  id="treatments"
>
  <motion.div
    className="absolute inset-0 bg-gradient-to-b from-pink-100 to-pink-50/50 z-0" // Changed gradient colors
    style={{ y: useTransform(scrollYProgress, [0.25, 0.45], [0, -100]) }}
  />

  <BeautyTreatments inView={treatmentsInView} />
</section>

        {/* Slimming & Body Care Section */}
        <section ref={slimmingRef} className="py-10 md:py-20 lg:py-32 relative overflow-hidden" id="slimming">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#FFD500]/30 to-white z-0"
            style={{ y: useTransform(scrollYProgress, [0.3, 0.5], [0, -100]) }}
          />

          <div className="container px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="text-center mb-8 md:mb-16"
                initial={{ opacity: 0, y: 50 }}
                animate={slimmingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h2
                  className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-2 md:mb-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={slimmingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8 }}
                >
                  Weight Loss & Slimming
                </motion.h2>

                <motion.div
                  className="h-1 w-16 md:w-20 bg-gradient-to-r from-[#FFD500] to-[#FF5A36] mx-auto rounded-full"
                  initial={{ width: 0 }}
                  animate={slimmingInView ? { width: 64 } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />

                <motion.p
                  className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto mt-2 md:mt-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={slimmingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="font-medium">Advanced Slimming Machines</span> • Non-Invasive Procedures •
                  Long-Lasting Results
                </motion.p>
              </motion.div>

              {/* Update the slimming cards grid for better mobile display */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 lg:gap-8"
                initial={{ opacity: 0 }}
                animate={slimmingInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {[
                  {
                    title: "Inch Loss & Fat Reduction",
                    icon: <Zap className="h-5 w-5 md:h-10 md:w-10" />,
                    desc: "Targeted fat reduction with our specialized treatments",
                    category: "inch-loss",
                  },
                  {
                    title: "Body Contouring & Figure Correction",
                    icon: <Crop className="h-5 w-5 md:h-10 md:w-10" />,
                    desc: "Sculpt and shape your body to perfection",
                    category: "body-contouring",
                  },
                  {
                    title: "Skin Tightening & Toning",
                    icon: <Feather className="h-5 w-5 md:h-10 md:w-10" />,
                    desc: "Firm and tighten loose skin for a youthful appearance",
                    category: "skin-tightening",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#FFD500]/20 cursor-pointer"
                    initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -5 : 5 }}
                    animate={
                      slimmingInView
                        ? { opacity: 1, y: 0, rotate: 0 }
                        : { opacity: 0, y: 50, rotate: index % 2 === 0 ? -5 : 5 }
                    }
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
                    whileHover={{ y: -10, scale: 1.05, rotate: 0 }}
                    onClick={() => openWeightLossDialog(item.category)}
                  >
                    <motion.div
                      className="text-[#FF5A36] mb-2 md:mb-4"
                      animate={{
                        rotate: [0, 10, 0, -10, 0],
                        scale: [1, 1.1, 1, 0.9, 1],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-sm md:text-xl font-semibold mb-1 md:mb-2">{item.title}</h3>
                    <p className="text-xs md:text-base text-gray-600">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="mt-6 md:mt-12 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={slimmingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#FFD500] to-[#FF5A36] text-white hover:opacity-90 text-xs md:text-lg px-4 md:px-8 py-2 md:py-6 rounded-full relative overflow-hidden group"
                  onClick={() => {
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  <span className="relative z-10">Book a Free Slimming Consultation Today!</span>
                  <motion.span
                    className="absolute inset-0 bg-white/20 z-0"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 2, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ borderRadius: "100%" }}
                  />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Hair Treatments Section */}
        <section
          ref={hairTreatmentsRef}
          className="py-10 md:py-20 lg:py-32 relative overflow-hidden"
          id="hair-treatments"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#FF007F]/20 to-white z-0"
            style={{ y: useTransform(scrollYProgress, [0.35, 0.55], [0, -100]) }}
          />

          <div className="container px-4 relative z-10">
            <motion.div
              className="text-center mb-8 md:mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={hairTreatmentsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-2 md:mb-4"
                initial={{ opacity: 0, y: 50 }}
                animate={hairTreatmentsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
              >
                Premium Hair Treatments
              </motion.h2>

              <motion.div
                className="h-1 w-16 md:w-20 bg-gradient-to-r from-[#FF007F] to-[#FF5A36] mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={hairTreatmentsInView ? { width: 64 } : { width: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              />

              <motion.p
                className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto mt-2 md:mt-4"
                initial={{ opacity: 0, y: 50 }}
                animate={hairTreatmentsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Say goodbye to hair fall and dandruff with PRP and scalp rejuvenation therapies at Siri Hair Clinic in
                Jayanagar, Bangalore
              </motion.p>
            </motion.div>

            {/* Update the hair treatments grid for better mobile display */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 lg:gap-8"
              initial={{ opacity: 0 }}
              animate={hairTreatmentsInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {[
                {
                  title: "PRP Hair Treatment",
                  icon: <Scissors className="h-5 w-5 md:h-10 md:w-10" />,
                  desc: "Advanced treatment for hair regrowth and strengthening",
                },
                {
                  title: "Hair Smoothening",
                  icon: <Brush className="h-5 w-5 md:h-10 md:w-10" />,
                  desc: "Get silky smooth hair with our premium treatments",
                },
                {
                  title: "Keratin Treatment",
                  icon: <Sparkle className="h-5 w-5 md:h-10 md:w-10" />,
                  desc: "Restore shine and eliminate frizz with keratin therapy",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#FF007F]/20 cursor-pointer"
                  initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -5 : 5 }}
                  animate={
                    hairTreatmentsInView
                      ? { opacity: 1, y: 0, rotate: 0 }
                      : { opacity: 0, y: 50, rotate: index % 2 === 0 ? -5 : 5 }
                  }
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.05, rotate: 0 }}
                  onClick={() => setHairTreatmentsDialogOpen(true)}
                >
                  <motion.div
                    className="text-[#FF007F] mb-2 md:mb-4"
                    animate={{
                      rotate: [0, 10, 0, -10, 0],
                      scale: [1, 1.1, 1, 0.9, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-sm md:text-xl font-semibold mb-1 md:mb-2">{item.title}</h3>
                  <p className="text-xs md:text-base text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-6 md:mt-12 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={hairTreatmentsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#FF007F] to-[#FF5A36] text-white hover:opacity-90 text-xs md:text-lg px-4 md:px-8 py-2 md:py-6 rounded-full relative overflow-hidden group"
                onClick={() => {
                  setHairTreatmentsDialogOpen(true)
                  // After dialog closes, scroll to contact
                  const handleDialogClose = () => {
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }
                  // Add temporary event listener
                  window.addEventListener("hairDialogClosed", handleDialogClose, { once: true })
                }}
              >
                <span className="relative z-10">Explore Our Hair Treatments</span>
                <motion.span
                  className="absolute inset-0 bg-white/20 z-0"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ borderRadius: "100%" }}
                />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Gallery Section */}
        <section ref={galleryRef} className="py-10 md:py-20 lg:py-32 relative overflow-hidden" id="gallery">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#FFD500]/30 to-white z-0"
            style={{ y: useTransform(scrollYProgress, [0.4, 0.6], [0, -100]) }}
          />

          <div className="container px-4 relative z-10">
            <motion.div
              className="text-center mb-8 md:mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={galleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF007F] to-[#FFD500]"
                initial={{ opacity: 0, y: 50 }}
                animate={galleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
              >
                Our Gallery
              </motion.h2>

              <motion.div
                className="h-1 w-16 md:w-20 bg-gradient-to-r from-[#FF007F] to-[#FFD500] mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={galleryInView ? { width: 64 } : { width: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              <motion.p
                className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto mt-2 md:mt-4"
                initial={{ opacity: 0, y: 50 }}
                animate={galleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Take a look at our beautiful salon and the amazing transformations we create for our clients
              </motion.p>
            </motion.div>

            <GalleryGrid inView={galleryInView} />

            <motion.div
              className="mt-6 md:mt-12 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={galleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#FF007F] to-[#FFD500] text-white hover:opacity-90 text-xs md:text-lg px-4 md:px-8 py-2 md:py-6 rounded-full"
                onClick={() => {
                  const contactSection = document.getElementById("contact")
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                Book Your Consultation Now!
                <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-5 md:w-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Partners Section */}
        <section ref={partnersRef} className="py-8 md:py-16 lg:py-24 relative overflow-hidden" id="partners">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#FF007F]/5 via-[#FFD500]/5 to-[#00E5CF]/5 backdrop-blur-sm z-0"
            style={{ y: useTransform(scrollYProgress, [0.5, 0.7], [0, -50]) }}
          />

          {/* Decorative elements */}
          <motion.div
            className="absolute top-5 left-5 md:top-10 md:left-10 w-10 h-10 md:w-20 md:h-20 rounded-full bg-[#FF007F]/10 z-0"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-5 right-5 md:bottom-10 md:right-10 w-16 h-16 md:w-32 md:h-32 rounded-full bg-[#00E5CF]/10 z-0"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <div className="container px-4 relative z-10">
            <motion.div
              className="text-center mb-6 md:mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={partnersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-xl md:text-2xl lg:text-4xl font-semibold mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF007F] via-[#FFD500] to-[#00E5CF]"
                initial={{ opacity: 0, x: -100 }}
                animate={partnersInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              >
                Our Trusted Partners
              </motion.h2>

              <motion.div
                className="h-1 w-16 md:w-20 bg-gradient-to-r from-[#FF007F] via-[#FFD500] to-[#00E5CF] mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={partnersInView ? { width: 64 } : { width: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              <motion.p
                className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto mt-2 md:mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={partnersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                We partner with premium beauty brands to bring you the highest quality products and services
              </motion.p>
            </motion.div>

            <motion.div
              className="max-w-5xl mx-auto bg-white/40 backdrop-blur-md rounded-xl md:rounded-3xl p-4 md:p-8 shadow-xl border border-[#FF007F]/10"
              initial={{ opacity: 0, y: 30 }}
              animate={partnersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Update the partners section for better mobile display */}
              <motion.div
                className="flex flex-wrap justify-center items-center gap-3 md:gap-8 lg:gap-12"
                initial={{ opacity: 0 }}
                animate={partnersInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {partners.map((partner, index) => (
                  <motion.div
                    key={partner.name}
                    className="group relative"
                    initial={{ opacity: 0, y: 30, rotateY: 90 }}
                    animate={partnersInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 30, rotateY: 90 }}
                    transition={{ duration: 0.8, delay: 0.2 * index, type: "spring", stiffness: 100 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <div className="relative w-[70px] h-[45px] md:w-[140px] md:h-[80px] flex items-center justify-center p-2 md:p-4 rounded-lg md:rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#FF007F]/5 via-[#FFD500]/5 to-[#00E5CF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          background: [
                            "linear-gradient(90deg, rgba(255,0,127,0.05) 0%, rgba(255,213,0,0.05) 50%, rgba(0,229,207,0.05) 100%)",
                            "linear-gradient(90deg, rgba(0,229,207,0.05) 0%, rgba(255,0,127,0.05) 50%, rgba(255,213,0,0.05) 100%)",
                            "linear-gradient(90deg, rgba(255,213,0,0.05) 0%, rgba(0,229,207,0.05) 50%, rgba(255  100%)",
                            "linear-gradient(90deg, rgba(255,213,0,0.05) 0%, rgba(0,229,207,0.05) 50%, rgba(255,0,127,0.05) 100%)",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                      <Image
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        width={120}
                        height={60}
                        className="h-6 md:h-12 object-contain z-10 transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <motion.div
                      className="absolute -bottom-1 md:-bottom-2 left-0 right-0 text-center text-[10px] md:text-sm font-medium text-gray-600 opacity-0 group-hover:opacity-100 group-hover:-bottom-4 md:group-hover:-bottom-6 transition-all duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {partner.name}
                    </motion.div>
                    <motion.div
                      className="mt-10 md:mt-16 text-center text-[10px] md:text-sm text-gray-600 max-w-[120px] md:max-w-[200px] mx-auto"
                      initial={{ opacity: 0, y: 10 }}
                      animate={partnersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                    >
                      {partner.description}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          ref={testimonialsRef}
          className="py-10 md:py-20 lg:py-32 relative overflow-hidden bg-white"
          id="testimonials"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#FF5A36]/5 to-white z-0"
            style={{ y: useTransform(scrollYProgress, [0.6, 0.8], [0, -100]) }}
          />

          <div className="container px-4 relative z-10">
            <motion.div
              className="text-center mb-8 md:mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-2 md:mb-4"
                initial={{ opacity: 0, y: 50 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
              >
                What Our Clients Say
              </motion.h2>

              <motion.div
                className="h-1 w-16 md:w-20 bg-gradient-to-r from-[#FF007F] to-[#FFD500] mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={testimonialsInView ? { width: 64 } : { width: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <TestimonialCard inView={testimonialsInView} />
            </div>
          </div>
        </section>

        {/* Combo Offer Section */}
        <section ref={comboRef} className="py-8 md:py-16 lg:py-24 relative overflow-hidden" id="combo">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#FF007F]/10 to-[#00E5CF]/10 z-0"
            style={{ y: useTransform(scrollYProgress, [0.7, 0.9], [0, -50]) }}
          />

          <div className="container px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-xl md:rounded-3xl p-4 md:p-8 lg:p-12 shadow-xl border border-[#FF007F]/20 relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={comboInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: [
                    "linear-gradient(90deg, rgba(255,0,127,0) 0%, rgba(255,0,127,0.3) 50%, rgba(255,0,127,0) 100%)",
                    "linear-gradient(90deg, rgba(255,0,127,0) 100%, rgba 50%, rgba(255,0,127,0) 100%)",
                  ],
                  x: ["-100%", "100%"],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              <div className="text-center mb-4 md:mb-8">
                <motion.h2
                  className="text-xl md:text-3xl lg:text-4xl font-semibold mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF007F] to-[#FFD500]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={comboInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8 }}
                >
                  Beauty Combo Offer – Choose Any 5 Services
                </motion.h2>

                <motion.p
                  className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto mt-2 md:mt-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={comboInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Choose any 5 beauty services at Siri Beauty Center, Jayanagar. Plus explore premium beauty treatments.
                </motion.p>
              </div>

              {/* Update the combo offers grid for better mobile display */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4"
                initial={{ opacity: 0 }}
                animate={comboInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {comboAddons.map((addon, index) => (
                  <motion.div
                    key={addon.name}
                    className="bg-white rounded-lg md:rounded-xl p-2 md:p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-[#FF007F]/10 text-center cursor-pointer"
                    initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -5 : 5 }}
                    animate={
                      comboInView
                        ? { opacity: 1, y: 0, rotate: 0 }
                        : { opacity: 0, y: 50, rotate: index % 2 === 0 ? -5 : 5 }
                    }
                    transition={{ duration: 0.8, delay: 0.1 * index, type: "spring", stiffness: 100 }}
                    whileHover={{ y: -5, rotate: 0, scale: 1.05 }}
                    onClick={() => openComboServiceDialog(addon.id)}
                  >
                    <h3 className="text-xs md:text-base font-medium mb-0.5 md:mb-1">{addon.name}</h3>
                    <p className="text-[#FF007F] text-xs md:text-base font-semibold">{addon.price}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="mt-4 md:mt-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={comboInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#FF007F] to-[#FFD500] text-white hover:opacity-90 text-xs md:text-lg px-4 md:px-8 py-2 md:py-6 rounded-full"
                  onClick={() => {
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Avail the Beauty Combo Offer – Limited Slots Available!
                  <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-5 md:w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section ref={faqRef} className="py-10 md:py-20 lg:py-24 relative overflow-hidden" id="faq">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#FF007F]/10 to-white z-0"
            style={{ y: useTransform(scrollYProgress, [0.75, 0.95], [0, -50]) }}
          />

          <div className="container px-4 relative z-10">
            <motion.div
              className="text-center mb-8 md:mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF007F] to-[#FF5A36]"
                initial={{ opacity: 0, y: 50 }}
                animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
              >
                Frequently Asked Questions
              </motion.h2>

              <motion.div
                className="h-1 w-16 md:w-20 bg-gradient-to-r from-[#FF007F] to-[#FF5A36] mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={faqInView ? { width: 64 } : { width: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              />

              <motion.p
                className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto mt-2 md:mt-4"
                initial={{ opacity: 0, y: 50 }}
                animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Find answers to common questions about Siri Beauty and Wellness Center in Jayanagar, Bangalore
              </motion.p>
            </motion.div>

            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={faqInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="space-y-4 md:space-y-6" itemScope itemType="https://schema.org/FAQPage">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-[#FF007F]/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/Question"
                  >
                    <button
                      className="w-full flex justify-between items-center text-left"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={openFaq === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <h3 className="text-sm md:text-xl font-semibold pr-4" itemProp="name">
                        {faq.question}
                      </h3>
                      <div className="text-[#FF007F] flex-shrink-0">
                        {openFaq === index ? (
                          <Minus className="h-4 w-4 md:h-6 md:w-6" />
                        ) : (
                          <Plus className="h-4 w-4 md:h-6 md:w-6" />
                        )}
                      </div>
                    </button>

                    <div
                      id={`faq-answer-${index}`}
                      className={`mt-2 md:mt-4 text-gray-600 text-xs md:text-base overflow-hidden transition-all duration-300 ${
                        openFaq === index ? "max-h-96" : "max-h-0"
                      }`}
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <div itemProp="text">{openFaq === index && <p>{faq.answer}</p>}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact & Booking Section */}
        <section ref={contactRef} className="py-10 md:py-20 lg:py-32 relative overflow-hidden bg-white" id="contact">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#00E5CF]/10 to-white z-0"
            style={{ y: useTransform(scrollYProgress, [0.8, 1], [0, -100]) }}
          />

          <div className="container px-4 relative z-10">
            <motion.div
              className="text-center mb-8 md:mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-2 md:mb-4"
                initial={{ opacity: 0, y: 50 }}
                animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
              >
                Contact Siri Beauty & Wellness – Jayanagar, Bangalore
              </motion.h2>

              <motion.div
                className="h-1 w-16 md:w-20 bg-gradient-to-r from-[#FF007F] to-[#00E5CF] mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={contactInView ? { width: 64 } : { width: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              />

              <motion.p
                className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto mt-2 md:mt-4"
                initial={{ opacity: 0, y: 50 }}
                animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Call or WhatsApp Siri Beauty and Wellness for appointments, location, or consultations. Located in
                Jayanagar, Bangalore. Open all days.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-3xl p-4 md:p-8 shadow-lg border border-[#FF007F]/10 h-full"
              >
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-[#FF007F]">
                      Contact Information
                    </h3>

                    <motion.div
                      className="mb-4 md:mb-8 relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    >
                      <div className="w-full h-32 md:h-48 rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={contactInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                          >
                            <MapPin className="h-8 w-8 md:h-12 md:w-12 text-[#FF007F]" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>

                    <ul className="space-y-3 md:space-y-6">
                      <motion.li
                        className="flex items-start gap-2 md:gap-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        <div className="bg-[#FF007F]/10 p-2 md:p-3 rounded-full text-[#FF007F]">
                          <MapPin className="h-3 w-3 md:h-5 md:w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm md:text-base font-medium">Address</h4>
                          <a
                            href="https://maps.google.com/?q=40th Cross Rd, Kottapalya, Jayanagara 9th Block, Jayanagar, Bengaluru, Karnataka 560041"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs md:text-base text-gray-600 hover:text-[#FF007F] transition-colors"
                          >
                            40th Cross Rd, Kottapalya, Jayanagara 9th Block, Jayanagar, Bengaluru, Karnataka 560041
                          </a>
                        </div>
                      </motion.li>

                      <motion.li
                        className="flex items-start gap-2 md:gap-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      >
                        <div className="bg-[#FF007F]/10 p-2 md:p-3 rounded-full text-[#FF007F]">
                          <Phone className="h-3 w-3 md:h-5 md:w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm md:text-base font-medium">Phone</h4>
                          <p className="text-xs md:text-base text-gray-600">
                            <a href="tel:+919611206947" className="hover:text-[#FF007F] transition-colors">
                              +91 9611206947
                            </a>{" "}
                            |
                            <a href="tel:+919611206587" className="hover:text-[#FF007F] transition-colors ml-1">
                              +91 9611206587
                            </a>
                          </p>
                        </div>
                      </motion.li>

                      <motion.li
                        className="flex items-start gap-2 md:gap-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      >
                        <div className="bg-[#FF007F]/10 p-2 md:p-3 rounded-full text-[#FF007F]">
                          <Mail className="h-3 w-3 md:h-5 md:w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm md:text-base font-medium">Email</h4>
                          <a
                            href="mailto:siriwellnesscentreblr@gmail.com"
                            className="text-xs md:text-base text-gray-600 hover:text-[#FF007F] transition-colors"
                          >
                            siriwellnesscentreblr@gmail.com
                          </a>
                        </div>
                      </motion.li>
                    </ul>
                  </div>

                  <motion.div
                    className="mt-5 md:mt-10 flex gap-2 md:gap-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    {[
                      {
                        icon: <Instagram className="h-3 w-3 md:h-5 md:w-5" />,
                        color: "from-[#FF007F] to-[#FF5A36]",
                        href: "https://www.instagram.com/siri_beauty_and_wellnesscenter?igsh=b3gwZDRkNnFmemw=",
                      },
                      {
                        icon: <Facebook className="h-3 w-3 md:h-5 md:w-5" />,
                        color: "from-[#00E5CF] to-[#0077FF]",
                        href: "https://www.facebook.com/share/1U6mXKo6v3/",
                      },
                      {
                        icon: <Phone className="h-3 w-3 md:h-5 md:w-5" />,
                        color: "from-[#25D366] to-[#128C7E]",
                        href: "https://wa.me/919611206947",
                      },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`bg-gradient-to-r ${social.color} p-2 md:p-3 rounded-full text-white hover:shadow-lg transition-all duration-300`}
                        whileHover={{ y: -5, scale: 1.1 }}
                        animate={{
                          boxShadow: [
                            "0 0 0 rgba(255, 0, 127, 0)",
                            "0 0 15px rgba(255, 0, 127, 0.7)",
                            "0 0 0 rgba(255, 0, 127, 0)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-3xl p-4 md:p-8 shadow-lg border border-[#FF007F]/10"
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-[#FF007F]">Book an Appointment</h3>

                <BookingForm services={services} inView={contactInView} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* Service Dialogs */}
        <HydrafacialDialog open={hydrafacialDialogOpen} onOpenChange={setHydrafacialDialogOpen} />
        <HairTreatmentsDialog open={hairTreatmentsDialogOpen} onOpenChange={setHairTreatmentsDialogOpen} />
        <WeightLossDialog
          open={weightLossDialogOpen}
          onOpenChange={setWeightLossDialogOpen}
          initialCategory={weightLossCategory}
        />
        <ComboServiceDialog
          open={comboServiceDialogOpen}
          onOpenChange={setComboServiceDialogOpen}
          initialService={comboService}
        />
        <MicrobladingDialog open={microbladingDialogOpen} onOpenChange={setMicrobladingDialogOpen} />
        <BridalGroomDialog open={bridalGroomDialogOpen} onOpenChange={setBridalGroomDialogOpen} />
        <BeautyServicesDialog open={beautyServicesDialogOpen} onOpenChange={setBeautyServicesDialogOpen} />
        <LaserTreatmentsDialog open={laserTreatmentsDialogOpen} onOpenChange={setLaserTreatmentsDialogOpen} />
      </main>
    </>
  )
}
