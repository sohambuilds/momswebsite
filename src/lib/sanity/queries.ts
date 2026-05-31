import { client, isSanityConfigured } from "./client";
import { urlFor } from "./image";
import type {
  Artwork,
  BlogPost,
  ArtworkCardData,
  BlogPostCard,
} from "./types";

// ──────────────────────────────────────────
// GROQ Queries
// ──────────────────────────────────────────

const artworkFields = `
  _id,
  title,
  "slug": slug.current,
  images,
  price,
  description,
  dimensions,
  materials,
  "category": category->title,
  "categorySlug": category->slug.current,
  isOneOfAKind,
  isSold,
  isForSale,
  isFeatured
`;

const blogPostFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  coverImage,
  publishedAt
`;

// ──────────────────────────────────────────
// Artwork Queries
// ──────────────────────────────────────────

export async function getAllArtworks(): Promise<ArtworkCardData[]> {
  if (!isSanityConfigured()) return [];

  const artworks: Artwork[] = await client.fetch(
    `*[_type == "artwork"] | order(_createdAt desc) { ${artworkFields} }`
  );

  return artworks.map(toArtworkCard);
}

export async function getFeaturedArtworks(): Promise<ArtworkCardData[]> {
  if (!isSanityConfigured()) return [];

  const artworks: Artwork[] = await client.fetch(
    `*[_type == "artwork" && isFeatured == true] | order(_createdAt desc)[0...6] { ${artworkFields} }`
  );

  return artworks.map(toArtworkCard);
}

export async function getShopArtworks(): Promise<ArtworkCardData[]> {
  if (!isSanityConfigured()) return [];

  const artworks: Artwork[] = await client.fetch(
    `*[_type == "artwork" && isForSale == true && isSold != true] | order(_createdAt desc) { ${artworkFields} }`
  );

  return artworks.map(toArtworkCard);
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  if (!isSanityConfigured()) return null;

  return client.fetch(
    `*[_type == "artwork" && slug.current == $slug][0] { ${artworkFields} }`,
    { slug }
  );
}

export async function getRelatedArtworks(
  currentSlug: string,
  category: string,
  limit = 3
): Promise<ArtworkCardData[]> {
  if (!isSanityConfigured()) return [];

  const artworks: Artwork[] = await client.fetch(
    `*[_type == "artwork" && slug.current != $currentSlug && category->title == $category] | order(_createdAt desc)[0...$limit] { ${artworkFields} }`,
    { currentSlug, category, limit }
  );

  return artworks.map(toArtworkCard);
}

// ──────────────────────────────────────────
// Category Queries
// ──────────────────────────────────────────

export async function getCategories(): Promise<string[]> {
  if (!isSanityConfigured()) return [];

  return client.fetch(
    `*[_type == "category"] | order(title asc) { "title": title }.title`
  );
}

// ──────────────────────────────────────────
// Blog Queries
// ──────────────────────────────────────────

export async function getAllBlogPosts(): Promise<BlogPostCard[]> {
  if (!isSanityConfigured()) return [];

  const posts: BlogPost[] = await client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) { ${blogPostFields} }`
  );

  return posts.map(toBlogPostCard);
}

export async function getRecentBlogPosts(
  limit = 2
): Promise<BlogPostCard[]> {
  if (!isSanityConfigured()) return [];

  const posts: BlogPost[] = await client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc)[0...$limit] { ${blogPostFields} }`,
    { limit }
  );

  return posts.map(toBlogPostCard);
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  if (!isSanityConfigured()) return null;

  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] { ${blogPostFields} }`,
    { slug }
  );
}

// ──────────────────────────────────────────
// Helpers — map Sanity docs → UI-friendly shapes
// ──────────────────────────────────────────

function toArtworkCard(artwork: Artwork): ArtworkCardData {
  return {
    title: artwork.title,
    slug: artwork.slug,
    image: artwork.images?.[0]
      ? urlFor(artwork.images[0]).width(600).height(750).url()
      : "/extra.jpg",
    price: artwork.price,
    isSold: artwork.isSold,
    isOneOfAKind: artwork.isOneOfAKind,
    isForSale: artwork.isForSale,
    category: artwork.category,
  };
}

function toBlogPostCard(post: BlogPost): BlogPostCard {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    date: new Date(post.publishedAt).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    coverImage: post.coverImage
      ? urlFor(post.coverImage).width(600).height(400).url()
      : "/extra.jpg",
  };
}
