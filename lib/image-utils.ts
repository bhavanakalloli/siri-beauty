/**
 * Utility functions for handling images
 */

// Preload critical images
export const preloadCriticalImages = () => {
  if (typeof window === "undefined") return

  const imagesToPreload = [
    "/salon-reception.jpeg",
    "/salon-styling-area.jpeg",
    "/salon-logo-buddha.jpeg",
    "/salon-exterior-signage.jpeg",
    "/salon-interior-display.jpeg",
    "/salon-reception-logo.jpeg",
  ]

  imagesToPreload.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

// Get absolute URL for image path
export const getImageUrl = (path: string) => {
  // If path is already a full URL, return it
  if (path.startsWith("http")) return path

  // If we're in the browser, use the base URL
  if (typeof window !== "undefined") {
    const baseUrl = window.location.origin
    return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`
  }

  // Fallback for server-side
  return path
}
