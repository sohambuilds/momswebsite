"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Conditionally wraps the page in Clay Corner's public chrome
 * (Navbar + Footer). On any route under /studio we render bare children
 * so Sanity Studio can own the full viewport — no double headers, no
 * cream-and-clay footer cluttering the admin UI.
 */
export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio") ?? false;

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main id="app" className="flex-1 relative z-[2]">
        {children}
      </main>
      <Footer />
    </>
  );
}
