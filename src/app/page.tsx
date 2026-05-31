import HeroTablet from "@/components/home/HeroTablet";
import StudioLedger from "@/components/home/StudioLedger";
import Workbench from "@/components/home/Workbench";
import YearInClay from "@/components/home/YearInClay";
import CustomOrderPanel from "@/components/home/CustomOrderPanel";
import StoriesGrid from "@/components/home/StoriesGrid";
import {
  getFeaturedArtworks,
  getRecentBlogPosts,
  isSanityConfigured,
} from "@/lib/sanity";
import type { ArtworkCardData, BlogPostCard } from "@/lib/sanity/types";

// ─── Fallback data ──────────────────────────────────────────
// Used until Sanity is populated. Stock images stay only as long as Soham
// hasn't dropped real photos in /public/photos/pieces/. Titles & categories
// reflect Suhrita's actual practice (bottle art + portraits + clay leading).

const FALLBACK_ARTWORKS: ArtworkCardData[] = [
  {
    title: "A clay figurine",
    slug: "clay-figurine",
    image: "/clay.jpg",
    isOneOfAKind: true,
    category: "Clay figurine",
  },
  {
    title: "A portrait",
    slug: "portrait",
    image: "/portrait.jpg",
    isOneOfAKind: true,
    category: "Portrait",
  },
  {
    title: "Bottle, repainted",
    slug: "bottle-repainted",
    image: "/bottle.jpg",
    isOneOfAKind: true,
    category: "Bottle art",
  },
  {
    title: "Another favourite",
    slug: "favourite-piece",
    image: "/extra.jpg",
    isOneOfAKind: true,
    category: "Clay figurine",
  },
  {
    title: "Texture, in layers",
    slug: "texture-painting",
    image: "/texture.jpg",
    isOneOfAKind: true,
    category: "Texture painting",
  },
  {
    title: "A batua, painted on cloth",
    slug: "batua-mothers-day",
    image: "/batua.jpg",
    isOneOfAKind: true,
    category: "Cloth & decorative",
  },
];

const FALLBACK_POSTS: BlogPostCard[] = [
  {
    title: "Before I lose my sight",
    slug: "before-i-lose-my-sight",
    excerpt:
      "In early 2025 I had a retinal scare and laser surgery. The fear of losing the eyes to ever make anything became the reason I finally started, every day, that February.",
    date: "Mar 02, 2025",
    coverImage: "/mood-hands.jpg",
  },
  {
    title: "A Saraswati, didn't go well",
    slug: "saraswati-didnt-go-well",
    excerpt:
      "My first ever clay piece, a tiny Saraswati idol. It did not go very well. I was happy anyway. Notes on the earbud-stick skeleton, the safety-pin tool, and what I&rsquo;d redo today.",
    date: "Apr 18, 2025",
    coverImage: "/mood-detail.jpg",
  },
  {
    title: "Hobby into habit",
    slug: "hobby-into-habit",
    excerpt:
      "Fifteen months in, 70+ pieces later. The TV is always on. My family encourages. The hobby has become a habit. A note on what changes when you stop missing days.",
    date: "May 10, 2026",
    coverImage: "/mood-collection.jpg",
  },
];

// ─── Page ───────────────────────────────────────────────────

export default async function HomePage() {
  const useSanity = isSanityConfigured();

  const featuredArtworks = useSanity
    ? await getFeaturedArtworks()
    : FALLBACK_ARTWORKS;

  const recentPosts = useSanity ? await getRecentBlogPosts(3) : FALLBACK_POSTS;

  // Real values — confirmed with Suhrita on May 10, 2026
  const totalPieces = 70;
  const totalPosts = Math.max(recentPosts.length, 12);

  return (
    <>
      {/* Hero — clay tablet (left) + studio ledger (right) */}
      <section className="hero">
        <div className="hero-grid">
          <HeroTablet />
          <StudioLedger />
        </div>
      </section>

      {/* The Workbench — featured pieces, scattered */}
      <Workbench
        artworks={featuredArtworks.length ? featuredArtworks : FALLBACK_ARTWORKS}
        totalCount={totalPieces}
      />

      {/* Year in Clay — evolution timeline */}
      <YearInClay />

      {/* Custom commission split-panel */}
      <CustomOrderPanel />

      {/* Stories — journal cards */}
      <StoriesGrid
        posts={recentPosts.length ? recentPosts : FALLBACK_POSTS}
        totalCount={totalPosts}
      />
    </>
  );
}
