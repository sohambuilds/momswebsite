import Link from "next/link";
import { getAllBlogPosts, isSanityConfigured } from "@/lib/sanity";

// ─── Fallback data ─────────────────────────────────────────
// Story seeds drawn from Suhrita's actual answers — the retinal scare,
// the first failed Saraswati, the move from hobby to habit. Replace cover
// images with real photos from Soham as they arrive.

const fallbackPosts = [
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
      "My first ever clay piece, a tiny Saraswati idol. It did not go very well. I was happy anyway. Notes on the earbud-stick skeleton, the safety-pin tool, and what I'd redo today.",
    date: "Apr 18, 2025",
    coverImage: "/mood-detail.jpg",
  },
  {
    title: "Why I refuse moulds",
    slug: "why-i-refuse-moulds",
    excerpt:
      "It would be faster. The pieces would be more consistent. Here&rsquo;s why every figure I make will be pressed entirely by hand, even when it costs me.",
    date: "Sep 12, 2025",
    coverImage: "/mood-collection.jpg",
  },
  {
    title: "Hobby into habit",
    slug: "hobby-into-habit",
    excerpt:
      "Fifteen months in, 70+ pieces later. The TV is always on. My family encourages. The hobby has become a habit. A note on what changes when you stop missing days.",
    date: "May 10, 2026",
    coverImage: "/batua.jpg",
  },
];

function readingTime(excerpt: string): string {
  const words = excerpt.trim().split(/\s+/).length;
  const minutes = Math.max(3, Math.ceil((words * 8) / 200));
  return `${minutes} min`;
}

// ─── Page ──────────────────────────────────────────────────

export default async function BlogPage() {
  // Keep the four placeholder articles visible while Sanity is empty —
  // they're all written from mom's actual answers so they're real content,
  // just not yet stored in Sanity.
  const sanityPosts = isSanityConfigured() ? await getAllBlogPosts() : [];
  const posts = sanityPosts.length ? sanityPosts : fallbackPosts;

  return (
    <section className="section" id="journal">
      <div className="section-head">
        <h2>
          From the
          <br />
          <em>journal.</em>
        </h2>
        <div className="meta">
          {posts.length} posts · notes from the studio
          <br />
          <strong>Updated when there&apos;s something to say</strong>
        </div>
      </div>

      <div className="stories">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="story"
          >
            <div className="story-num">{(i + 1).toString().padStart(2, "0")}</div>
            <div className="story-meta">
              <span>{post.date}</span>
              <span>{readingTime(post.excerpt)}</span>
              <span>Studio</span>
            </div>
            <h3 className="story-title">{post.title}</h3>
            <div
              className="story-excerpt"
              // Allow &rsquo; entities to render
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
            <div className="story-arrow">Read the post →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
