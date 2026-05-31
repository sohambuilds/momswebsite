"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Home-page custom-order teaser. The actual form lives at /custom-order;
 * this is the split-panel hook (dark left + recipe-card right).
 *
 * Pricing footer is "pay as you want" per Soham's spec — no fixed reply
 * time / build time / "from ₹X" line.
 */

const MEDIUMS = [
  "Bottle art",
  "Portrait",
  "Clay figurine",
  "Painting on cloth",
  "Texture painting",
  "Surprise me",
];

export default function CustomOrderPanel() {
  const [medium, setMedium] = useState(MEDIUMS[0]);
  // Form id is purely decorative — initialise empty on the server so SSR and
  // first client paint match, then fill on mount. Avoids React hydration error.
  const [formId, setFormId] = useState("");
  useEffect(() => {
    setFormId(Math.floor(1000 + Math.random() * 9000).toString());
  }, []);

  return (
    <section className="section" id="custom">
      <div className="custom-strip">
        <div className="custom-left">
          <div className="custom-eyebrow">No. 048 · Custom commission</div>
          <h2 className="custom-headline">
            Tell me
            <br />
            about the
            <br />
            <em>person</em>.
          </h2>
          <p className="custom-body">
            Every commission begins with a story. Who is this for? What do
            they love? I&apos;ll spend a few sittings shaping a piece you
            won&apos;t find anywhere else, made entirely by hand.
            Pay-as-you-wish.
          </p>
          <div className="custom-pills">
            {MEDIUMS.map((m) => (
              <button
                key={m}
                type="button"
                className={`pill${m === medium ? " active" : ""}`}
                onClick={() => setMedium(m)}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="custom-foot">
            Pay as you wish · 4–8 hours per piece · Inside Kolkata for now
          </div>
        </div>

        <div className="custom-right">
          <div className="recipe">
            <div className="recipe-head">
              <div>
                <div className="recipe-form-label">FORM 048-A · COMMISSION</div>
                <div className="recipe-title">your piece, drafted</div>
              </div>
              <div className="recipe-id">#{formId}</div>
            </div>
            <div className="recipe-row">
              <div className="recipe-key">For</div>
              <div className="recipe-val">
                someone you love · <em>say their name</em>
              </div>
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
              <div className="recipe-val">
                <em>pay as you wish</em>
              </div>
            </div>
            <div className="recipe-row">
              <div className="recipe-key">Theme</div>
              <div className="recipe-val">
                describe a <em>moment</em>, not a thing
              </div>
            </div>
            <div className="recipe-foot">
              <Link
                href={`/custom-order?medium=${encodeURIComponent(medium)}`}
                className="recipe-submit"
              >
                <span>Begin the commission</span>
                <small>↗ FORM</small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
