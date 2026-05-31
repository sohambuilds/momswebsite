import Link from "next/link";

/**
 * Right column of the hero — three stacked ledger cards + CTAs.
 *
 * All values are real (provided by Suhrita on May 10, 2026):
 *   - 70+ pieces finished
 *   - Started Feb 2025 → ~15 months of regular practice
 *   - Live session: Mother's Day batua, painted on cloth (made today)
 */
export default function StudioLedger() {
  return (
    <div className="hero-right">
      {/* Live session card — today's piece, finished on Mother's Day 2026 */}
      <div className="ledger-card">
        <div className="ledger-label">●&nbsp;&nbsp;Latest · Mother&apos;s Day 2026</div>
        <div className="live-card">
          <div
            className="live-thumb live-thumb--filled"
            style={{
              backgroundImage: "url('/batua.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div>
            <div className="live-meta-title">A batua, painted on cloth</div>
            <div className="live-meta-sub">
              For my mother · finished today
            </div>
            <div className="live-progress">
              <div className="live-progress-bar" style={{ width: "100%" }} />
            </div>
          </div>
          <div className="live-time">
            06:00
            <br />
            <small>HRS · BY HAND</small>
          </div>
        </div>
      </div>

      {/* Counters strip */}
      <div className="counters">
        <div className="counter">
          <div className="counter-num">
            70<em>+</em>
          </div>
          <div className="counter-label">
            Pieces
            <br />
            finished
          </div>
        </div>
        <div className="counter">
          <div className="counter-num">
            <em>15</em>mo
          </div>
          <div className="counter-label">
            Of regular
            <br />
            practice
          </div>
        </div>
        <div className="counter">
          <div className="counter-num">
            0<em>.</em>
          </div>
          <div className="counter-label">
            Moulds
            <br />
            or shortcuts
          </div>
        </div>
      </div>

      {/* Provenance — the artist's own words */}
      <div className="provenance">
        <div className="prov-title">
          Why I make these <em>by hand.</em>
        </div>
        <div className="prov-quote">
          &ldquo;While I try to heal my patients, my Art <em>Heals me.</em>&rdquo;
        </div>
        <div className="prov-meta">
          <span>— Dr. Suhrita De Roy, May 2026</span>
          <Link href="/about" className="prov-cta">
            Read her story →
          </Link>
        </div>
      </div>

      {/* CTAs */}
      <div className="cta-row">
        <Link href="/gallery" className="cta-btn cta-primary">
          See the work <span className="cta-arrow">→</span>
        </Link>
        <Link href="/custom-order" className="cta-btn cta-secondary">
          Commission a piece <span className="cta-arrow">↗</span>
        </Link>
      </div>
    </div>
  );
}
