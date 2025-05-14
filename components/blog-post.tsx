"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useState } from "react"

interface BlogPostProps {
  title: string
  keywords: string
  introduction: string
  sections: { title: string; content: string }[]
  conclusion: string
  className?: string
  index: number
}

export function BlogPost({ title, keywords, introduction, sections, conclusion, className, index }: BlogPostProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className={cn(
        "bg-white rounded-xl shadow-md overflow-hidden border border-transparent transition-all duration-300",
        isHovered ? "shadow-lg border-pink-200" : "",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{title}</h2>

        <div className="mb-3">
          <p className="text-xs text-gray-500 italic">Keywords: {keywords}</p>
        </div>

        <div className="prose max-w-none mb-4 text-sm">
          <p className="text-gray-700">{introduction}</p>
        </div>

        <div className="space-y-3 mb-4">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
            >
              <h3 className="text-base font-semibold text-gray-800 mb-1">• {section.title}</h3>
              <p className="text-sm text-gray-700">{section.content}</p>
            </motion.div>
          ))}
        </div>

        <div className="prose max-w-none border-t border-gray-100 pt-3">
          <h3 className="text-base font-semibold text-gray-800 mb-1">Conclusion</h3>
          <p className="text-sm text-gray-700">{conclusion}</p>
        </div>

        <div className="mt-4">
          <motion.a
            href="#contact"
            className="inline-block bg-gradient-to-r from-[#FF007F] to-[#FF5A36] text-white px-4 py-2 text-sm rounded-full hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.a>
        </div>
      </div>
    </motion.article>
  )
}
