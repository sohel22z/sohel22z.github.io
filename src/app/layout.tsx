import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile, siteMetadata } from "./data";

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

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  alternates: {
    canonical: profile.siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [
      {
        url: siteMetadata.ogImage,
        width: 460,
        height: 460,
        alt: `${profile.name} - ${profile.title}`,
      },
    ],
    url: profile.siteUrl,
    siteName: `${profile.name} Portfolio`,
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
    creator: `@${profile.github}`,
    site: `@${profile.github}`,
  },
  verification: {
    google: ["googlee35592c95a484647", "nuvLQ2uuqgBLFfdE4zlP_wBM-FWEm4JuzciugG7jryA"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${profile.siteUrl}#person`,
                  "name": profile.name,
                  "url": profile.siteUrl,
                  "image": profile.avatarUrl,
                  "sameAs": [
                    profile.githubUrl,
                    profile.linkedinUrl,
                  ],
                  "jobTitle": siteMetadata.schema.jobTitle,
                  "worksFor": {
                    "@type": "Organization",
                    "name": siteMetadata.schema.worksFor
                  },
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "IN"
                  },
                  "knowsLanguage": ["English", "Hindi"],
                  "description": siteMetadata.schema.description,
                  "knowsAbout": siteMetadata.schema.knowsAbout,
                },
                {
                  "@type": "WebSite",
                  "@id": `${profile.siteUrl}#website`,
                  "url": profile.siteUrl,
                  "name": `${profile.name} - ${profile.title} Portfolio`,
                  "publisher": {
                    "@id": `${profile.siteUrl}#person`
                  }
                },
                {
                  "@type": "ProfilePage",
                  "@id": `${profile.siteUrl}#profile`,
                  "url": profile.siteUrl,
                  "name": `${profile.name} Portfolio`,
                  "mainEntity": {
                    "@id": `${profile.siteUrl}#person`
                  },
                  "about": {
                    "@id": `${profile.siteUrl}#person`
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
