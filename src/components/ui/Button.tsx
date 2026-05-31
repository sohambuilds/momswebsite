import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const variants = {
  primary:
    "bg-terracotta-500 text-white hover:bg-terracotta-600 active:bg-terracotta-700 shadow-sm",
  secondary:
    "bg-charcoal-800 text-cream-50 hover:bg-charcoal-700 active:bg-charcoal-900",
  outline:
    "border-2 border-charcoal-800 text-charcoal-800 hover:bg-charcoal-800 hover:text-cream-50",
  ghost:
    "text-charcoal-600 hover:text-charcoal-800 hover:bg-clay-100",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-sans font-medium tracking-wide
        rounded-full transition-all duration-200 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
