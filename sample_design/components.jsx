// Clay Corner components — kept small & shared via window
const { useState, useEffect, useRef } = React;

// ────────────────────────────────────────────────────────────
// NAV
// ────────────────────────────────────────────────────────────
function Nav() {
  const [time, setTime] = useState(formatNow());
  useEffect(() => {
    const id = setInterval(() => setTime(formatNow()), 30000);
    return () => clearInterval(id);
  }, []);
  function formatNow() {
    const d = new Date();
    return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false }) + " IST";
  }
  const links = [
    { n: "01", t: "Index", h: "#" },
    { n: "02", t: "Workbench", h: "#workbench" },
    { n: "03", t: "Year in Clay", h: "#year" },
    { n: "04", t: "Custom", h: "#custom" },
    { n: "05", t: "Journal", h: "#journal" },
    { n: "06", t: "About", h: "#about" },
  ];
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#" className="logo">
          <span className="logo-mark">Clay <em>Corner</em></span>
          <span className="logo-sub">est. 2025 · Kolkata · No. 047</span>
        </a>
        <nav className="nav-links">
          {links.map(l => (
            <a key={l.n} href={l.h} className="nav-link">
              <span className="num">{l.n}</span>{l.t}
            </a>
          ))}
        </nav>
        <div className="nav-status">
          <span className="status-dot"></span>
          <span>Studio open · {time}</span>
          <button className="cart-btn">Cart · 0</button>
        </div>
      </div>
    </header>
  );
}

// ────────────────────────────────────────────────────────────
// HERO  — embossed clay tablet + ledger column
// ────────────────────────────────────────────────────────────
function Hero({ tweaks }) {
  const tabletRef = useRef(null);

  // Cursor leaves indentations in the clay
  function handleMove(e) {
    const t = tabletRef.current;
    if (!t) return;
    if (Math.random() > 0.08) return;
    const rect = t.getBoundingClientRect();
    const dot = document.createElement("div");
    dot.className = "indent";
    dot.style.left = (e.clientX - rect.left - 7) + "px";
    dot.style.top  = (e.clientY - rect.top  - 7) + "px";
    t.appendChild(dot);
    setTimeout(() => dot.remove(), 6000);
  }

  return (
    <section className="hero">
      <div className="hero-grid">

        {/* The clay tablet — embossed title */}
        <div ref={tabletRef} className="tablet-stage" onMouseMove={handleMove}>
          <div className="tablet-title">
            <div className="tablet-eyebrow">No. 047 · Pressed by hand · Kolkata</div>
            <div className="embossed">
              Hands that<br/>heal,<br/><em>shape</em>.
            </div>
            <div className="tablet-sub">
              A medical professional by morning — a self-taught sculptor, painter
              &amp; bottle-artist by evening. One year in. Every piece pressed from
              raw clay or paper, no moulds, no machines.
            </div>
          </div>

          <div className="thumbprint" title="Suhrita's signature thumbprint">
            <svg viewBox="0 0 100 100">
              {[...Array(7)].map((_, i) => (
                <ellipse key={i}
                  cx="50" cy="50"
                  rx={12 + i*5} ry={16 + i*5}
                  fill="none"
                  stroke="rgba(255,235,200,0.3)"
                  strokeWidth="0.6"
                  transform={`rotate(${i*4} 50 50)`}
                />
              ))}
              <text x="50" y="92" textAnchor="middle"
                style={{fontFamily:"var(--mono)", fontSize:"5px", letterSpacing:"0.15em", fill:"rgba(255,235,200,0.5)"}}>
                S · ROY
              </text>
            </svg>
          </div>
        </div>

        {/* Right column: the ledger */}
        <div className="hero-right">

          {tweaks.showLiveSession && (
            <div className="ledger-card">
              <div className="ledger-label">●&nbsp;&nbsp;Live now · Studio session #312</div>
              <div className="live-card">
                <div className="live-thumb"></div>
                <div>
                  <div className="live-meta-title">Krishna with flute, in clay</div>
                  <div className="live-meta-sub">Drying · firing in 2 days</div>
                  <div className="live-progress">
                    <div className="live-progress-bar"></div>
                  </div>
                </div>
                <div className="live-time">04:21<br/><small>HRS WORKED</small></div>
              </div>
            </div>
          )}

          <div className="counters">
            <div className="counter">
              <div className="counter-num">142<em>.</em></div>
              <div className="counter-label">Pieces<br/>finished</div>
            </div>
            <div className="counter">
              <div className="counter-num"><em>1</em>yr</div>
              <div className="counter-label">Of self-<br/>taught practice</div>
            </div>
            <div className="counter">
              <div className="counter-num">0<em>.</em></div>
              <div className="counter-label">Moulds<br/>or shortcuts</div>
            </div>
          </div>

          <div className="provenance">
            <div className="prov-title">Why I make these <em>by hand.</em></div>
            <div className="prov-quote">
              "Art keeps me calm. After a long day in the medical field,
              clay is the only thing that listens without asking questions.
              Every piece carries that quiet."
            </div>
            <div className="prov-meta">
              <span>— Suhrita Roy, May 2026</span>
              <a className="prov-cta">Read the journal →</a>
            </div>
          </div>

          <div className="cta-row">
            <a className="cta-btn cta-primary">
              Browse the workbench <span className="cta-arrow">→</span>
            </a>
            <a className="cta-btn cta-secondary">
              Commission a piece <span className="cta-arrow">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// THE WORKBENCH — scattered draggable artworks
// ────────────────────────────────────────────────────────────
const WORK_ITEMS = [
  {
    id: "radha",
    title: "Radha, in devotion",
    tags: "Clay · 18cm · Apr 2026",
    price: "₹4,500",
    cat: "Clay figurine",
    x: 60, y: 80, rot: -4, z: 5,
  },
  {
    id: "oldman",
    title: "The boatman of Sundarbans",
    tags: "Charcoal · A3 · Mar 2026",
    price: "₹3,500",
    cat: "Portrait",
    x: 360, y: 120, rot: 3, z: 4,
  },
  {
    id: "bottle",
    title: "Moroccan night, on glass",
    tags: "Acrylic on bottle · 22cm · Feb 2026",
    price: "₹2,800",
    cat: "Bottle art",
    x: 720, y: 60, rot: -2, z: 6,
  },
  {
    id: "ganesh",
    title: "Ganesh, smiling",
    tags: "Clay · 24cm · Jan 2026",
    price: "₹5,200",
    cat: "Clay figurine",
    x: 1050, y: 130, rot: 5, z: 3,
  },
  {
    id: "texture",
    title: "Monsoon, in three layers",
    tags: "Texture on canvas · 30×40cm",
    price: "Sold",
    cat: "Painting",
    x: 200, y: 410, rot: 2, z: 7,
  },
  {
    id: "vase",
    title: "Rustic bottle vase",
    tags: "Mixed media · 28cm · Dec 2025",
    price: "₹2,200",
    cat: "Bottle art",
    x: 880, y: 420, rot: -5, z: 5,
  },
];

function Workbench({ tweaks }) {
  const [items, setItems] = useState(WORK_ITEMS);
  const [dragging, setDragging] = useState(null);
  const stageRef = useRef(null);

  function startDrag(e, id) {
    const item = items.find(i => i.id === id);
    if (!item) return;
    const rect = stageRef.current.getBoundingClientRect();
    setDragging({
      id,
      offX: e.clientX - rect.left - item.x,
      offY: e.clientY - rect.top - item.y,
    });
    e.preventDefault();
  }

  useEffect(() => {
    if (!dragging) return;
    function onMove(e) {
      const rect = stageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - dragging.offX;
      const y = e.clientY - rect.top - dragging.offY;
      setItems(it => it.map(i => i.id === dragging.id ? {...i, x, y} : i));
    }
    function onUp() { setDragging(null); }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  return (
    <section className="section" id="workbench">
      <div className="section-head">
        <h2>The <em>workbench.</em><br/>Pieces, mid-thought.</h2>
        <div className="meta">
          <strong>06 of 142 pieces</strong><br/>
          Drag any object to rearrange<br/>
          Updated 8 hours ago
        </div>
      </div>

      <div className="workbench" ref={stageRef}>
        {items.map((it, i) => (
          <div key={it.id} className="work-item"
               style={{
                 left: it.x, top: it.y,
                 transform: `rotate(${it.rot}deg)`,
                 zIndex: it.z,
               }}
               onMouseDown={(e) => startDrag(e, it.id)}>
            <div className="work-card">
              <div className="work-img">
                <div className="work-img-placeholder">
                  <strong>{it.cat}</strong>
                  <span>photo · {it.id}.jpg</span>
                </div>
              </div>
              <div className="work-caption">
                <div className="work-title">{it.title}</div>
                <div className="work-price">{it.price}</div>
              </div>
              <div className="work-tags">{it.tags}</div>
            </div>
          </div>
        ))}

        {tweaks.showAnnotations && (
          <>
            <div className="sticky" style={{left: 580, top: 30, transform: "rotate(4deg)"}}>
              {tweaks.stickyNoteText}
            </div>
            <div className="sticky sage" style={{left: 80, top: 350, transform: "rotate(-6deg)"}}>
              <strong>Note —</strong> Dry her hair-strands slower next time. Cracked at temple.
            </div>
            <div className="sticky pink" style={{right: 60, top: 360, transform: "rotate(3deg)"}}>
              Bottle art week!! Got 3 new bottles from the chai stall. Excited.
            </div>
            <div className="tape" style={{left: 240, top: 60, transform: "rotate(-12deg)"}}></div>
            <div className="tape" style={{left: 700, top: 480, transform: "rotate(8deg)"}}></div>
          </>
        )}

        <div className="work-actions">
          <button className="work-action-btn">View all 142 →</button>
          <button className="work-action-btn">Filter by medium</button>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// YEAR IN CLAY — evolution timeline
// ────────────────────────────────────────────────────────────
const YEAR_ENTRIES = [
  {
    date: "May 2025 · Month 01",
    title: "First press. <em>Trembling.</em>",
    blurb: "After a 14-hour shift, I sat with a lump of red clay and pressed it for 40 minutes. It barely resembled anything. But the trembling stopped.",
    tiles: ["First lump", "Practice ball", "Practice ball II"],
  },
  {
    date: "Aug 2025 · Month 04",
    title: "Faces start to appear.",
    blurb: "I tried portraits — pencil first, then charcoal. Hands still shaped clay on weekends. Slowly, things started to look like the people I was thinking of.",
    tiles: ["Self-portrait", "Charcoal study", "Boatman", "Smiling girl"],
  },
  {
    date: "Dec 2025 · Month 08",
    title: "Bottles &amp; <em>texture.</em>",
    blurb: "The shop next door was throwing away beautiful old bottles. I started painting them. Then I started building texture on canvas — paint thick like clay.",
    tiles: ["Blue bottle", "Green vase", "Monsoon I", "Monsoon II", "Diya bottle"],
  },
  {
    date: "Apr 2026 · Month 12",
    title: "Now: <em>commissions.</em>",
    blurb: "People asked. Then they paid. I can hardly believe it. Each commission still takes me weeks — every one is one of a kind, made entirely by hand.",
    tiles: ["Radha", "Ganesh", "Wedding portrait", "Custom diya set", "Bottle gift", "Krishna (WIP)"],
  },
];

function YearInClay() {
  return (
    <section className="section" id="year" style={{background: "transparent"}}>
      <div className="section-head">
        <h2>One year of<br/><em>not knowing how.</em></h2>
        <div className="meta">
          May 2025 → May 2026<br/>
          <strong>0 → 142 pieces</strong><br/>
          Self-taught throughout
        </div>
      </div>

      <div className="evo-card">
        <h3>The <em>evolution</em> grid · pieces per month</h3>
        <p>Each cell is one finished piece. Cells get fuller, then darker, as the year goes on — by spring 2026, no week passes without something new on the workbench.</p>
        <div className="evo-bar">
          {[2,3,4,4,6,9,11,14,16,19,24,30].map((n, i) => (
            <div key={i} style={{display:"grid", gridTemplateRows:"repeat(5, 1fr)", gap:"3px"}}>
              {[...Array(5)].map((_, r) => {
                const cls = (5 - r) <= Math.min(5, Math.floor(n/2))
                  ? (i > 7 ? "filled-deep" : "filled")
                  : "";
                return <div key={r} className={"evo-cell " + cls}></div>;
              })}
            </div>
          ))}
        </div>
        <div className="evo-bar-labels">
          <span>May '25</span><span>Aug</span><span>Nov</span><span>Feb '26</span><span>May '26</span>
        </div>
      </div>

      <div className="year-strip">
        <div className="year-side">
          <div style={{
            fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.15em",
            textTransform: "uppercase", color: "var(--charcoal-500)", marginBottom: 16,
          }}>The arc</div>
          <div style={{
            fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.5,
            color: "var(--charcoal-700)", fontVariationSettings: '"SOFT" 50',
          }}>
            From a single trembling pinch of clay to a full studio practice — in
            twelve months. Click any tile to see the piece that lives behind it.
          </div>
        </div>

        <div className="year-axis">
          {YEAR_ENTRIES.map((e, i) => (
            <div key={i} className="year-month">
              <div className="year-date">{e.date}</div>
              <h3 className="year-title" dangerouslySetInnerHTML={{__html: e.title}}></h3>
              <div className="year-blurb" dangerouslySetInnerHTML={{__html: e.blurb}}></div>
              <div className="year-tiles">
                {e.tiles.map((t, j) => (
                  <div key={j} className="year-tile">
                    <div className="year-tile-label">{t}</div>
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

// ────────────────────────────────────────────────────────────
// CUSTOM ORDER — recipe card
// ────────────────────────────────────────────────────────────
function CustomOrder() {
  const [medium, setMedium] = useState("Clay figurine");
  const mediums = ["Clay figurine", "Portrait", "Bottle art", "Texture painting", "Idol", "Surprise me"];

  return (
    <section className="section" id="custom">
      <div className="custom-strip">
        <div className="custom-left">
          <div className="custom-eyebrow">No. 048 · Custom commission</div>
          <h2 className="custom-headline">
            Tell me<br/>about the<br/><em>person</em>.
          </h2>
          <p className="custom-body">
            Every commission begins with a story — who is this for? What do they
            love? I'll spend two to four weeks shaping a piece you won't find
            anywhere else, made entirely by hand.
          </p>
          <div className="custom-pills">
            {mediums.map(m => (
              <button key={m}
                className={"pill" + (m === medium ? " active" : "")}
                onClick={() => setMedium(m)}>{m}</button>
            ))}
          </div>
          <div style={{
            fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em",
            color: "rgba(248,241,230,0.45)", textTransform: "uppercase",
          }}>
            Typical reply: 2–3 days · Build time: 2–4 weeks · From ₹1,800
          </div>
        </div>

        <div className="custom-right">
          <div className="recipe">
            <div className="recipe-head">
              <div>
                <div style={{fontFamily:"var(--mono)", fontSize: 9, letterSpacing:"0.2em", color:"var(--clay-300)", marginBottom: 6}}>FORM 048-A · COMMISSION</div>
                <div className="recipe-title">your piece, drafted</div>
              </div>
              <div className="recipe-id">#{(Math.random()*9000+1000).toFixed(0)}</div>
            </div>
            <div className="recipe-row">
              <div className="recipe-key">For</div>
              <div className="recipe-val">someone you love · <em>say their name</em></div>
            </div>
            <div className="recipe-row">
              <div className="recipe-key">Medium</div>
              <div className="recipe-val">{medium}</div>
            </div>
            <div className="recipe-row">
              <div className="recipe-key">Size</div>
              <div className="recipe-val">small · 10–18cm</div>
            </div>
            <div className="recipe-row">
              <div className="recipe-key">Budget</div>
              <div className="recipe-val">₹2,000 – ₹5,000</div>
            </div>
            <div className="recipe-row">
              <div className="recipe-key">Theme</div>
              <div className="recipe-val">describe a <em>moment</em>, not a thing</div>
            </div>
            <div className="recipe-foot">
              <button className="recipe-submit">
                <span>Begin the commission</span>
                <small>↗ FORM</small>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// STORIES — letterpress posts
// ────────────────────────────────────────────────────────────
function Stories() {
  const posts = [
    {
      n: "01",
      meta: ["Feb 15, 2026", "5 min", "Therapy"],
      title: "How <em>art</em> became my therapy.",
      excerpt: "After years in the medical field, I found that shaping clay and drawing portraits is the best stress relief there is. A note on what art has actually done for me.",
    },
    {
      n: "02",
      meta: ["Jan 28, 2026", "7 min", "Journey"],
      title: "One year, <em>142 pieces</em>.",
      excerpt: "From my very first lump of clay to portraits, idols and bottle art — what I learned, what I broke, and the four pieces I'd happily start over.",
    },
    {
      n: "03",
      meta: ["Dec 02, 2025", "4 min", "Method"],
      title: "Why I refuse <em>moulds</em>.",
      excerpt: "It would be faster. The pieces would be more consistent. Here's why I've decided every figurine I make will be pressed entirely by hand, even when it costs me.",
    },
  ];

  return (
    <section className="section" id="journal">
      <div className="section-head">
        <h2>From the<br/><em>journal.</em></h2>
        <div className="meta">
          <strong>3 of 24 posts</strong><br/>
          Notes from the studio<br/>
          Updated weekly
        </div>
      </div>
      <div className="stories">
        {posts.map(p => (
          <a key={p.n} className="story">
            <div className="story-num">{p.n}</div>
            <div className="story-meta">
              {p.meta.map(m => <span key={m}>{m}</span>)}
            </div>
            <h3 className="story-title" dangerouslySetInnerHTML={{__html: p.title}}></h3>
            <div className="story-excerpt">{p.excerpt}</div>
            <div className="story-arrow">Read the post →</div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// FOOTER
// ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="about">
      <div className="footer-inner">
        <div className="foot-grid">
          <div>
            <div className="foot-mark">Hands<br/>that <em>shape.</em></div>
            <div className="foot-sig">
              Suhrita Roy is a 54-year-old self-taught artist working from a small
              studio in Kolkata, between hospital shifts. Every piece is made
              entirely by hand. Each one is one of a kind.
            </div>
          </div>
          <div className="foot-col">
            <h4>Browse</h4>
            <a>The Workbench</a>
            <a>Year in Clay</a>
            <a>The Shop</a>
            <a>Journal</a>
          </div>
          <div className="foot-col">
            <h4>Commission</h4>
            <a>Start a piece</a>
            <a>Pricing &amp; timing</a>
            <a>Care &amp; shipping</a>
            <a>FAQ</a>
          </div>
          <div className="foot-col">
            <h4>Reach Suhrita</h4>
            <a>hello@claycorner.in</a>
            <a>+91 · on request</a>
            <a>Instagram</a>
            <a>Studio visits</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Suhrita Roy · Clay Corner · Kolkata, India</span>
          <span>Built by hand. No moulds, no shortcuts.</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, Workbench, YearInClay, CustomOrder, Stories, Footer });
