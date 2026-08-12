import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteChrome from "@/components/layout/SiteChrome";
import "./globals.css";

const helveticaNeue = localFont({
  src: [
    {
      path: "../fonts/Helvetica-Neue-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Helvetica-Neue.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Helvetica-Neue-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Helvetica-Neue-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Helvetica-Neue-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Helvetica-Neue-Bold-Italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-helvetica-neue",
  display: "swap",
});

const ibmPlexMono = localFont({
  src: [
    {
      path: "../fonts/IBMPlexMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/IBMPlexMono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sombralab.com"),
  title: "Sombra Lab | Creative Production Agency",
  description:
    "High-end creative and production lab in Barcelona. Audiovisual production, fashion styling, and social media management for upscale brands.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Sombra Lab | Creative Production Agency",
    description:
      "High-end creative and production lab in Barcelona. Audiovisual production, fashion styling, and social media management for upscale brands.",
    siteName: "Sombra Lab",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sombra Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sombra Lab | Creative Production Agency",
    description:
      "High-end creative and production lab in Barcelona. Audiovisual production, fashion styling, and social media management for upscale brands.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${helveticaNeue.variable} ${ibmPlexMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
