/**
 * Studio segment layout — minimal. The root layout already provides
 * <html>/<body>; Chrome.tsx detects the /studio path and skips Navbar +
 * Footer. All this layout does is opt the segment out of static rendering
 * (the Studio is a heavy client-only application) and tweak the viewport
 * so the Studio's mobile UI works.
 */

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Sanity Studio is a SPA — re-uses meta/viewport from next-sanity helpers.
// We re-export those so Next can apply them.
export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
