"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CursorEffects() {
  // Use motion values instead of state for better performance
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isClient, setIsClient] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const sparklesRef = useRef<HTMLDivElement>(null)
  const sparklesContainerRef = useRef<HTMLDivElement>(null)
  const sparklePoolRef = useRef<HTMLDivElement[]>([])
  const lastSparkleTime = useRef(0)

  // Spring physics for smoother animation
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(mouseX, springConfig)
  const cursorYSpring = useSpring(mouseY, springConfig)

  // Pre-create sparkle elements for reuse (object pooling)
  const initSparklePool = useCallback(() => {
    if (!sparklesContainerRef.current) return

    // Clear existing pool
    sparklePoolRef.current.forEach((el) => {
      if (el.parentNode === sparklesContainerRef.current) {
        sparklesContainerRef.current.removeChild(el)
      }
    })

    sparklePoolRef.current = []

    // Create pool of reusable sparkle elements
    for (let i = 0; i < 30; i++) {
      const sparkle = document.createElement("div")
      sparkle.className = "absolute pointer-events-none"
      sparkle.style.borderRadius = "50%"
      sparkle.style.background = `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,0,127,0.5) 100%)`
      sparkle.style.boxShadow = "0 0 10px 2px rgba(255, 0, 127, 0.3)"
      sparkle.style.transform = "translate(-50%, -50%) scale(0)"
      sparkle.style.opacity = "0"
      sparkle.style.width = "0px"
      sparkle.style.height = "0px"
      sparkle.style.position = "absolute"
      sparkle.style.left = "0px"
      sparkle.style.top = "0px"

      sparklePoolRef.current.push(sparkle)
    }
  }, [])

  // Optimized sparkle creation using object pooling
  const createSparkle = useCallback((x: number, y: number) => {
    if (!sparklesContainerRef.current) return

    // Throttle sparkle creation
    const now = performance.now()
    if (now - lastSparkleTime.current < 20) return
    lastSparkleTime.current = now

    // Find an available sparkle from the pool
    const availableSparkle = sparklePoolRef.current.find((el) => el.style.opacity === "0" || !el.parentNode)

    if (!availableSparkle) return

    // Reset and position the sparkle
    const size = Math.random() * 10 + 5
    availableSparkle.style.width = `${size}px`
    availableSparkle.style.height = `${size}px`
    availableSparkle.style.left = `${x}px`
    availableSparkle.style.top = `${y}px`
    availableSparkle.style.transform = "translate(-50%, -50%) scale(0)"
    availableSparkle.style.opacity = "1"

    if (!availableSparkle.parentNode) {
      sparklesContainerRef.current.appendChild(availableSparkle)
    }

    // Random animation
    const duration = Math.random() * 800 + 400
    const angle = Math.random() * Math.PI * 2
    const distance = Math.random() * 80 + 40
    const destX = Math.cos(angle) * distance
    const destY = Math.sin(angle) * distance

    // Use requestAnimationFrame for smoother animation
    let startTime: number | null = null
    const animateSparkle = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function
      const easeOutQuad = (t: number) => t * (2 - t)
      const easedProgress = easeOutQuad(progress)

      // Apply animation
      const scaleValue = progress < 0.5 ? progress * 2 : 2 - progress * 2
      const translateX = destX * easedProgress
      const translateY = destY * easedProgress
      const opacity = progress < 0.7 ? 1 : 1 - (progress - 0.7) / 0.3

      availableSparkle.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(${scaleValue})`
      availableSparkle.style.opacity = `${opacity}`

      if (progress < 1) {
        requestAnimationFrame(animateSparkle)
      } else {
        availableSparkle.style.opacity = "0"
      }
    }

    requestAnimationFrame(animateSparkle)
  }, [])

  // Optimized mouse move handler with RAF
  useEffect(() => {
    setIsClient(true)

    // Initialize sparkle pool
    initSparklePool()

    const rafId: number | null = null
    let lastX = 0
    let lastY = 0
    let throttleTimeout: NodeJS.Timeout | null = null
    const animationFrameIds: number[] = []

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e

      // Update motion values directly (very efficient)
      mouseX.set(clientX)
      mouseY.set(clientY)

      // Store values for sparkle creation
      lastX = clientX
      lastY = clientY

      // Throttle sparkle creation
      if (!throttleTimeout && Math.random() > 0.7) {
        throttleTimeout = setTimeout(() => {
          createSparkle(clientX, clientY)
          throttleTimeout = null
        }, 30)
      }
    }

    const handleMouseDown = () => {
      setIsClicking(true)
      // Create a burst of sparkles on click
      if (lastX && lastY) {
        // Use fewer sparkles for better performance
        for (let i = 0; i < 6; i++) {
          setTimeout(() => createSparkle(lastX, lastY), i * 30)
        }
      }
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    // Use passive event listeners for better performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mousedown", handleMouseDown, { passive: true })
    window.addEventListener("mouseup", handleMouseUp, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      if (throttleTimeout) clearTimeout(throttleTimeout)
      if (rafId) cancelAnimationFrame(rafId)
      // Cancel all animation frames
      animationFrameIds.forEach((id) => {
        if (id) cancelAnimationFrame(id)
      })
    }
  }, [createSparkle, initSparklePool])

  // Don't render anything on server
  if (!isClient) return null

  return (
    <>
      {/* Main cursor glow effect */}
      <motion.div
        className="fixed pointer-events-none z-50 rounded-full mix-blend-screen will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(255,0,127,0.7) 0%, rgba(255,255,255,0) 70%)",
          width: "300px",
          height: "300px",
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          filter: "blur(5px) brightness(1.5)",
          opacity: isClicking ? 0.9 : 0.7,
          scale: isClicking ? 1.2 : 1,
        }}
        animate={{
          scale: isClicking ? [1, 1.2, 1] : 1,
          opacity: isClicking ? [0.7, 0.9, 0.7] : 0.7,
        }}
        transition={{
          duration: 0.3,
        }}
      />

      {/* Sparkle container */}
      <div ref={sparklesContainerRef} className="fixed inset-0 pointer-events-none z-40 overflow-hidden" />

      {/* Smaller, faster following cursor with sparkle effect */}
      <motion.div
        className="fixed pointer-events-none z-50 rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,0,127,0.7) 100%)",
          boxShadow: "0 0 15px 5px rgba(255, 0, 127, 0.5)",
          width: "15px",
          height: "15px",
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? [1, 1.5, 1] : 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {/* Inner sparkle */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
          }}
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Interactive elements highlight */}
      <style jsx global>{`
        /* Add subtle hover effect to all interactive elements */
        a, button, [role="button"], input, select, textarea {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        a:hover, button:hover, [role="button"]:hover, input:focus, select:focus, textarea:focus {
          transform: scale(1.03);
          box-shadow: 0 0 20px rgba(255, 0, 127, 0.5);
        }
        
        /* Add subtle rotation to service cards on hover */
        [data-cursor-rotate] {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        [data-cursor-rotate]:hover {
          transform: perspective(1000px) rotateY(calc((var(--mouse-x, 0) - 0.5) * 15deg)) 
                                        rotateX(calc((var(--mouse-y, 0) - 0.5) * -15deg));
          box-shadow: 0 10px 30px rgba(255, 0, 127, 0.3),
                      0 0 20px rgba(255, 0, 127, 0.2);
        }
      `}</style>

      {/* Optimized script to track mouse position relative to elements */}
      {isClient && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Use a more efficient approach with throttling
              let ticking = false;
              let cards = [];
              
              // Cache all rotatable elements once
              function cacheRotatableElements() {
                cards = Array.from(document.querySelectorAll('[data-cursor-rotate]'));
              }
              
              // Call once on load
              if (document.readyState === 'complete') {
                cacheRotatableElements();
              } else {
                window.addEventListener('load', cacheRotatableElements);
              }
              
              // Recache occasionally to catch dynamically added elements
              setInterval(cacheRotatableElements, 3000);
              
              document.addEventListener('mousemove', (e) => {
                if (!ticking) {
                  window.requestAnimationFrame(() => {
                    const { clientX, clientY } = e;
                    
                    cards.forEach(card => {
                      const rect = card.getBoundingClientRect();
                      
                      // Only process if mouse is near the card (optimization)
                      if (
                        clientX >= rect.left - 100 && 
                        clientX <= rect.right + 100 && 
                        clientY >= rect.top - 100 && 
                        clientY <= rect.bottom + 100
                      ) {
                        const x = (clientX - rect.left) / rect.width;
                        const y = (clientY - rect.top) / rect.height;
                        
                        if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
                          card.style.setProperty('--mouse-x', x);
                          card.style.setProperty('--mouse-y', y);
                        }
                      }
                    });
                    
                    ticking = false;
                  });
                  
                  ticking = true;
                }
              }, { passive: true });
            `,
          }}
        />
      )}
    </>
  )
}
