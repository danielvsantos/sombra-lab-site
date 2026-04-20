"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import LayoutWrapper from "./LayoutWrapper";
import CookieBanner from "./CookieBanner";

/**
 * Wraps page content with Navbar, Footer, and CookieBanner.
 * Separate client component so the root layout can stay a server component.
 */
export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <LayoutWrapper>{children}</LayoutWrapper>
      <Footer />
      <CookieBanner />
    </>
  );
}
