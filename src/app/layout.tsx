import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Frontend Developer & React Architect | Sohel Ansari",
  description:
    "Frontend Architect specializing in high-performance React & Next.js systems. 3+ years experience delivering conversion-optimized web applications.",
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "any" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "Frontend Developer & React Architect | Sohel Ansari",
    description:
      "Frontend Architect specializing in high-performance React & Next.js systems. 3+ years experience delivering conversion-optimized web applications.",
    images: [{ url: "https://avatars.githubusercontent.com/sohel22z", width: 460, height: 460, alt: "Sohel Ansari" }],
    url: "https://sohel22z.github.io/",
    siteName: "Sohel Ansari Portfolio",
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frontend Developer & React Architect | Sohel Ansari",
    description:
      "Frontend Architect specializing in high-performance React & Next.js systems. 3+ years experience delivering conversion-optimized web applications.",
    images: ["https://avatars.githubusercontent.com/sohel22z"],
    creator: "@sohel22z",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="canonical" href="https://sohel22z.github.io/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://sohel22z.github.io/#person",
                  "name": "Sohel Ansari",
                  "url": "https://sohel22z.github.io/",
                  "image": "https://avatars.githubusercontent.com/sohel22z",
                  "sameAs": [
                    "https://github.com/sohel22z",
                    "https://linkedin.com/in/sohelansarii"
                  ],
                  "jobTitle": "React Developer & Frontend Architect",
                  "worksFor": {
                    "@type": "Organization",
                    "name": "Impero IT Services Pvt. Ltd."
                  },
                  "description": "Frontend Architect specializing in high-performance React & Next.js systems with over 3 years of industry experience.",
                  "knowsAbout": [
                    "JavaScript",
                    "React",
                    "TypeScript",
                    "Tailwind CSS",
                    "Redux",
                    "Next.js",
                    "SEO",
                    "Web Performance",
                    "Core Web Vitals",
                    "AI Engineering"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://sohel22z.github.io/#website",
                  "url": "https://sohel22z.github.io/",
                  "name": "Sohel Ansari - Frontend Developer Portfolio",
                  "publisher": {
                    "@id": "https://sohel22z.github.io/#person"
                  }
                },
                {
                  "@type": "ProfilePage",
                  "@id": "https://sohel22z.github.io/#profile",
                  "url": "https://sohel22z.github.io/",
                  "name": "Sohel Ansari Portfolio & Developer Specs",
                  "about": {
                    "@id": "https://sohel22z.github.io/#person"
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-accent focus:text-black focus:px-4 focus:py-2 focus:border-2 focus:border-black font-mono text-xs uppercase font-bold"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
