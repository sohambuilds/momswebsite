import ArtworkCard, { ArtworkCardProps } from "./ArtworkCard";

interface GalleryGridProps {
  artworks: ArtworkCardProps[];
  showPrice?: boolean;
}

export default function GalleryGrid({ artworks, showPrice = false }: GalleryGridProps) {
  if (artworks.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="body-lg text-charcoal-300">No artworks to display yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.slug} {...artwork} showPrice={showPrice} />
      ))}
    </div>
  );
}
