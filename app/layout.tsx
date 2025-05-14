import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Hair Fall & PRP Hair Treatment in Jayanagar | Dandruff, Hair Regrowth Bangalore",
  description:
    "Say goodbye to hair fall and dandruff with PRP and scalp rejuvenation therapies at Siri Hair Clinic in Jayanagar, Bangalore.",
  generator: "v0.dev",
  keywords: [
    "beauty salon",
    "weight loss",
    "hydrafacial",
    "skin brightening",
    "PRP treatment",
    "Jayanagar",
    "Bangalore",
    "beauty center",
    "wellness center",
    "skin treatments",
    "acne treatment",
    "pigmentation removal",
    "anti-aging",
    "hair fall",
    "dandruff",
    "hair regrowth",
    "PRP hair treatment",
    "scalp rejuvenation",
    "hair smoothening",
    "keratin treatment",
  ],
  openGraph: {
    title: "Hair Fall & PRP Hair Treatment in Jayanagar | Siri Beauty and Wellness",
    description:
      "Say goodbye to hair fall and dandruff with PRP and scalp rejuvenation therapies at Siri Hair Clinic in Jayanagar, Bangalore.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  )
}
