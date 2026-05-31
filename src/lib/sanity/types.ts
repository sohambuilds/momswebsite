// ─── Sanity Document Types ─────────────────────────────────

import type { PortableTextBlock } from "@portabletext/react";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: string; // resolved via GROQ projection
}

export interface Artwork {
  _id: string;
  title: string;
  slug: string;
  images: SanityImage[];
  price: number;
  description?: string;
  dimensions?: string;
  materials?: string;
  category: string; // resolved to category title via GROQ
  categorySlug: string;
  isOneOfAKind: boolean;
  isSold: boolean;
  isForSale: boolean;
  isFeatured: boolean;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: PortableTextBlock[];
  coverImage: SanityImage;
  publishedAt: string;
}

export interface CustomOrder {
  _type: "customOrder";
  name: string;
  email: string;
  description: string;
  sizePreference?: string;
  budgetRange?: string;
  referenceInfo?: string;
  howDidYouHear?: string;
  submittedAt: string;
  status: "new" | "reviewed" | "accepted" | "completed" | "declined";
}

// ─── Simplified types used by UI components ────────────────
// These match the props that ArtworkCard / GalleryGrid already accept

export interface ArtworkCardData {
  title: string;
  slug: string;
  image: string; // resolved URL
  price?: number;
  isSold?: boolean;
  isOneOfAKind?: boolean;
  isForSale?: boolean;
  category?: string;
}

export interface BlogPostCard {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  coverImage: string; // resolved URL
}
