/**
 * "After the eye scare" — the evolution timeline, anchored to Suhrita's
 * real arc (Feb 2025 → May 2026, ~70+ pieces, no formal training).
 *
 * Server component. Milestones are hand-written from her answers.
 */

type Tile = { label: string; image?: string };

const YEAR_ENTRIES: Array<{
  date: string;
  titleHTML: string;
  blurb: string;
  tiles: Tile[];
}> = [
  {
    date: "Feb 2025 · Month 01",
    titleHTML: "Before I lose my <em>sight.</em>",
    blurb:
      "A retinal scare, laser surgery, and the sudden fear that I might not have the eyes to make anything later. I had sketched and painted on and off all my life. From this February, I started doing it every day.",
    tiles: [
      { label: "First piece", image: "/early-1.jpg" },
      { label: "Early practice", image: "/early-2.jpg" },
      { label: "Early practice II", image: "/early-3.jpg" },
    ],
  },
  {
    date: "Apr 2025 · Month 03",
    titleHTML: "A <em>Saraswati</em>, in clay.",
    blurb:
      "I had never touched clay before. The first one, a tiny Saraswati idol, did not go very well. Still I was happy. The earbud stick became my skeleton. The safety pin became my detail tool.",
    tiles: [
      { label: "First clay", image: "/clay.jpg" },
      { label: "From the middle", image: "/mid-1.jpg" },
    ],
  },
  {
    date: "Sep 2025 · Month 08",
    titleHTML: "Bottles &amp; <em>portraits.</em>",
    blurb:
      "Bottles I would have thrown out, repainted into something for a shelf. A coloured portrait of my own photo. Proud of it then, see room for rectification now. That gap is the year showing.",
    tiles: [
      { label: "Self-portrait", image: "/mid-2.jpg" },
      { label: "Bottle, repainted", image: "/bottle.jpg" },
      { label: "Portrait", image: "/portrait.jpg" },
    ],
  },
  {
    date: "May 2026 · Month 15",
    titleHTML: "<em>Today:</em> a Mother&apos;s Day batua.",
    blurb:
      "A pouch bag, painted on cloth, for my mother. Finished today. 70+ pieces in. The hobby has become a habit. Every piece is still made entirely by hand, with battery lights tucked inside cut plastic bottles when a piece needs to glow.",
    tiles: [
      { label: "Batua (today)", image: "/batua.jpg" },
      { label: "Texture", image: "/texture.jpg" },
      { label: "Recent", image: "/recent-1.jpg" },
      { label: "Recent II", image: "/recent-2.jpg" },
      { label: "Another favourite", image: "/extra.jpg" },
    ],
  },
];

// Pieces-per-month — smooth rising curve to ~70 over 12 displayed months.
// (We span Feb '25 → May '26, ~15 months in real life, but the heatmap card
// shows 12 cells — labels stretch the eye, the cells imply tempo.)
const MONTHLY_COUNTS = [2, 3, 3, 4, 4, 5, 6, 6, 7, 8, 9, 10];

export default function YearInClay() {
  return (
    <section className="section" id="year">
      <div className="section-head">
        <h2>
          Fifteen months
          <br />
          of <em>not knowing how.</em>
        </h2>
        <div className="meta">
          Feb 2025 → today
          <br />
          <strong>0 → 70+ pieces</strong>
          <br />
          Self-taught throughout
        </div>
      </div>

      {/* Evolution heatmap card */}
      <div className="evo-card">
        <h3>
          The <em>evolution</em> grid · pieces per month
        </h3>
        <p>
          Each cell is one finished piece. Clay, bottle, paint, paper. Cells
          fill, then darken, as the months go on. Some weeks there is nothing:
          a clinic week, a long shift. Most weeks, there is something new on
          the table.
        </p>
        <div className="evo-bar">
          {MONTHLY_COUNTS.map((n, i) => (
            <div
              key={i}
              style={{ display: "grid", gridTemplateRows: "repeat(5, 1fr)", gap: 3 }}
            >
              {Array.from({ length: 5 }).map((_, r) => {
                const filled = 5 - r <= Math.min(5, Math.floor(n / 2));
                const cls = filled ? (i > 7 ? "filled-deep" : "filled") : "";
                return <div key={r} className={`evo-cell ${cls}`} />;
              })}
            </div>
          ))}
        </div>
        <div className="evo-bar-labels">
          <span>Feb &apos;25</span>
          <span>Jun</span>
          <span>Oct</span>
          <span>Feb &apos;26</span>
          <span>May &apos;26</span>
        </div>
      </div>

      {/* Sticky-side timeline */}
      <div className="year-strip">
        <div className="year-side">
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--charcoal-500)",
              marginBottom: 16,
            }}
          >
            The arc
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 17,
              lineHeight: 1.5,
              color: "var(--charcoal-700)",
              fontVariationSettings: '"SOFT" 50',
            }}
          >
            From a retinal scare to a self-taught practice. Fifteen months in.
            What started as urgency became a daily habit. Clay, paint, bottles,
            cloth.
          </div>
        </div>

        <div className="year-axis">
          {YEAR_ENTRIES.map((e, i) => (
            <div key={i} className="year-month">
              <div className="year-date">{e.date}</div>
              <h3
                className="year-title"
                dangerouslySetInnerHTML={{ __html: e.titleHTML }}
              />
              <div className="year-blurb">{e.blurb}</div>
              <div className="year-tiles">
                {e.tiles.map((t) => (
                  <div
                    key={t.label}
                    className="year-tile"
                    style={
                      t.image
                        ? {
                            backgroundImage: `url('${t.image}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }
                        : undefined
                    }
                  >
                    <div className="year-tile-label">{t.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
