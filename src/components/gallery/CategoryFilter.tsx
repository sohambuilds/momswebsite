"use client";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      <button
        onClick={() => onSelect("all")}
        className={`px-5 py-2 rounded-full text-sm font-sans tracking-wide transition-all duration-200 ${
          activeCategory === "all"
            ? "bg-charcoal-800 text-cream-50"
            : "bg-clay-100 text-charcoal-600 hover:bg-clay-200"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-5 py-2 rounded-full text-sm font-sans tracking-wide transition-all duration-200 ${
            activeCategory === cat
              ? "bg-charcoal-800 text-cream-50"
              : "bg-clay-100 text-charcoal-600 hover:bg-clay-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
