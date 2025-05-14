"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles, Home } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import NavigationBar from "@/components/navigation-bar"
import { BlogCard } from "@/components/blog-card"
import FloatingElements from "@/components/floating-elements"
import CursorEffects from "@/components/cursor-effects"

// Blog data with images
const blogPosts = [
  {
    id: "weight-loss-programs",
    title: "The Ultimate Guide to Weight Loss Programs",
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
    title: "Combatting Hair Fall with PRP Therapy",
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
    title: "Permanent Hair Removal Solutions with Laser",
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
    title: "Microblading: Enhance Your Natural Brows",
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

export default function BlogPage() {
  // Refs for scroll animations
  const headerRef = useRef<HTMLDivElement>(null)
  const blogGridRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)

  // InView states
  const headerInView = useInView(headerRef, { once: false, amount: 0.3 })
  const blogGridInView = useInView(blogGridRef, { once: false, amount: 0.1 })
  const categoriesInView = useInView(categoriesRef, { once: false, amount: 0.3 })

  // Parallax effects
  const { scrollYProgress } = useScroll()
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  return (
    <>
      <NavigationBar />
      <main className="relative overflow-hidden pt-24 pb-16 min-h-screen">
        {typeof window !== "undefined" && <FloatingElements />}
        {typeof window !== "undefined" && <CursorEffects />}

        {/* Background decorative elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#FF007F]/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-[#FFD500]/10 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-[#00E5CF]/10 blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 4 }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header Section with Back to Home button */}
          <motion.div
            ref={headerRef}
            className="flex justify-between items-center mb-10"
            style={{ y: headerY, opacity: headerOpacity }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-black"
              initial={{ opacity: 0, x: -50 }}
              animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              BLOG
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <Link
                href="/"
                className="bg-gray-100 hover:bg-gray-200 text-black px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:shadow-md group"
              >
                <Home className="h-4 w-4" /> Back to Home
              </Link>
            </motion.div>
          </motion.div>

          {/* Blog Grid */}
          <motion.div
            ref={blogGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={blogGridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            {blogPosts.slice(0, 6).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={blogGridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <BlogCard
                  id={post.id}
                  title={post.title}
                  category={post.category}
                  date={post.date}
                  excerpt={post.excerpt}
                  image={post.image}
                  color={post.color as any}
                  layout="small"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Categories Section */}
          <motion.div
            ref={categoriesRef}
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {["Facial", "Skin", "Hair", "Body", "Weight Loss", "Anti-Aging", "Beauty", "Hair Removal", "Eyebrows"].map(
              (category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  whileHover={{ y: -5, scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <Link
                    href={`/blog?category=${category.replace(" ", "+")}`}
                    className="bg-[#F8F3C7] hover:bg-[#F5EEA3] text-black px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center group"
                  >
                    {category}
                    <motion.span
                      className="ml-1 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1, rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Sparkles className="h-3 w-3" />
                    </motion.span>
                  </Link>
                </motion.div>
              ),
            )}
            <motion.div
              className="ml-auto"
              initial={{ opacity: 0, x: 20 }}
              animate={categoriesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <Link
                href="/blog/categories"
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-all duration-300 hover:shadow-md group"
              >
                View All Categories{" "}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
