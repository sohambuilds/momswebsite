"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ArtworkCardData } from "@/lib/sanity/types";

/**
 * The Workbench — featured artworks scattered as draggable, rotated cards
 * on a clay-coloured table with sticky-note annotations and tape strips.
 *
 * Logic ported from sample_design/components.jsx::Workbench. Each artwork
 * gets an initial position from a deterministic layout (so the server-rendered
 * markup matches the first client paint), then becomes freely draggable.
 *
 * On screens narrower than 700px (handled in globals.css) the items collapse
 * to a vertical stack and dragging is disabled.
 */

type Item = ArtworkCardData & {
  id: string;
  x: number;
  y: number;
  rot: number;
  z: number;
  cat: string;
  tags: string;
};

const SLOTS: Array<Pick<Item, "x" | "y" | "rot" | "z">> = [
  { x: 60, y: 80, rot: -4, z: 5 },
  { x: 360, y: 120, rot: 3, z: 4 },
  { x: 720, y: 60, rot: -2, z: 6 },
  { x: 1050, y: 130, rot: 5, z: 3 },
  { x: 200, y: 410, rot: 2, z: 7 },
  { x: 880, y: 420, rot: -5, z: 5 },
];

function toItems(artworks: ArtworkCardData[]): Item[] {
  return artworks.slice(0, SLOTS.length).map((a, i) => ({
    ...a,
    id: a.slug || `slot-${i}`,
    cat: a.category || "Piece",
    tags: a.category ? `${a.category} · One of a kind` : "Handmade",
    ...SLOTS[i],
  }));
}

export default function Workbench({
  artworks,
  totalCount,
}: {
  artworks: ArtworkCardData[];
  totalCount: number;
}) {
  const [items, setItems] = useState<Item[]>(() => toItems(artworks));
  const [dragging, setDragging] = useState<{ id: string; offX: number; offY: number } | null>(
    null,
  );
  const stageRef = useRef<HTMLDivElement>(null);

  function startDrag(e: React.MouseEvent, id: string) {
    if (!stageRef.current) return;
    const item = items.find((i) => i.id === id);
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
    function onMove(e: MouseEvent) {
      if (!stageRef.current || !dragging) return;
      const rect = stageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - dragging.offX;
      const y = e.clientY - rect.top - dragging.offY;
      setItems((it) => it.map((i) => (i.id === dragging.id ? { ...i, x, y } : i)));
    }
    function onUp() {
      setDragging(null);
    }
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
        <h2>
          The <em>workbench.</em>
          <br />
          Pieces, mid-thought.
        </h2>
        <div className="meta">
          <strong>
            {items.length.toString().padStart(2, "0")} of {totalCount} pieces
          </strong>
          <br />
          Drag any object to rearrange
          <br />
          Updated weekly
        </div>
      </div>

      <div className="workbench" ref={stageRef}>
        {items.map((it) => (
          <div
            key={it.id}
            className="work-item"
            style={{
              left: it.x,
              top: it.y,
              transform: `rotate(${it.rot}deg)`,
              zIndex: it.z,
            }}
            onMouseDown={(e) => startDrag(e, it.id)}
          >
            <div className="work-card">
              <div className="work-img">
                {it.image ? (
                  // eslint-disable-next-line @next/next/no-img-element -- intentionally
                  // <img> not next/image: the card is dragged with absolute positioning
                  // and we want the user to see the photo, not a Next.js loader frame.
                  <img src={it.image} alt={it.title} draggable={false} />
                ) : (
                  <div className="work-img-placeholder">
                    <strong>{it.cat}</strong>
                    <span>photo · {it.id}.jpg</span>
                  </div>
                )}
              </div>
              <div className="work-caption">
                <div className="work-title">{it.title}</div>
                <div className="work-price">
                  {it.isSold
                    ? "Sold"
                    : it.price
                      ? `₹${it.price.toLocaleString("en-IN")}`
                      : "Pay as you want"}
                </div>
              </div>
              <div className="work-tags">{it.tags}</div>
            </div>
          </div>
        ))}

        {/* Sticky notes — Suhrita's own studio voice */}
        <div
          className="sticky"
          style={{ left: 580, top: 30, transform: "rotate(4deg)" }}
        >
          Sometimes I feel I&apos;ve messed up. Then a few small changes and
          it&apos;s back. <strong>Never let them ruin.</strong>
        </div>
        <div
          className="sticky sage"
          style={{ left: 80, top: 350, transform: "rotate(-6deg)" }}
        >
          <strong>Tools.</strong> Plastic + safety pin. Some day, a metal set.
        </div>
        <div
          className="sticky pink"
          style={{ right: 60, top: 360, transform: "rotate(3deg)" }}
        >
          Every piece is like my child. They are all my favourites.
        </div>
        <div className="tape" style={{ left: 240, top: 60, transform: "rotate(-12deg)" }} />
        <div className="tape" style={{ left: 700, top: 480, transform: "rotate(8deg)" }} />

        <div className="work-actions">
          <Link href="/gallery" className="work-action-btn">
            View all {totalCount} →
          </Link>
          <Link href="/gallery" className="work-action-btn">
            Filter by medium
          </Link>
        </div>
      </div>
    </section>
  );
}
