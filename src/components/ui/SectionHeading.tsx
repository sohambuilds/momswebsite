interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-2xl ${
        align === "center" ? "mx-auto text-center" : ""
      } mb-12 md:mb-16`}
    >
      {eyebrow && (
        <p className="text-xs tracking-[0.25em] uppercase text-terracotta-500 font-sans font-medium mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="heading-lg text-charcoal-800">{title}</h2>
      {description && (
        <p className="body-lg mt-4 text-balance">{description}</p>
      )}
    </div>
  );
}
