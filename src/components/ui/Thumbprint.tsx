/**
 * Concentric-ring SVG thumbprint signature.
 * Sits in the bottom-right corner of the hero clay tablet.
 * Initials are configurable; default to Suhrita De Roy ("S · DR").
 */
export default function Thumbprint({ initials = "S · DE ROY" }: { initials?: string }) {
  return (
    <div className="thumbprint" title="Suhrita's signature thumbprint">
      <svg viewBox="0 0 100 100" aria-hidden>
        {Array.from({ length: 7 }).map((_, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="50"
            rx={12 + i * 5}
            ry={16 + i * 5}
            fill="none"
            stroke="rgba(255,235,200,0.3)"
            strokeWidth="0.6"
            transform={`rotate(${i * 4} 50 50)`}
          />
        ))}
        <text
          x="50"
          y="92"
          textAnchor="middle"
          style={{
            fontFamily: "var(--mono)",
            fontSize: "5px",
            letterSpacing: "0.15em",
            fill: "rgba(255,235,200,0.5)",
          }}
        >
          {initials}
        </text>
      </svg>
    </div>
  );
}
