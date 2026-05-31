import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Button from "@/components/ui/Button";
import { getBlogPostBySlug, isSanityConfigured } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity/image";

// ─── Fallback post (used when Sanity is not configured) ────

// Slug-keyed map of fallback posts. Sanity, once configured, overrides this
// entirely. Until then, every article listed at /blog has its own body here.

type FallbackPost = {
  title: string;
  date: string;
  coverImage: string;
  body: string[];
};

const FALLBACK_POSTS: Record<string, FallbackPost> = {
  "before-i-lose-my-sight": {
    title: "Before I lose my sight",
    date: "March 2, 2025",
    coverImage: "/mood-hands.jpg",
    body: [
      "People ask me, why did you suddenly start at 54? It wasn't sudden. I had sketched and painted on and off for as long as I can remember, in the cracks between hospital shifts and family life. But it was always once-in-a-while.",
      "In early 2025 I had a problem with my eyesight and had to go for retinal laser surgery. That was the moment. Sitting there, waiting, I became really afraid that if I lost my sight, I would never get the scope to materialise the art that lived inside me. The hands could keep moving. But the eyes might not.",
      "From that February, I started doing it every day. Properly. Not as a hobby, but as a habit. Clay first. I had never touched it before. The first piece was a tiny Saraswati. It did not go very well. I was happy anyway.",
      "Then came bottles. Then portraits, including a coloured one of my own photo, which now I look at and see all the rectifications it needs. That gap is the year showing. Then texture paintings. Today, on Mother's Day, I painted a batua, a small pouch bag on cloth, for my mother who is ninety.",
      "I have no formal training. The skeleton inside my clay figures is an earbud stick. The detail tool is a safety pin. The paint is acrylic. When a piece needs to glow, battery lights tucked inside a cut piece of plastic bottle become the casing. Every single piece is shaped entirely by hand. No moulds.",
      "While I try to heal my patients, my art heals me. Fifteen months in, more than seventy pieces. The hobby has become a habit. I am grateful to my ninety-year-old parents, my husband, my son, my househelp, my friends and relatives, my hospital colleagues, my medical students. Every one of them encourages me. And now I want strangers to look too, and tell me honestly what works and what does not. That is how I will get better.",
    ],
  },

  "saraswati-didnt-go-well": {
    title: "A Saraswati, didn't go well",
    date: "April 18, 2025",
    coverImage: "/mood-detail.jpg",
    body: [
      "I had been sketching and painting on and off all my life. Clay was different. Clay I had never touched.",
      "A couple of months after I started the daily practice, I decided to try a small idol. A Saraswati. I had no instructions, no class, no teacher to ask. Just a packet of Mould-it clay from the stationery shop, an earbud stick, and a safety pin.",
      "The earbud stick became the skeleton, the thing the figure could stand on. Around it I built the body: head, bust, arms, the long sari falling to the feet. Then the props that Saraswati has to carry, the veena most of all. Then her hair, her ornaments, her garland, the borders of her sari. The safety pin scratched in the fine lines. The plastic tools shaped the larger surfaces. A metal set would be nice, some day.",
      "When she was dry, I painted her with acrylic. A coat of varnish at the end, to make her shine.",
      "She did not go very well. Her proportions were not quite right. Her expression was unfinished. Something about her felt like a first attempt, because she was.",
      "Still I was happy. The clay had cooperated. My hands knew, by the end, slightly more than they had known at the start. The next idol would be better. The one after that, better still.",
      "I have not repaired the Saraswati. She sits on a shelf as she was made. She is the reminder of where I started.",
    ],
  },

  "why-i-refuse-moulds": {
    title: "Why I refuse moulds",
    date: "September 12, 2025",
    coverImage: "/mood-collection.jpg",
    body: [
      "A piece that takes me a week could be made in a few minutes with a mould. I know. People have suggested it.",
      "But the moment you press clay into a shape someone else has carved, the piece stops being yours. It becomes a copy. The clay is yours, the paint is yours, the patience is yours. The form belongs to the mould-maker. I would rather make ten imperfect figures of my own than a hundred clean copies of someone else's.",
      "My way is slow. An earbud stick for the skeleton. Mould-it clay built around it, head and bust and limbs and feet. The props that the figure needs, by hand: a pot, a basket, a flute, a veena. Then the hair. Then ornaments and garlands. Then the borders of the sari. Plastic tools and a safety pin to score the surface where it needs detail.",
      "Sometimes things go wrong. A garland breaks while drying. A face comes out longer than it should. The expression doesn't sit. I used to think these were ruined pieces.",
      "Now I know better. Sometimes I feel I have messed up, but then a few small changes and the piece comes back. Never let them ruin. That is something I have learned only by making the next mistake, and the next.",
      "With moulds, a mistake would mean starting over. By hand, a mistake teaches you. The piece you finish carries the lesson of the one that almost wasn't.",
      "Every piece is like my child. They are all my favourites, the easy ones and the difficult ones both. That is only possible because I made them, not a mould.",
    ],
  },

  "hobby-into-habit": {
    title: "Hobby into habit",
    date: "May 10, 2026",
    coverImage: "/batua.jpg",
    body: [
      "Today is Mother's Day. I made a small batua, a painted pouch on cloth, for my mother. She is ninety. She seemed pleased.",
      "That batua is the most recent of more than seventy pieces I have made since February of last year. Fifteen months. The first ones, in early 2025, I made because I was afraid. A retinal scare, laser surgery, and the fear that I might lose the eyes to make anything at all. I started the next day, properly, every day.",
      "Somewhere in between then and now, the fear became something else. A habit.",
      "A habit means you stop deciding. The clay is already on the table when I come home from the hospital. The brush is already in my hand by the time the TV is on. (The TV is always on while I work. I cannot explain why; it just is.) My son walks past. My husband brings tea. My ninety-year-old parents ask what I am making. My househelp picks up the small pieces and turns them gently in her hands. My friends, my relatives, my hospital colleagues, my medical students — every one of them encourages me. I am grateful for all of it.",
      "While I try to heal my patients, my art heals me. I do not say that as a slogan. I mean that after a day of patients, of charts, of long shifts, the clay is the only thing that does not ask anything of me. It just receives the shape I press into it.",
      "The hobby has become a habit. Seventy pieces, plus the ones I am working on right now, plus the ones I have not yet thought of. I would like, in the next fifteen months, for strangers to look at the work and tell me honestly what is not good. That is the only thing I am missing. Praise I have plenty of. Criticism would help me grow.",
      "Until then, the next piece is already inside me. I just have to sit down and let it out.",
    ],
  },
};

// ─── Portable Text components ────────────────────────────────

const ptComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="body-md leading-[1.8]">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="heading-md text-charcoal-800 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-serif text-charcoal-700 mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-terracotta-300 pl-4 italic text-charcoal-500 my-6">
        {children}
      </blockquote>
    ),
  },
};

// ─── Page ────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post: {
    title: string;
    date: string;
    coverImage: string;
    body: unknown;
  } | null = null;

  if (isSanityConfigured()) {
    const sanityPost = await getBlogPostBySlug(slug);
    if (sanityPost) {
      post = {
        title: sanityPost.title,
        date: new Date(sanityPost.publishedAt).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        coverImage: sanityPost.coverImage
          ? urlFor(sanityPost.coverImage).width(1200).height(600).url()
          : "",
        body: sanityPost.body, // PortableTextBlock[]
      };
    }
  } else {
    // Look up the slug in the fallback map. If a visitor types an unknown
    // slug, fall back to the origin story rather than 404'ing immediately —
    // the rest of the site links to four known slugs, so this is just safety.
    post = FALLBACK_POSTS[slug] ?? FALLBACK_POSTS["before-i-lose-my-sight"];
  }

  if (!post) notFound();

  const isPortableText = Array.isArray(post.body) && post.body.length > 0 && typeof post.body[0] !== "string";

  return (
    <article>
      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative w-full h-[40vh] md:h-[55vh] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream-50 via-transparent to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="section-padding -mt-20 relative">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-terracotta-500 font-sans font-medium mb-4">
            {post.date}
          </p>
          <h1 className="heading-lg text-charcoal-800 mb-10">
            {post.title}
          </h1>

          <div className="space-y-6">
            {isPortableText ? (
              /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
              <PortableText value={post.body as any} components={ptComponents} />
            ) : (
              (post.body as string[]).map((paragraph, idx) => (
                <p key={idx} className="body-md leading-[1.8]">
                  {paragraph}
                </p>
              ))
            )}
          </div>

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-clay-200">
            <Link href="/blog">
              <Button variant="ghost">&larr; Back to Blog</Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
