"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Instagram, Facebook, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Footer() {
  const [logoError, setLogoError] = useState(false)

  // Handle logo loading error
  const handleLogoError = () => {
    console.error("Failed to load logo image in footer")
    setLogoError(true)
  }

  // Utility function for smooth scrolling to sections
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="py-6 md:py-10 relative overflow-hidden bg-[#FF0080]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-4 md:mb-8">
          {/* Column 1: About */}
          <div>
            {!logoError ? (
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src="/siri-new-logo.png"
                  alt="Siri Beauty"
                  fill
                  className="object-contain"
                  onError={handleLogoError}
                  sizes="128px"
                />
              </div>
            ) : (
              <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#76B947]">Siri</span>{" "}
                Beauty and Wellness Center
              </h3>
            )}
            <p className="text-xs md:text-base text-white/80 mb-3 md:mb-6">
              Bangalore's premier beauty destination offering advanced skin treatments, hair care, weight loss
              solutions, and luxury beauty services at affordable prices.
            </p>
            <div className="flex space-x-2 md:space-x-4">
              {[
                {
                  icon: <Instagram className="h-3 w-3 md:h-5 md:w-5" />,
                  color: "bg-white/20 hover:bg-white/30",
                  href: "https://www.instagram.com/siri_beauty_and_wellnesscenter?igsh=b3gwZDRkNnFmemw=",
                },
                {
                  icon: <Facebook className="h-3 w-3 md:h-5 md:w-5" />,
                  color: "bg-white/20 hover:bg-white/30",
                  href: "https://www.facebook.com/share/1U6mXKo6v3/",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3 md:h-5 md:w-5"
                    >
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path>
                      <path d="M13 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path>
                      <path d="M9 14a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5Z"></path>
                    </svg>
                  ),
                  color: "bg-white/20 hover:bg-white/30",
                  href: "https://wa.me/919611206947",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} p-2 md:p-3 rounded-full text-white hover:shadow-lg transition-all duration-300`}
                  whileHover={{ y: -3, scale: 1.05 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Contact & Hours */}
          <div>
            <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-4">Contact Information</h3>
            <ul className="space-y-1.5 md:space-y-3 text-xs md:text-base text-white/80">
              <li className="flex items-center">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-white/60" />
                <span>40th Cross Rd, Kottapalya, Jayanagara 9th Block, Jayanagar, Bengaluru, Karnataka 560041</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-white/60" />
                <span>+91 9611206947 | +91 9611206587</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-white/60" />
                <span>siriwellnesscentreblr@gmail.com</span>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/siri_beauty_and_wellnesscenter?igsh=b3gwZDRkNnFmemw="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <Instagram className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-white/60" />
                  <span>siri_beauty_and_wellnesscenter</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/1U6mXKo6v3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <Facebook className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-white/60" />
                  <span>Siri Beauty on Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919611206947"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-white/60"
                  >
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path>
                    <path d="M13 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"></path>
                    <path d="M9 14a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5Z"></path>
                  </svg>
                  <span>WhatsApp: +91 9611206947</span>
                </a>
              </li>
            </ul>

            <h3 className="text-base md:text-xl font-bold text-white mt-3 md:mt-6 mb-1.5 md:mb-3">Business Hours</h3>
            <ul className="space-y-0.5 md:space-y-1 text-xs md:text-base text-white/80">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>10:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>9:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>10:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-4">Quick Links</h3>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-base text-white/80">
              {[
                { name: "Our Services", link: "services" },
                { name: "Beauty Treatments", link: "treatments" },
                { name: "Weight Loss & Slimming", link: "slimming" },
                { name: "Hair Treatments", link: "hair-treatments" },
                { name: "Gallery", link: "gallery" },
                { name: "Combo Offers", link: "combo" },
                { name: "FAQ", link: "faq" },
                { name: "Book Appointment", link: "contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={`#${item.link}`}
                    onClick={(e) => scrollToSection(e, item.link)}
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <ArrowRight className="h-2 w-2 md:h-3 md:w-3 mr-1 md:mr-2" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-3 md:mt-6 bg-white/10 p-2 md:p-4 rounded-lg">
              <h4 className="text-sm md:text-base text-white font-medium mb-1 md:mb-2">Special Offer</h4>
              <p className="text-xs md:text-sm text-white/80 mb-1 md:mb-2">
                Get 20% off on your first visit! Use code: SIRI20
              </p>
              <Button
                size="sm"
                className="bg-white text-[#FF007F] hover:bg-white/90 w-full text-xs md:text-sm py-1 md:py-2"
                asChild
              >
                <Link href="#contact" onClick={(e) => scrollToSection(e, "contact")}>
                  Book Now
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-3 md:pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs md:text-sm text-white/80 mb-1 md:mb-0">
            © 2023 Siri Beauty and Wellness Center. All rights reserved.
          </p>
          <div className="flex space-x-2 md:space-x-4 text-white/60 text-xs">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
