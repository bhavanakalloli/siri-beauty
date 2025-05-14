"use client"

import type React from "react"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface BlogCardProps {
  id: string
  title: string
  category: string
  date: string
  excerpt: string
  image: string
  color?: "green" | "blue" | "white" | "black"
  layout?: "large" | "medium" | "small"
}

export function BlogCard({
  id,
  title,
  category,
  date,
  excerpt,
  image,
  color = "white",
  layout = "medium",
}: BlogCardProps) {
  const router = useRouter()

  const sizes = {
    large: "col-span-2 row-span-2 md:col-span-1 md:row-span-1",
    medium: "col-span-2 md:col-span-1",
    small: "col-span-1",
  }

  const handleCardClick = () => {
    router.push(`/blog/${id}`)
  }

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent the card click from firing
    router.push(`/blog/${id}`)
  }

  return (
    <motion.div
      className={`rounded-3xl overflow-hidden ${sizes[layout]} cursor-pointer relative h-[300px] md:h-[350px]`}
      onClick={handleCardClick}
      whileHover={{
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        borderColor: "rgba(255, 0, 127, 0.3)",
        transition: { duration: 0.3 },
      }}
    >
      {/* Image with overlay for all card types */}
      <div className="relative h-full w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 z-10"
          whileHover={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            transition: { duration: 0.3 },
          }}
        />

        <motion.div className="h-full w-full" whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}>
          <Image
            src={image || "/placeholder.svg?height=600&width=600&query=beauty treatment"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20"></div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white z-30"
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.span
              className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full"
              whileHover={{
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                transition: { duration: 0.3 },
              }}
            >
              Category · {category}
            </motion.span>
            <span className="text-xs">{date}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black uppercase mb-2 text-white">{title}</h3>

          {/* Only show read more on medium and small cards */}
          {(layout === "medium" || layout === "small") && (
            <motion.button
              onClick={handleReadMoreClick}
              className="flex items-center text-sm font-medium hover:underline group text-left text-white/90"
              whileHover={{ x: 5, transition: { duration: 0.2 } }}
            >
              Read more
              <motion.span
                className="ml-1 inline-block"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
