import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { Poppins, Urbanist } from "next/font/google";
import { siteConfig } from "@/data/data";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-urbanist",
  display: "swap",
});

const BASE_URL = siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${siteConfig.title} | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js 16",
    "React 19",
    "Tailwind CSS",
    "Shadcn UI",
    "Redux Toolkit",
    "Axios",
    "Neon Postgres",
    "n8n",
    "TypeScript",
    "Boilerplate",
    "Starter Template",
  ],
  authors: [{ name: siteConfig.author, url: BASE_URL }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: BASE_URL,
    siteName: siteConfig.name,
    images: [
      {
        url: "/media/placeholder.webp",
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/media/placeholder.webp"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/media/placeholder.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${poppins.variable} ${urbanist.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
