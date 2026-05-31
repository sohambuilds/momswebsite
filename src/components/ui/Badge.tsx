interface BadgeProps {
  variant: "sold" | "oneOfAKind" | "featured" | "new";
  children: React.ReactNode;
}

const badgeStyles = {
  sold: "bg-charcoal-800 text-cream-50",
  oneOfAKind: "bg-terracotta-100 text-terracotta-700 border border-terracotta-200",
  featured: "bg-sage-100 text-sage-700 border border-sage-200",
  new: "bg-clay-100 text-clay-700 border border-clay-200",
};

export default function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-sans
        font-medium tracking-wide uppercase ${badgeStyles[variant]}
      `}
    >
      {children}
    </span>
  );
}
