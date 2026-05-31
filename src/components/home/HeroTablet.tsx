"use client";

import { useRef } from "react";
import Thumbprint from "@/components/ui/Thumbprint";

/**
 * The clay tablet on the left of the hero.
 * - Embossed serif headline rendered with multi-layer text-shadow
 * - Mouse movements occasionally drop a small fading "indentation" mark
 *   onto the clay surface (8% chance per mousemove, faded out after 6s)
 *
 * Logic ported from sample_design/components.jsx (Hero -> handleMove).
 */
export default function HeroTablet() {
  const tabletRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const t = tabletRef.current;
    if (!t) return;
    if (Math.random() > 0.08) return;
    const rect = t.getBoundingClientRect();
    const dot = document.createElement("div");
    dot.className = "indent";
    dot.style.left = `${e.clientX - rect.left - 7}px`;
    dot.style.top = `${e.clientY - rect.top - 7}px`;
    t.appendChild(dot);
    window.setTimeout(() => dot.remove(), 6000);
  }

  return (
    <div ref={tabletRef} className="tablet-stage" onMouseMove={handleMove}>
      <div className="tablet-title">
        <div className="tablet-eyebrow">
          No. 071 · After the eye scare · Lake Town, Kolkata
        </div>
        <div className="embossed">
          Hands that
          <br />
          heal,
          <br />
          <em>shape</em>.
        </div>
        <div className="tablet-sub">
          A gynaecologist by day. In early 2025 a retinal scare made me
          afraid I&apos;d lose the sight to ever make anything. So I
          started, that February. Clay, bottles, portraits, paint. Every
          piece by hand.
        </div>
      </div>

      <Thumbprint />
    </div>
  );
}
