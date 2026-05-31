import GalleryPageClient from "@/components/gallery/GalleryPageClient";
import {
  getAllArtworks,
  getCategories,
  isSanityConfigured,
} from "@/lib/sanity";

// ─── Fallback data ─────────────────────────────────────────
// Categories track Suhrita's actual mediums: bottle art + portrait + clay
// lead. Prices intentionally absent — the page is a showcase, not a price
// list. "Pay as you wish" surfaces on each card via ArtworkCard.

const fallbackArtworks = [
  {
    title: "A clay figurine",
    slug: "clay-figurine",
    image: "/clay.jpg",
    isOneOfAKind: true,
    category: "Clay figurine",
  },
  {
    title: "Bottle, repainted",
    slug: "bottle-repainted",
    image: "/bottle.jpg",
    isOneOfAKind: true,
    category: "Bottle art",
  },
  {
    title: "A portrait",
    slug: "portrait",
    image: "/portrait.jpg",
    isOneOfAKind: true,
    category: "Portrait",
  },
  {
    title: "Texture, in layers",
    slug: "texture-painting",
    image: "/texture.jpg",
    isOneOfAKind: true,
    category: "Texture painting",
  },
  {
    title: "Another favourite",
    slug: "favourite-piece",
    image: "/extra.jpg",
    isOneOfAKind: true,
    category: "Clay figurine",
  },
  {
    title: "Early piece",
    slug: "early-piece-one",
    image: "/early-1.jpg",
    isOneOfAKind: true,
    category: "Bottle art",
  },
  {
    title: "A batua, painted on cloth",
    slug: "batua-mothers-day",
    image: "/batua.jpg",
    isOneOfAKind: true,
    category: "Cloth & decorative",
  },
  {
    title: "From the middle of the year",
    slug: "mid-year-piece",
    image: "/mid-1.jpg",
    isOneOfAKind: true,
    category: "Portrait",
  },
];

const fallbackCategories = [
  "Bottle art",
  "Portrait",
  "Clay figurine",
  "Texture painting",
  "Cloth & decorative",
];

// ─── Page ──────────────────────────────────────────────────

export default async function GalleryPage() {
  const useSanity = isSanityConfigured();
  const artworks = useSanity ? await getAllArtworks() : fallbackArtworks;
  const categories = useSanity ? await getCategories() : fallbackCategories;

  return (
    <section className="section">
      <div className="section-head">
        <h2>
          Every piece,
          <br />
          <em>so far.</em>
        </h2>
        <div className="meta">
          {artworks.length} pieces showing · 70+ total
          <br />
          <strong>Feb 2025 → today</strong>
          <br />
          Pay as you wish
        </div>
      </div>

      <GalleryPageClient artworks={artworks} categories={categories} />
    </section>
  );
}
