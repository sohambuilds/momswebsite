import Link from "next/link";
import FeedbackForm from "@/components/feedback/FeedbackForm";

/**
 * About page — written from Suhrita's own answers (May 10, 2026):
 *  - Age 54, gynaecologist, Lake Town Kolkata
 *  - Origin: retinal laser surgery in early 2025 → urgency to make
 *  - Started regularly Feb 2025; 70+ pieces in 15 months
 *  - Process detail (Mould-it clay, earbud skeleton, safety pin, battery lights)
 *  - TV always on; family + colleagues encourage; "hobby has become a habit"
 *  - Three-word tagline: "Art with clay & paint"
 */

const CRAFTS = [
  {
    label: "Bottle art",
    blurb:
      "Old bottles I would have thrown out, repainted, sometimes lit from inside with battery lights tucked into a cut-out shell.",
  },
  {
    label: "Portraits",
    blurb:
      "Pencil, charcoal, colour. Faces I know, and one of myself I&rsquo;d like to redo, now that I&rsquo;ve learned a year more.",
  },
  {
    label: "Clay figurines & idols",
    blurb:
      "Mould-it clay, an earbud stick as the skeleton, then head, bust, hands, feet, hair, garlands, sari borders. Acrylic when dry.",
  },
  {
    label: "Texture painting",
    blurb:
      "Paint thick enough to feel, built up in layers, the canvas almost a small relief.",
  },
  {
    label: "Cloth & decorative",
    blurb:
      "A batua, painted on cloth, made today for my mother. Unique handmade pieces for any space.",
  },
];

const VALUES = [
  {
    title: "Entirely by hand. Always.",
    text: "No moulds. No shortcuts. The skeleton is an earbud stick; the detail tool is a safety pin. (One day, a metal set.)",
  },
  {
    title: "Every piece is one of a kind",
    text: "I don&rsquo;t make duplicates. Each piece is its own moment, and like a child, all are favourites.",
  },
  {
    title: "Self-taught, still learning",
    text: "I had no formal training. The pieces from early 2025 and the pieces from today are visibly different. That gap is the year showing.",
  },
  {
    title: "Honest feedback, please",
    text: "When a stranger evaluates my work, I learn my merits and demerits. That&rsquo;s how I grow. There is a form below. Please use it.",
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    label: "Skeleton",
    body: "Earbud stick. Sometimes a wire. Something to give the figure its standing posture.",
  },
  {
    n: "02",
    label: "Body",
    body: "Mould-it clay built around the skeleton: head, bust, legs, hands. Then the props: pots, baskets, anything they carry.",
  },
  {
    n: "03",
    label: "Detail",
    body: "Hairs, ornaments, garlands, sari borders, feet. Plastic tools and a safety pin for the gross lines and dots.",
  },
  {
    n: "04",
    label: "Paint",
    body: "Once dry, acrylic colour. Sometimes a coat of varnish to make it shine.",
  },
  {
    n: "05",
    label: "Light",
    body: "If a piece needs to glow, battery lights tucked inside a cut-out part of a plastic bottle become the casing.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero/Intro */}
      <section className="section" id="about-hero">
        <div className="section-head">
          <h2>
            Dr. Suhrita
            <br />
            <em>De Roy</em>.
          </h2>
          <div className="meta">
            54 · Gynaecologist
            <br />
            <strong>Self-taught artist</strong>
            <br />
            Lake Town, Kolkata
          </div>
        </div>

        <div className="responsive-two-col">
          <div>
            <p
              style={{
                fontFamily: "var(--serif)",
                fontSize: 22,
                lineHeight: 1.5,
                color: "var(--charcoal-900)",
                marginBottom: 28,
                fontVariationSettings: '"SOFT" 80',
              }}
            >
              In early 2025 I had a retinal scare and had to go for laser
              surgery. I had always sketched and painted on and off. In that
              moment I became afraid that if I lost my eyesight I would never
              get the scope to materialise the art that lived inside me. So I
              started, properly, every day, from February 2025.
            </p>

            <p
              style={{
                fontFamily: "var(--serif)",
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--charcoal-700)",
                marginBottom: 18,
              }}
            >
              I am a gynaecologist by profession, working from Lake Town in
              Kolkata. After hours, in a corner of the house with the TV always
              on, I shape clay, paint bottles, draw faces, and now paint on
              cloth too. Fifteen months in. Seventy-something pieces. No formal
              training, no moulds, no machines.
            </p>

            <p
              style={{
                fontFamily: "var(--serif)",
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--charcoal-700)",
                marginBottom: 28,
              }}
            >
              What began as urgency has become a habit. My family encourages
              me: my ninety-year-old parents, my husband, my son, my househelp.
              So do my friends, relatives, hospital colleagues and medical
              students. I am grateful for it.
            </p>

            <blockquote
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 20,
                lineHeight: 1.45,
                color: "var(--charcoal-900)",
                borderLeft: "2px solid var(--terracotta-500)",
                paddingLeft: 18,
                margin: "28px 0",
                fontVariationSettings: '"SOFT" 80',
              }}
            >
              &ldquo;While I try to heal my patients, my Art{" "}
              <em style={{ color: "var(--terracotta-500)" }}>Heals me.</em>&rdquo;
            </blockquote>

            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--charcoal-500)",
              }}
            >
              — Dr. Suhrita De Roy, Lake Town, Kolkata
            </div>
          </div>

          <aside
            style={{
              background: "var(--cream-100)",
              border: "1px solid rgba(58,46,36,0.12)",
              borderRadius: 14,
              padding: 0,
              overflow: "hidden",
            }}
          >
            {/* Portrait of Suhrita */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 5",
                backgroundImage: "url('/mama.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderBottom: "1px solid rgba(58,46,36,0.12)",
              }}
              role="img"
              aria-label="Dr. Suhrita De Roy"
            />
            <div style={{ padding: "26px 28px" }}>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--charcoal-500)",
                marginBottom: 16,
              }}
            >
              At a glance
            </div>
            <dl style={{ margin: 0, display: "grid", gap: 14 }}>
              {[
                ["Age", "54"],
                ["Day work", "Gynaecologist"],
                ["Studio", "Lake Town, Kolkata"],
                ["Started art", "Feb 2025 · self-taught"],
                ["Pieces made", "70+ in 15 months"],
                ["Time per piece", "4 to 8 hours"],
                ["Background", "TV, always on"],
                ["Moulds used", "Zero"],
                ["Shipping", "Inside Kolkata for now"],
                ["Payment", "Pay as you wish"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 1fr",
                    gap: 12,
                    fontSize: 13,
                  }}
                >
                  <dt
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 9.5,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--charcoal-500)",
                    }}
                  >
                    {k}
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      fontFamily: "var(--serif)",
                      color: "var(--charcoal-900)",
                    }}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            </div>
          </aside>
        </div>

        {/* Wide studio shot beneath the intro */}
        <div
          className="responsive-banner"
          style={{
            marginTop: 56,
            backgroundImage: "url('/studio.jpg')",
          }}
          role="img"
          aria-label="Suhrita's studio corner"
        />
      </section>

      {/* Crafts */}
      <section className="section" id="crafts">
        <div className="section-head">
          <h2>
            Bottles, paint,
            <br />
            <em>clay.</em>
          </h2>
          <div className="meta">
            All entirely handmade
            <br />
            <strong>No moulds. Ever.</strong>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 28,
          }}
        >
          {CRAFTS.map((c) => (
            <div
              key={c.label}
              style={{
                background: "var(--cream-100)",
                border: "1px solid rgba(58,46,36,0.1)",
                borderRadius: 12,
                padding: "26px 28px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--terracotta-500)",
                  marginBottom: 12,
                }}
              >
                {c.label}
              </div>
              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "var(--charcoal-700)",
                  margin: 0,
                }}
                // Allow the &rsquo; entities to render
                dangerouslySetInnerHTML={{ __html: c.blurb }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Process — directly from Q13 */}
      <section className="section" id="process">
        <div className="section-head">
          <h2>
            How a clay figure
            <br />
            <em>comes together.</em>
          </h2>
          <div className="meta">
            Five steps
            <br />
            <strong>plastic tools + safety pin</strong>
            <br />
            (one day, a metal set)
          </div>
        </div>

        {/* Close-up of hands at work */}
        <div
          className="responsive-banner"
          style={{
            backgroundImage: "url('/hands.jpg')",
            marginBottom: 40,
          }}
          role="img"
          aria-label="Hands shaping clay"
        />

        <div style={{ display: "grid", gap: 0, maxWidth: 880 }}>
          {PROCESS_STEPS.map((s) => (
            <div key={s.n} className="responsive-process-row">
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontWeight: 300,
                  fontSize: 36,
                  color: "var(--clay-300)",
                  lineHeight: 1,
                }}
              >
                {s.n}
              </div>
              <div
                className="process-label"
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--terracotta-500)",
                }}
              >
                {s.label}
              </div>
              <p
                className="process-body"
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: "var(--charcoal-700)",
                  margin: 0,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section" id="values">
        <div className="section-head">
          <h2>
            What I <em>believe.</em>
          </h2>
          <div className="meta">
            Four rules
            <br />
            written by hand
          </div>
        </div>

        <div style={{ display: "grid", gap: 0, maxWidth: 880 }}>
          {VALUES.map((v, i) => (
            <div key={v.title} className="responsive-value-row">
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontWeight: 300,
                  fontSize: 36,
                  color: "var(--clay-300)",
                  lineHeight: 1,
                }}
              >
                {(i + 1).toString().padStart(2, "0")}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 22,
                    margin: "0 0 8px",
                    color: "var(--charcoal-900)",
                    fontVariationSettings: '"SOFT" 80, "WONK" 1',
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 16,
                    lineHeight: 1.55,
                    color: "var(--charcoal-700)",
                    margin: 0,
                  }}
                  dangerouslySetInnerHTML={{ __html: v.text }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback */}
      <section className="section" id="feedback">
        <div className="section-head">
          <h2>
            Tell me what
            <br />
            <em>didn&apos;t</em> work.
          </h2>
          <div className="meta">
            Critique &gt; praise
            <br />
            <strong>Anonymous is fine</strong>
          </div>
        </div>

        <p
          style={{
            fontFamily: "var(--serif)",
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--charcoal-700)",
            maxWidth: 640,
            margin: "0 auto 36px",
            textAlign: "center",
          }}
        >
          When a stranger evaluates my work, I learn my merits and demerits.
          That&apos;s how I grow. Be honest about proportions, colour,
          composition, anything that didn&apos;t land. I read every note.
        </p>

        <FeedbackForm />
      </section>

      {/* Contact CTA */}
      <section className="section" id="contact">
        <div
          style={{
            textAlign: "center",
            maxWidth: 640,
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontWeight: 300,
              fontSize: "clamp(36px, 4.5vw, 56px)",
              lineHeight: 1,
              margin: "0 0 18px",
              fontVariationSettings: '"SOFT" 100, "WONK" 1, "opsz" 144',
              letterSpacing: "-0.03em",
              color: "var(--charcoal-900)",
            }}
          >
            Or just <em style={{ color: "var(--terracotta-500)" }}>say hi</em>.
          </h2>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--charcoal-700)",
              marginBottom: 12,
            }}
          >
            Curious about a piece? Want to commission a portrait, a bottle, a
            clay idol, a painting on cloth? Pay-as-you-wish.
          </p>
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--charcoal-500)",
              marginBottom: 32,
            }}
          >
            <a
              href="mailto:drsuhritaderoy@yahoo.com"
              style={{ color: "inherit" }}
            >
              drsuhritaderoy@yahoo.com
            </a>{" "}
            ·{" "}
            <a href="tel:+919433531075" style={{ color: "inherit" }}>
              +91 94335 31075
            </a>
          </p>
          <div className="cta-row" style={{ maxWidth: 480, margin: "0 auto" }}>
            <Link href="/custom-order" className="cta-btn cta-primary">
              Commission a piece <span className="cta-arrow">→</span>
            </Link>
            <Link href="/gallery" className="cta-btn cta-secondary">
              See the work <span className="cta-arrow">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
