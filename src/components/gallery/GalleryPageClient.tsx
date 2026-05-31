"use client";

import { useState } from "react";
import CategoryFilter from "@/components/gallery/CategoryFilter";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import type { ArtworkCardProps } from "@/components/gallery/ArtworkCard";

interface GalleryPageClientProps {
  artworks: ArtworkCardProps[];
  categories: string[];
}

export default function GalleryPageClient({
  artworks,
  categories,
}: GalleryPageClientProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? artworks
      : artworks.filter((a) => a.category === activeCategory);

  return (
    <>
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />
      <GalleryGrid artworks={filtered} />
    </>
  );
}
