import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";

export interface ArtworkCardProps {
  title: string;
  slug: string;
  image: string;
  price?: number;
  isSold?: boolean;
  isOneOfAKind?: boolean;
  isForSale?: boolean;
  category?: string;
  showPrice?: boolean;
}

export default function ArtworkCard({
  title,
  slug,
  image,
  price,
  isSold,
  isOneOfAKind,
  category,
  showPrice = false,
}: ArtworkCardProps) {
  return (
    <Link href={`/shop/${slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-clay-100">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isSold && <Badge variant="sold">Sold</Badge>}
          {isOneOfAKind && !isSold && (
            <Badge variant="oneOfAKind">One of a Kind</Badge>
          )}
        </div>

        {/* Category label */}
        {category && (
          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs text-white/90 font-sans tracking-wide">
              {category}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="font-serif text-lg text-charcoal-800 group-hover:text-terracotta-500 transition-colors leading-snug">
          {title}
        </h3>
        {showPrice && (
          isSold ? (
            <p className="font-sans text-sm text-charcoal-300">Sold</p>
          ) : price != null ? (
            // Suggested price — buyer can offer differently; pay-as-you-wish.
            <p className="font-sans text-sm text-charcoal-400">
              Suggested ₹{price.toLocaleString("en-IN")}
              <span className="text-charcoal-300"> · pay as you wish</span>
            </p>
          ) : (
            <p className="font-sans text-sm text-charcoal-400">
              Pay as you wish
            </p>
          )
        )}
      </div>
    </Link>
  );
}
