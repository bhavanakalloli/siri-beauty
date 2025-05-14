"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
// Add import for ImageWithFallback
import ImageWithFallback from "./image-with-fallback"

interface GalleryGridProps {
  inView: boolean
}

export default function GalleryGrid({ inView }: GalleryGridProps) {
  // Gallery images data with actual salon images
  const galleryImages = [
    {
      src: "/salon-reception.jpeg",
      alt: "Siri Beauty Salon reception area with elegant counter and logo display",
      size: "landscape",
      title: "Our Welcoming Reception",
    },
    {
      src: "/salon-styling-area.jpeg",
      alt: "Professional hair styling area with mirrors and green accent wall",
      size: "portrait",
      title: "Styling Station",
    },
    {
      src: "/salon-logo-buddha.jpeg",
      alt: "Illuminated Siri logo with decorative Buddha statue and floral arrangement",
      size: "square",
      title: "Zen Ambiance",
    },
    {
      src: "/salon-exterior-signage.jpeg",
      alt: "Exterior signage of Siri Beauty and Wellness Center showcasing all services",
      size: "landscape",
      title: "Our Storefront",
    },
    {
      src: "/salon-interior-display.jpeg",
      alt: "Interior view with product displays and beauty academy entrance",
      size: "portrait",
      title: "Product Showcase",
    },
    {
      src: "/salon-reception-logo.jpeg",
      alt: "Close-up of reception desk with illuminated Siri logo and fresh flowers",
      size: "square",
      title: "Brand Experience",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-5xl mx-auto">
      {galleryImages.map((image, index) => (
        <motion.div
          key={index}
          className={`overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${
            image.size === "landscape" ? "col-span-2" : ""
          } group relative h-[150px] md:h-[160px] lg:h-[180px]`}
          initial={{
            opacity: 0,
            y: 50,
            rotate: index % 2 === 0 ? -3 : 3,
            scale: 0.9,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                }
              : {
                  opacity: 0,
                  y: 50,
                  rotate: index % 2 === 0 ? -3 : 3,
                  scale: 0.9,
                }
          }
          transition={{
            duration: 0.6,
            delay: 0.1 * index,
            type: "spring",
            stiffness: 50,
          }}
          whileHover={{
            scale: 1.03,
            rotate: index % 2 === 0 ? -1 : 1,
            zIndex: 10,
          }}
        >
          <div className="relative w-full h-full">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="w-full h-full">
              {/* Replace the Image component with ImageWithFallback */}
              <ImageWithFallback
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="eager"
                priority={index < 2}
                fallbackSrc={`/placeholder.svg?height=300&width=400&query=${encodeURIComponent(image.alt)}`}
              />
            </motion.div>

            {/* Overlay with title that appears on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 md:p-3"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <div className="flex items-center gap-1">
                <Sparkles className="h-2 w-2 md:h-3 md:w-3 text-[#FFD500]" />
                <h3 className="text-white font-medium text-xs md:text-sm">{image.title}</h3>
              </div>
              <p className="text-white/80 text-[10px] md:text-xs line-clamp-2">{image.alt}</p>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
