"use client"

import { useEffect, useRef } from "react"

export default function HeroSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Sparkle properties
    const sparkles: {
      x: number
      y: number
      size: number
      speed: number
      opacity: number
      color: string
      rotation: number
      rotationSpeed: number
    }[] = []

    // Create sparkles
    const createSparkles = () => {
      const colors = ["#FF007F", "#FF5A36", "#00E5CF", "#FFD500", "#FFFFFF"]

      for (let i = 0; i < 100; i++) {
        sparkles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 1,
          speed: Math.random() * 1 + 0.2,
          opacity: Math.random() * 0.7 + 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2,
        })
      }
    }

    createSparkles()

    // Draw star shape
    const drawStar = (x: number, y: number, size: number, rotation: number, color: string, opacity: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.beginPath()

      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2
        const innerAngle = angle + Math.PI / 5

        if (i === 0) {
          ctx.moveTo(Math.cos(angle) * size, Math.sin(angle) * size)
        } else {
          ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size)
        }

        ctx.lineTo(Math.cos(innerAngle) * (size / 2), Math.sin(innerAngle) * (size / 2))
      }

      ctx.closePath()
      ctx.fillStyle = color
      ctx.globalAlpha = opacity
      ctx.fill()
      ctx.restore()
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparkles.forEach((sparkle) => {
        // Draw sparkle
        if (Math.random() > 0.5) {
          drawStar(sparkle.x, sparkle.y, sparkle.size, sparkle.rotation, sparkle.color, sparkle.opacity)
        } else {
          ctx.beginPath()
          ctx.arc(sparkle.x, sparkle.y, sparkle.size / 2, 0, Math.PI * 2)
          ctx.fillStyle = sparkle.color
          ctx.globalAlpha = sparkle.opacity
          ctx.fill()
        }

        // Update sparkle
        sparkle.y -= sparkle.speed
        sparkle.rotation += sparkle.rotationSpeed

        // Random opacity fluctuation
        sparkle.opacity += Math.random() * 0.03 - 0.015
        if (sparkle.opacity < 0.1) sparkle.opacity = 0.1
        if (sparkle.opacity > 0.8) sparkle.opacity = 0.8

        // Reset if out of bounds
        if (sparkle.y < -10) {
          sparkle.y = canvas.height + 10
          sparkle.x = Math.random() * canvas.width
          sparkle.size = Math.random() * 4 + 1
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0" />
}
