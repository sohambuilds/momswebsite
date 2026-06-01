import Link from "next/link";
import ProductImages from "@/components/shop/ProductImages";
import AddToCartButton from "@/components/shop/AddToCartButton";
import Badge from "@/components/ui/Badge";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  getArtworkBySlug,
  getRelatedArtworks,
  isSanityConfigured,
} from "@/lib/sanity";
import { urlFor } from "@/lib/sanity/image";

// ─── Fallback data ───────────────────────────────────────────

const mockProduct = {
  _id: "saraswati-first-001",
  title: "Saraswati, the first one",
  slug: "saraswati-first",
  images: [] as never[],
  price: 0, // pay as you wish — see UI below
  description:
    "My first ever clay piece. A small Saraswati idol, made in early 2025. The skeleton was an earbud stick. The detail tool was a safety pin. It did not go very well, technically. But it taught me everything that came after. Painted with acrylic, finished with a coat of varnish.",
  dimensions: "Approx. 12cm tall",
  materials: "Mould-it clay, acrylic, varnish, earbud-stick skeleton, no moulds",
  isOneOfAKind: true,
  isSold: false,
  isForSale: true,
  isFeatured: false,
  category: "Clay figurine",
  categorySlug: "clay-figurine",
};

const mockImages = ["/clay.jpg", "/extra.jpg", "/recent-1.jpg"];

const fallbackRelated = [
  {
    title: "A portrait",
    slug: "portrait",
    image: "/portrait.jpg",
    isOneOfAKind: true,
    category: "Portrait",
  },
  {
    title: "Another favourite",
    slug: "favourite-piece",
    image: "/extra.jpg",
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
];

// ─── Page ────────────────────────────────────────────────────

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const useSanity = isSanityConfigured();

  // Sanity gets first crack. If it doesn't have the slug (during setup, or
  // for legacy fallback URLs), serve the local placeholder so the page never
  // 404s on a link from the rest of the site.
  const sanityProduct = useSanity ? await getArtworkBySlug(slug) : null;
  const product = sanityProduct ?? mockProduct;

  // Resolve images to URLs
  const imageUrls = useSanity && product.images?.length
    ? product.images.map((img) => urlFor(img).width(800).height(1000).url())
    : mockImages;

  // Related: use Sanity's recommendations if it has them, else fall back.
  const sanityRelated = useSanity
    ? await getRelatedArtworks(slug, product.category)
    : [];
  const relatedArtworks = sanityRelated.length ? sanityRelated : fallbackRelated;

  return (
    <>
      <div className="section-padding section-y">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm font-sans text-charcoal-400">
          <Link href="/shop" className="hover:text-terracotta-500 transition-colors">
            Shop
          </Link>
          <span className="mx-2">→</span>
          <span className="text-charcoal-600">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Images */}
          <ProductImages images={imageUrls} title={product.title} />

          {/* Details */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
              {product.isOneOfAKind && (
                <Badge variant="oneOfAKind">One of a Kind</Badge>
              )}
              {product.isSold && <Badge variant="sold">Sold</Badge>}
            </div>

            <h1 className="heading-lg text-charcoal-800 mb-2">
              {product.title}
            </h1>

            <p className="text-sm text-charcoal-400 mb-6">{product.category}</p>

            {!product.isSold && (
              <div className="mb-8">
                {product.price > 0 ? (
                  <>
                    <p className="text-3xl font-serif text-charcoal-800">
                      ₹{product.price.toLocaleString("en-IN")}
                      <span className="text-base text-charcoal-400 ml-2">
                        suggested
                      </span>
                    </p>
                    <p className="text-sm text-charcoal-500 font-sans mt-1">
                      Pay as you wish. What feels right is right.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-3xl font-serif text-charcoal-800">
                      Pay as you wish
                    </p>
                    <p className="text-sm text-charcoal-500 font-sans mt-1">
                      No fixed price. What feels right is right.
                    </p>
                  </>
                )}
              </div>
            )}

            {product.description && (
              <p className="body-md mb-8 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Specs */}
            {(product.dimensions || product.materials) && (
              <div className="grid grid-cols-2 gap-4 mb-10 text-sm">
                {product.dimensions && (
                  <div>
                    <p className="text-charcoal-400 mb-1">Dimensions</p>
                    <p className="text-charcoal-700 font-medium">{product.dimensions}</p>
                  </div>
                )}
                {product.materials && (
                  <div>
                    <p className="text-charcoal-400 mb-1">Materials</p>
                    <p className="text-charcoal-700 font-medium">{product.materials}</p>
                  </div>
                )}
              </div>
            )}

            <AddToCartButton
              item={{
                id: product._id,
                title: product.title,
                price: product.price,
                image: imageUrls[0],
                slug: product.slug,
              }}
              isSold={product.isSold}
            />

            <p className="text-xs text-charcoal-400 mt-4 text-center">
              Inside Kolkata only · Razorpay · UPI · bank transfer
            </p>
          </div>
        </div>
      </div>

      {/* Related Works */}
      {relatedArtworks.length > 0 && (
        <section className="bg-clay-50">
          <div className="section-padding section-y">
            <SectionHeading
              eyebrow="You May Also Like"
              title="Related Works"
            />
            <GalleryGrid artworks={relatedArtworks} showPrice />
          </div>
        </section>
      )}
    </>
  );
}
