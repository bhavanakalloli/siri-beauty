"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Home, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import NavigationBar from "@/components/navigation-bar"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

// Import the blog posts data
const blogPosts = [
  {
    id: "weight-loss-programs",
    title: "The Ultimate Guide to Weight Loss Programs at Siri Beauty & Wellness",
    category: "Weight Loss",
    date: "May 5, 2025",
    excerpt:
      "At Siri Beauty & Wellness in Jayanagar, we understand that weight loss is a journey. Whether you're looking for slimming treatments, inch loss, body contouring, or effective fat reduction, we offer a comprehensive weight loss program designed for sustainable results.",
    image: "/treatments/Weightloss.jpeg",
    color: "black",
    layout: "large",
    keywords:
      "Best weight loss center in Bangalore, slimming treatments in Jayanagar, body contouring, weight loss programs near me, inch loss, fat reduction treatments, weight loss Bangalore",
    introduction:
      "At Siri Beauty & Wellness in Jayanagar, we understand that weight loss is a journey. Whether you're looking for slimming treatments, inch loss, body contouring, or effective fat reduction, we offer a comprehensive weight loss program designed for sustainable results.",
    sections: [
      {
        title: "Why Weight Loss Matters",
        content:
          "Health benefits of weight loss, including improved confidence, reduced risk of diseases, and enhanced well-being.",
      },
      {
        title: "Our Weight Loss Services",
        content: "Tailored weight loss programs, slimming therapies, and fat reduction.",
      },
      {
        title: "Effective Inch Loss Solutions",
        content: "Treatments like body contouring and skin tightening.",
      },
      {
        title: "Diet and Lifestyle Counseling",
        content: "Personalized plans for maintaining healthy eating and exercise routines.",
      },
      {
        title: "Customer Success Stories",
        content: "Testimonials showcasing the transformation achieved at Siri Wellness.",
      },
    ],
    conclusion:
      "Join Siri Beauty & Wellness for a personalized weight loss journey that targets your specific needs. Book your consultation today!",
  },
  {
    id: "hydrafacial-skin-rejuvenation",
    title: "Hydrafacial: The Ultimate Skin Rejuvenation Treatment",
    category: "Facial",
    date: "May 2, 2025",
    excerpt:
      "Discover the magic of Hydrafacial at Siri Beauty & Wellness in Jayanagar, Bangalore. This skin rejuvenation treatment offers a non-invasive way to achieve glowing skin with immediate results.",
    image: "/treatments/Hydrafacial.avif",
    color: "green",
    layout: "medium",
    keywords:
      "Hydrafacial near me, skin rejuvenation in Bangalore, facial treatments in Jayanagar, anti-aging facials, Hydrafacial Bangalore",
    introduction:
      "Discover the magic of Hydrafacial at Siri Beauty & Wellness in Jayanagar, Bangalore. This skin rejuvenation treatment offers a non-invasive way to achieve glowing skin with immediate results.",
    sections: [
      {
        title: "What is Hydrafacial?",
        content: "Explanation of how Hydrafacial works and its benefits.",
      },
      {
        title: "Key Benefits of Hydrafacial",
        content: "Including hydration, anti-aging, acne treatment, and improved skin texture.",
      },
      {
        title: "Hydrafacial vs. Other Facials",
        content: "Why Hydrafacial is superior to traditional facials.",
      },
      {
        title: "Who Should Consider Hydrafacial?",
        content: "Suitable for all skin types, including those with pigmentation, wrinkles, or acne.",
      },
      {
        title: "Post-Treatment Care",
        content: "Tips for maintaining results after a Hydrafacial.",
      },
    ],
    conclusion:
      "Get a flawless, glowing complexion with Hydrafacial at Siri Beauty & Wellness. Book your Hydrafacial today for radiant skin!",
  },
  {
    id: "prp-therapy-hair-loss",
    title: "Combatting Hair Fall with PRP Therapy at Siri Beauty & Wellness",
    category: "Hair",
    date: "April 28, 2025",
    excerpt:
      "Hair fall can be frustrating, but PRP (Platelet-Rich Plasma) therapy offers an innovative solution. At Siri Beauty & Wellness in Jayanagar, our PRP treatments for hair regrowth have helped countless clients regain thick, healthy hair.",
    image: "/treatments/PRP_Hairloss_PhoenixSkin (1).jpg",
    color: "blue",
    layout: "small",
    keywords:
      "PRP for hair loss, hair fall treatment in Bangalore, hair regrowth treatments, best PRP clinic near me, PRP therapy for hair",
    introduction:
      "Hair fall can be frustrating, but PRP (Platelet-Rich Plasma) therapy offers an innovative solution. At Siri Beauty & Wellness in Jayanagar, our PRP treatments for hair regrowth have helped countless clients regain thick, healthy hair.",
    sections: [
      {
        title: "How PRP for Hair Works",
        content: "A detailed explanation of the PRP process and how it stimulates hair growth.",
      },
      {
        title: "Benefits of PRP for Hair",
        content: "Non-surgical hair restoration, minimal downtime, and effective results.",
      },
      {
        title: "Why Choose PRP at Siri Beauty & Wellness?",
        content: "Expertise, advanced technology, and customized care.",
      },
      {
        title: "How Many Sessions are Required?",
        content: "An overview of the typical number of sessions needed for visible results.",
      },
      {
        title: "Client Testimonials",
        content: "Real stories from clients who have successfully undergone PRP therapy at Siri Wellness.",
      },
    ],
    conclusion:
      "Say goodbye to hair fall and hello to beautiful, healthy hair with PRP therapy at Siri Beauty & Wellness. Book your PRP consultation today!",
  },
  {
    id: "skin-brightening-treatments",
    title: "Skin Brightening Treatments for Glowing Skin",
    category: "Skin",
    date: "April 25, 2025",
    excerpt:
      "If you're looking for smooth, glowing skin, our skin brightening treatments are designed to target pigmentation, dark spots, and uneven skin tone, leaving you with radiant skin.",
    image: "/treatments/Facial.jpg",
    color: "white",
    layout: "small",
    keywords:
      "Skin brightening treatments, pigmentation treatment in Jayanagar, acne scars treatment, skin whitening Bangalore, brightening facials",
    introduction:
      "If you're looking for smooth, glowing skin, our skin brightening treatments are designed to target pigmentation, dark spots, and uneven skin tone, leaving you with radiant skin.",
    sections: [
      {
        title: "What is Skin Brightening?",
        content: "Difference between brightening, whitening, and toning treatments.",
      },
      {
        title: "Best Treatments for Pigmentation",
        content: "Including chemical peels, laser treatments, and skin lightening facials.",
      },
      {
        title: "Hydrafacial for Skin Brightening",
        content: "How Hydrafacial helps brighten the skin and reduce pigmentation.",
      },
      {
        title: "Other Skin Treatments for Glowing Skin",
        content: "Microdermabrasion, PRP for skin, and carbon laser peel.",
      },
      {
        title: "Results You Can Expect",
        content: "How soon you'll notice results and maintaining bright skin long-term.",
      },
    ],
    conclusion:
      "Achieve flawless, glowing skin with our skin brightening treatments. Book a consultation with Siri Beauty & Wellness today!",
  },
  {
    id: "botox-anti-aging-benefits",
    title: "Understanding Botox and Its Anti-Aging Benefits",
    category: "Anti-Aging",
    date: "April 20, 2025",
    excerpt:
      "Botox is a highly effective anti-aging treatment that smoothens wrinkles and prevents new ones from forming. At Siri Beauty & Wellness in Jayanagar, we specialize in Botox treatments that restore youthfulness to your skin.",
    image: "/treatments/Botox.jpg",
    color: "green",
    layout: "medium",
    keywords:
      "Botox treatment in Bangalore, anti-aging treatments, wrinkle reduction near me, best Botox services, Botox for skin tightening",
    introduction:
      "Botox is a highly effective anti-aging treatment that smoothens wrinkles and prevents new ones from forming. At Siri Beauty & Wellness in Jayanagar, we specialize in Botox treatments that restore youthfulness to your skin.",
    sections: [
      {
        title: "What is Botox?",
        content: "A detailed explanation of Botox, its ingredients, and its purpose.",
      },
      {
        title: "Botox for Wrinkle Reduction",
        content: "How Botox works to eliminate fine lines and wrinkles.",
      },
      {
        title: "Other Anti-Aging Treatments",
        content: "Combining Botox with other treatments like dermal fillers, skin tightening, and PRP.",
      },
      {
        title: "Who Should Consider Botox?",
        content: "Ideal candidates for Botox treatments.",
      },
      {
        title: "Botox vs. Other Anti-Aging Treatments",
        content: "Comparing Botox with non-invasive facelifts and lasers.",
      },
    ],
    conclusion:
      "Rejuvenate your skin and restore youthful radiance with Botox at Siri Beauty & Wellness. Book your Botox consultation today!",
  },
  {
    id: "laser-hair-removal",
    title: "Permanent Hair Removal Solutions with Laser Hair Reduction",
    category: "Hair Removal",
    date: "April 15, 2025",
    excerpt:
      "Say goodbye to waxing, shaving, and threading with permanent hair removal solutions at Siri Beauty & Wellness. Our advanced laser hair reduction treatments offer long-lasting results.",
    image: "/treatments/Laser Body Sculpting.jpg",
    color: "blue",
    layout: "small",
    keywords:
      "Laser hair removal Bangalore, permanent hair removal, laser hair reduction near me, best hair removal clinic in Jayanagar, painless hair removal",
    introduction:
      "Say goodbye to waxing, shaving, and threading with permanent hair removal solutions at Siri Beauty & Wellness. Our advanced laser hair reduction treatments offer long-lasting results.",
    sections: [
      {
        title: "How Laser Hair Removal Works",
        content: "The science behind laser hair reduction and its effectiveness.",
      },
      {
        title: "Benefits of Laser Hair Removal",
        content: "Smooth skin, no regrowth, and reduced skin irritation.",
      },
      {
        title: "Laser Hair Removal for Different Areas",
        content: "Face, underarms, bikini area, legs, and more.",
      },
      {
        title: "Post-Treatment Care",
        content: "Tips for maintaining smooth, hair-free skin after your treatment.",
      },
      {
        title: "Why Choose Siri Beauty & Wellness for Laser Hair Removal?",
        content: "Expertise and advanced technology.",
      },
    ],
    conclusion:
      "Get permanently smooth skin with laser hair removal at Siri Beauty & Wellness. Book your session today for long-lasting results!",
  },
  {
    id: "body-contouring",
    title: "How to Achieve a Perfect Body with Body Contouring",
    category: "Body",
    date: "April 10, 2025",
    excerpt:
      "Body contouring is a non-invasive method for achieving a well-defined figure. Whether you're dealing with stubborn fat or sagging skin, Siri Beauty & Wellness in Jayanagar offers the best body sculpting treatments.",
    image: "/radio-frequency-fat-reduction.png",
    color: "white",
    layout: "small",
    keywords:
      "Body contouring Bangalore, body sculpting, inch loss treatment, figure correction, fat reduction treatments",
    introduction:
      "Body contouring is a non-invasive method for achieving a well-defined figure. Whether you're dealing with stubborn fat or sagging skin, Siri Beauty & Wellness in Jayanagar offers the best body sculpting treatments.",
    sections: [
      {
        title: "What is Body Contouring?",
        content:
          "A breakdown of body contouring techniques like cryolipolysis, ultrasound cavitation, and radiofrequency.",
      },
      {
        title: "Fat Reduction Technologies",
        content: "How each method works to eliminate fat and tighten skin.",
      },
      {
        title: "Body Sculpting for All Body Types",
        content: "Tailored treatments for different body types and goals.",
      },
      {
        title: "Results and Maintenance",
        content: "How soon you can expect results and how to maintain them.",
      },
      {
        title: "Why Choose Body Contouring at Siri Beauty & Wellness?",
        content: "Expertise and results-driven approach.",
      },
    ],
    conclusion:
      "Achieve your dream body with non-invasive body contouring at Siri Beauty & Wellness. Book your body sculpting consultation today!",
  },
  {
    id: "microblading-eyebrows",
    title: "Microblading: Enhance Your Natural Brows with Expert Services",
    category: "Eyebrows",
    date: "April 5, 2025",
    excerpt:
      "Microblading is a semi-permanent solution to sparse or thin eyebrows. At Siri Beauty & Wellness, we offer professional microblading services in Jayanagar to give you perfectly shaped and naturally-looking brows.",
    image: "/eyebrow-threading-salon.png",
    color: "green",
    layout: "medium",
    keywords:
      "Microblading Bangalore, eyebrow tattooing, best microblading services, semi-permanent brows Jayanagar, eyebrow shaping near me",
    introduction:
      "Microblading is a semi-permanent solution to sparse or thin eyebrows. At Siri Beauty & Wellness, we offer professional microblading services in Jayanagar to give you perfectly shaped and naturally-looking brows.",
    sections: [
      {
        title: "What is Microblading?",
        content: "A detailed explanation of the microblading process and its benefits.",
      },
      {
        title: "Why Choose Microblading?",
        content: "Perfect for those who struggle with thin or patchy brows.",
      },
      {
        title: "How Long Do Microbladed Brows Last?",
        content: "Average longevity of the treatment and aftercare.",
      },
      {
        title: "Microblading vs. Tattooed Eyebrows",
        content: "The differences and why microblading is preferred.",
      },
      {
        title: "Why Choose Siri Beauty & Wellness for Microblading?",
        content: "Our expertise and commitment to quality.",
      },
    ],
    conclusion: "Get the perfect eyebrows with microblading at Siri Beauty & Wellness. Book your appointment today!",
  },
  {
    id: "skin-pigmentation-treatments",
    title: "How to Manage Skin Pigmentation with Advanced Treatments",
    category: "Skin",
    date: "April 1, 2025",
    excerpt:
      "Pigmentation and dark spots can be stubborn, but with advanced skin treatments, you can achieve clear, even-toned skin. Siri Beauty & Wellness offers effective solutions for treating pigmentation.",
    image: "/pigmentation-removal.png",
    color: "blue",
    layout: "small",
    keywords:
      "Skin pigmentation treatment, pigmentation removal Bangalore, dark spot treatments, skin discoloration Jayanagar, skin lightening facials",
    introduction:
      "Pigmentation and dark spots can be stubborn, but with advanced skin treatments, you can achieve clear, even-toned skin. Siri Beauty & Wellness offers effective solutions for treating pigmentation.",
    sections: [
      {
        title: "What Causes Skin Pigmentation?",
        content: "Factors like sun exposure, aging, and acne scars.",
      },
      {
        title: "Effective Treatments for Pigmentation",
        content: "Chemical peels, lasers, and facials.",
      },
      {
        title: "Hydrafacial for Pigmentation",
        content: "How Hydrafacial helps brighten the skin and reduce pigmentation.",
      },
      {
        title: "Tips for Preventing Pigmentation",
        content: "Sun protection and skincare routines.",
      },
      {
        title: "Client Success Stories",
        content: "Real-life examples of clients who have successfully treated their pigmentation.",
      },
    ],
    conclusion:
      "Get clear, even-toned skin with our pigmentation treatments. Book your consultation today at Siri Beauty & Wellness!",
  },
  {
    id: "best-beauty-services",
    title: "Explore the Best Beauty Services at Siri Beauty & Wellness",
    category: "Beauty",
    date: "March 28, 2025",
    excerpt:
      "From facials to waxing and nail extensions, Siri Beauty & Wellness offers a wide range of beauty services in Jayanagar that cater to your every need. Pamper yourself with our luxurious treatments.",
    image: "/makeup-session.png",
    color: "white",
    layout: "small",
    keywords:
      "Beauty services in Jayanagar, facials in Bangalore, nail extensions near me, best beauty services, waxing services Bangalore",
    introduction:
      "From facials to waxing and nail extensions, Siri Beauty & Wellness offers a wide range of beauty services in Jayanagar that cater to your every need. Pamper yourself with our luxurious treatments.",
    sections: [
      {
        title: "Facials for Glowing Skin",
        content: "Including Hydrafacial, gold facials, and anti-aging facials.",
      },
      {
        title: "Waxing & Threading Services",
        content: "Smooth skin with our professional waxing and threading services.",
      },
      {
        title: "Nail Extensions & Manicures",
        content: "Perfect nails with our expert manicure and nail extension services.",
      },
      {
        title: "Hair Services",
        content: "From trims to blowouts, we offer a full range of hair treatments.",
      },
      {
        title: "Massage & Relaxation",
        content: "Back massage, foot massage, and body treatments to relax and rejuvenate.",
      },
    ],
    conclusion:
      "Treat yourself to the best beauty services at Siri Beauty & Wellness. Book your beauty treatment today and indulge in the ultimate pampering experience!",
  },
]

// Additional images for carousel
const additionalImages = [
  "/luxury-salon-interior.png",
  "/facial-treatment-spa.png",
  "/hair-styling-salon.png",
  "/manicure-treatment.png",
  "/massage-therapy.png",
]

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [post, setPost] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [carouselImages, setCarouselImages] = useState<string[]>([])
  const [openFaq, setOpenFaq] = useState<number | null>(0) // Set first FAQ open by default

  useEffect(() => {
    setMounted(true)
    const id = params.id as string
    const foundPost = blogPosts.find((post) => post.id === id)

    if (foundPost) {
      setPost(foundPost)
      // Create carousel images array with the main image first, followed by additional images
      setCarouselImages([foundPost.image, ...additionalImages])
    } else {
      router.push("/blog")
    }
  }, [params.id, router])

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length)
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  if (!mounted || !post) return null

  return (
    <>
      <NavigationBar />
      <main className="pt-16 pb-8 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => router.back()} className="flex items-center gap-1 hover:underline text-sm">
              <ArrowLeft className="h-3 w-3" /> Back to Blog
            </button>
            <Link href="/" className="flex items-center gap-1 hover:underline text-sm">
              <Home className="h-3 w-3" /> Back to Home
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-3">
                <span className="inline-block bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs font-medium mb-1">
                  {post.category}
                </span>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-1">{post.title}</h1>
                <p className="text-gray-500 text-sm">{post.date}</p>
              </div>

              {/* Image Carousel */}
              <div className="relative w-full h-[200px] md:h-[250px] rounded-lg overflow-hidden mb-4 group">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={carouselImages[currentImageIndex] || "/placeholder.svg"}
                      alt={`${post.title} - image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Carousel Controls */}
                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={prevImage}
                    className="bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full shadow-md transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        currentImageIndex === index ? "bg-white w-3" : "bg-white/60"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                <div className="mb-3">
                  <h2 className="text-lg font-bold mb-1">Introduction</h2>
                  <p className="text-gray-700 text-sm leading-snug">{post.introduction}</p>
                </div>

                <div className="mb-3">
                  <h2 className="text-lg font-bold mb-1">Key Sections</h2>
                  {post.sections.map((section: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      className="mb-2"
                    >
                      <h3 className="text-base font-semibold mb-0.5">{section.title}</h3>
                      <p className="text-gray-700 text-sm leading-snug">{section.content}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mb-3">
                  <h2 className="text-lg font-bold mb-1">Conclusion</h2>
                  <p className="text-gray-700 text-sm leading-snug">{post.conclusion}</p>
                </div>

                {/* FAQ Section - Made more prominent */}
                <div className="my-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h2 className="text-xl font-bold mb-3 text-center">
                    Frequently Asked Questions – Siri Beauty and Wellness Center
                  </h2>
                  <div className="space-y-3">
                    {/* FAQ 1 */}
                    <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
                      <button
                        className="flex justify-between items-center w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        onClick={() => toggleFaq(0)}
                        aria-expanded={openFaq === 0}
                        aria-controls="faq-answer-0"
                      >
                        <span className="font-medium text-sm">
                          What is the best weight loss program available in Jayanagar?
                        </span>
                        {openFaq === 0 ? (
                          <Minus className="h-4 w-4 flex-shrink-0 text-gray-500" />
                        ) : (
                          <Plus className="h-4 w-4 flex-shrink-0 text-gray-500" />
                        )}
                      </button>
                      <div
                        id="faq-answer-0"
                        className={`px-4 py-3 text-sm text-gray-700 leading-snug border-t border-gray-100 ${
                          openFaq === 0 ? "block" : "hidden"
                        }`}
                      >
                        At Siri Beauty and Wellness, we offer the best weight loss programs in Jayanagar with customized
                        slimming plans, inch loss treatments, and body contouring tailored to your unique needs.
                      </div>
                    </div>

                    {/* FAQ 2 */}
                    <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
                      <button
                        className="flex justify-between items-center w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        onClick={() => toggleFaq(1)}
                        aria-expanded={openFaq === 1}
                        aria-controls="faq-answer-1"
                      >
                        <span className="font-medium text-sm">
                          Where can I get Hydrafacial treatment near me in Bangalore?
                        </span>
                        {openFaq === 1 ? (
                          <Minus className="h-4 w-4 flex-shrink-0 text-gray-500" />
                        ) : (
                          <Plus className="h-4 w-4 flex-shrink-0 text-gray-500" />
                        )}
                      </button>
                      <div
                        id="faq-answer-1"
                        className={`px-4 py-3 text-sm text-gray-700 leading-snug border-t border-gray-100 ${
                          openFaq === 1 ? "block" : "hidden"
                        }`}
                      >
                        Siri Beauty Center in Jayanagar offers the latest Hydrafacial treatments for deep cleansing,
                        skin rejuvenation, and glowing skin – perfect for anyone searching for "Hydrafacial near me."
                      </div>
                    </div>

                    {/* FAQ 3 */}
                    <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
                      <button
                        className="flex justify-between items-center w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        onClick={() => toggleFaq(2)}
                        aria-expanded={openFaq === 2}
                        aria-controls="faq-answer-2"
                      >
                        <span className="font-medium text-sm">
                          Which center in Bangalore provides advanced hair fall and PRP treatment?
                        </span>
                        {openFaq === 2 ? (
                          <Minus className="h-4 w-4 flex-shrink-0 text-gray-500" />
                        ) : (
                          <Plus className="h-4 w-4 flex-shrink-0 text-gray-500" />
                        )}
                      </button>
                      <div
                        id="faq-answer-2"
                        className={`px-4 py-3 text-sm text-gray-700 leading-snug border-t border-gray-100 ${
                          openFaq === 2 ? "block" : "hidden"
                        }`}
                      >
                        Siri Hair Clinic in Jayanagar specializes in hair fall control and PRP hair regrowth treatment
                        using proven technologies and expert consultation.
                      </div>
                    </div>

                    {/* FAQ 4 */}
                    <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
                      <button
                        className="flex justify-between items-center w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        onClick={() => toggleFaq(3)}
                        aria-expanded={openFaq === 3}
                        aria-controls="faq-answer-3"
                      >
                        <span className="font-medium text-sm">
                          Are there any affordable beauty packages in Jayanagar?
                        </span>
                        {openFaq === 3 ? (
                          <Minus className="h-4 w-4 flex-shrink-0 text-gray-500" />
                        ) : (
                          <Plus className="h-4 w-4 flex-shrink-0 text-gray-500" />
                        )}
                      </button>
                      <div
                        id="faq-answer-3"
                        className={`px-4 py-3 text-sm text-gray-700 leading-snug border-t border-gray-100 ${
                          openFaq === 3 ? "block" : "hidden"
                        }`}
                      >
                        Yes! We have a 5-in-1 beauty combo offer for just ₹999 including facial, waxing, threading,
                        massage, and hair trimming. It's one of the most budget-friendly beauty services in Jayanagar.
                      </div>
                    </div>

                    {/* FAQ 5 */}
                    <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
                      <button
                        className="flex justify-between items-center w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        onClick={() => toggleFaq(4)}
                        aria-expanded={openFaq === 4}
                        aria-controls="faq-answer-4"
                      >
                        <span className="font-medium text-sm">
                          Do you offer permanent laser hair removal in Bangalore?
                        </span>
                        {openFaq === 4 ? (
                          <Minus className="h-4 w-4 flex-shrink-0 text-gray-500" />
                        ) : (
                          <Plus className="h-4 w-4 flex-shrink-0 text-gray-500" />
                        )}
                      </button>
                      <div
                        id="faq-answer-4"
                        className={`px-4 py-3 text-sm text-gray-700 leading-snug border-t border-gray-100 ${
                          openFaq === 4 ? "block" : "hidden"
                        }`}
                      >
                        Siri Beauty and Wellness provides safe and effective permanent laser hair reduction treatments
                        in Bangalore using advanced, skin-friendly technologies.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-base font-semibold mb-1">Keywords</h3>
                  <p className="text-gray-600 text-xs italic leading-tight">{post.keywords}</p>
                </div>

                <div className="mt-4">
                  <Link
                    href="/#contact"
                    className="inline-block bg-gradient-to-r from-[#FF007F] to-[#FF5A36] text-white px-4 py-2 text-sm rounded-full hover:shadow-lg transition-all duration-300"
                  >
                    Book a Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}
