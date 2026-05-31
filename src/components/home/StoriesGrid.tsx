import Link from "next/link";
import type { BlogPostCard } from "@/lib/sanity/types";

/**
 * 3-column "From the journal" cards — replaces the old dark blog teaser.
 * Cream background, large serif numerals, mono metadata, terracotta arrow link.
 */

function readingTime(excerpt: string): string {
  // Crude estimate: 200 words/min, fallback to "5 min".
  const words = excerpt.trim().split(/\s+/).length;
  const minutes = Math.max(3, Math.ceil((words * 8) / 200));
  return `${minutes} min`;
}

export default function StoriesGrid({
  posts,
  totalCount,
}: {
  posts: BlogPostCard[];
  totalCount: number;
}) {
  // Pad to 3 if fewer posts (so the grid never looks half-empty)
  const display = posts.slice(0, 3);

  return (
    <section className="section" id="journal">
      <div className="section-head">
        <h2>
          From the
          <br />
          <em>journal.</em>
        </h2>
        <div className="meta">
          <strong>
            {display.length} of {totalCount} posts
          </strong>
          <br />
          Notes from the studio
          <br />
          Updated weekly
        </div>
      </div>

      <div className="stories">
        {display.map((p, i) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="story">
            <div className="story-num">{(i + 1).toString().padStart(2, "0")}</div>
            <div className="story-meta">
              <span>{p.date}</span>
              <span>{readingTime(p.excerpt)}</span>
              <span>Studio</span>
            </div>
            <h3 className="story-title">{p.title}</h3>
            <div className="story-excerpt">{p.excerpt}</div>
            <div className="story-arrow">Read the post →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
