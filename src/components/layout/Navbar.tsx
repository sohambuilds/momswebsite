"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store";

const NAV_LINKS = [
  { num: "01", label: "Index", href: "/" },
  { num: "02", label: "Workbench", href: "/gallery" },
  { num: "03", label: "Shop", href: "/shop" },
  { num: "04", label: "Custom", href: "/custom-order" },
  { num: "05", label: "Journal", href: "/blog" },
  { num: "06", label: "About", href: "/about" },
];

function formatIST(): string {
  const d = new Date();
  return (
    d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    }) + " IST"
  );
}

export default function Navbar() {
  const [time, setTime] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useCartStore((s) => s.items.length);

  // Mount-only clock — avoids hydration mismatch
  useEffect(() => {
    setTime(formatIST());
    const id = setInterval(() => setTime(formatIST()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="logo">
          <span className="logo-mark">
            Clay <em>Corner</em>
          </span>
          <span className="logo-sub">Dr. Suhrita De Roy · Lake Town · Kolkata</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <Link key={l.num} href={l.href} className="nav-link">
              <span className="num">{l.num}</span>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-status">
          <span className="status-dot" aria-hidden />
          {time && <span className="nav-time">Studio open · {time}</span>}
          <Link href="/cart" className="cart-btn">
            Cart · {cartCount}
          </Link>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="cart-btn md:hidden"
            style={{ marginLeft: 4 }}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{
            background: "var(--cream-50)",
            borderColor: "rgba(58,46,36,0.08)",
            padding: "16px 20px",
          }}
        >
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.num}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="nav-link"
                style={{ fontSize: 13 }}
              >
                <span className="num">{l.num}</span>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
