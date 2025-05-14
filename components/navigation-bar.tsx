"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  href: string
  isButton?: boolean
}

const navItems: NavItem[] = [
  { name: "Blog", href: "/blog" },
  { name: "Gallery", href: "#gallery" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact", isButton: true },
]

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking a link
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href")

    // Only prevent default and handle smooth scroll for hash links
    if (href && href.startsWith("#")) {
      e.preventDefault()

      // Close the mobile menu first
      setIsOpen(false)

      // Small delay to allow menu closing animation to complete
      setTimeout(() => {
        if (href === "#") {
          window.scrollTo({ top: 0, behavior: "smooth" })
        } else {
          const element = document.getElementById(href.substring(1))
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }
      }, 300)
    } else {
      // For non-hash links like /blog, let the default navigation happen
      setIsOpen(false)
    }
  }

  // Handle image loading error
  const handleImageError = () => {
    console.error("Failed to load logo image")
    setImageError(true)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="z-10 flex items-center">
            <div className={cn("relative transition-all duration-300", scrolled ? "h-16 w-24" : "h-20 w-32")}>
              {imageError ? (
                // Fallback if image fails to load
                <div className="flex items-center justify-center h-full w-full">
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8B0000] to-[#76B947]">
                    Siri Beauty
                  </span>
                  <Sparkles className="ml-1 h-4 w-4 text-[#8B0000]" />
                </div>
              ) : (
                <Image
                  src="/siri-new-logo.png"
                  alt="Siri Beauty"
                  fill
                  className="object-contain"
                  priority
                  onError={handleImageError}
                  sizes="(max-width: 768px) 100px, 150px"
                />
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  item.isButton
                    ? "bg-gradient-to-r from-[#FF007F] to-[#FF5A36] text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300"
                    : scrolled
                      ? "text-gray-800 hover:text-[#FF007F] px-3 py-2 rounded-md transition-colors"
                      : "text-white hover:text-white/80 px-3 py-2 rounded-md transition-colors",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-10 p-2 rounded-full bg-white/20 backdrop-blur-md text-gray-800"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "px-4 py-3 rounded-lg transition-colors",
                      item.isButton
                        ? "bg-gradient-to-r from-[#FF007F] to-[#FF5A36] text-white font-medium"
                        : "text-gray-800 hover:bg-gray-100",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
