import ShopPageClient from "@/components/shop/ShopPageClient";
import {
  getShopArtworks,
  getCategories,
  isSanityConfigured,
} from "@/lib/sanity";

// ─── Fallback data ─────────────────────────────────────────
// Showcase-first: prices are deliberately omitted so the "Pay as you wish"
// state shows on every card. Once Sanity is wired, Suhrita can attach a
// suggested price per piece if she wants — buyers can still pay differently.

const fallbackShopArtworks = [
  {
    title: "A clay figurine",
    slug: "clay-figurine",
    image: "/clay.jpg",
    isOneOfAKind: true,
    isForSale: true,
    category: "Clay figurine",
  },
  {
    title: "Bottle, repainted",
    slug: "bottle-repainted",
    image: "/bottle.jpg",
    isOneOfAKind: true,
    isForSale: true,
    category: "Bottle art",
  },
  {
    title: "A portrait",
    slug: "portrait",
    image: "/portrait.jpg",
    isOneOfAKind: true,
    isForSale: true,
    category: "Portrait",
  },
  {
    title: "Another favourite",
    slug: "favourite-piece",
    image: "/extra.jpg",
    isOneOfAKind: true,
    isForSale: true,
    category: "Clay figurine",
  },
  {
    title: "Texture, in layers",
    slug: "texture-painting",
    image: "/texture.jpg",
    isOneOfAKind: true,
    isForSale: true,
    category: "Texture painting",
  },
  {
    title: "A batua, painted on cloth",
    slug: "batua-mothers-day",
    image: "/batua.jpg",
    isOneOfAKind: true,
    isForSale: true,
    category: "Cloth & decorative",
  },
];

const fallbackCategories = [
  "Bottle art",
  "Portrait",
  "Clay figurine",
  "Cloth & decorative",
];

// ─── Page ──────────────────────────────────────────────────

export default async function ShopPage() {
  const useSanity = isSanityConfigured();
  const artworks = useSanity ? await getShopArtworks() : fallbackShopArtworks;
  const categories = useSanity ? await getCategories() : fallbackCategories;

  return (
    <section className="section">
      <div className="section-head">
        <h2>
          The pieces, on
          <br />
          <em>display.</em>
        </h2>
        <div className="meta">
          {artworks.length} pieces showing
          <br />
          <strong>Each one of a kind</strong>
          <br />
          Pay as you wish
        </div>
      </div>

      {/* Showcase note — confirmed framing with Soham */}
      <div
        style={{
          background: "var(--cream-100)",
          border: "1px solid rgba(58,46,36,0.12)",
          borderRadius: 14,
          padding: "24px 28px",
          marginBottom: 40,
          maxWidth: 880,
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--terracotta-500)",
            marginBottom: 10,
          }}
        >
          A note on this page
        </div>
        <p
          style={{
            fontFamily: "var(--serif)",
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--charcoal-700)",
            margin: 0,
          }}
        >
          This site is here to <strong>show</strong> the work, not to sell it.
          If a piece moves you and you&apos;d like to take it home, the price
          is whatever feels right to you. Pay as you wish. Reach out via the{" "}
          <a
            href="/custom-order"
            style={{ color: "var(--terracotta-500)", textDecoration: "underline" }}
          >
            commission form
          </a>{" "}
          or directly at{" "}
          <a
            href="mailto:drsuhritaderoy@yahoo.com"
            style={{ color: "var(--terracotta-500)", textDecoration: "underline" }}
          >
            drsuhritaderoy@yahoo.com
          </a>
          .
        </p>
      </div>

      {/* Shipping & payment notice */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 18,
          marginBottom: 40,
          padding: "20px 24px",
          background: "var(--cream-100)",
          border: "1px solid rgba(58,46,36,0.12)",
          borderRadius: 14,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--terracotta-500)",
              marginBottom: 8,
            }}
          >
            Shipping
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 15,
              lineHeight: 1.5,
              color: "var(--charcoal-700)",
            }}
          >
            <strong>Inside Kolkata only</strong> for now. Outside the city,
            message me on the commission form and we&apos;ll figure it out.
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--terracotta-500)",
              marginBottom: 8,
            }}
          >
            Payment
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 15,
              lineHeight: 1.5,
              color: "var(--charcoal-700)",
            }}
          >
            Razorpay (cards / netbanking), UPI, or direct bank transfer.
            Whatever&apos;s easiest.
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--terracotta-500)",
              marginBottom: 8,
            }}
          >
            One of a kind
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 15,
              lineHeight: 1.5,
              color: "var(--charcoal-700)",
            }}
          >
            No two pieces are identical. Once a piece is gone, it&apos;s gone.
            But I can usually make something in the same spirit.
          </div>
        </div>
      </div>

      <ShopPageClient artworks={artworks} categories={categories} />
    </section>
  );
}
