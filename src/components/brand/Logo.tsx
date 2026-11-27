import Link from "next/link";

interface LogoProps {
  inverted?: boolean;
  size?: "sm" | "md" | "lg";
}

/** Renders the Web Guru Neo-Brutalist square aperture mark and high-contrast studio wordmark. */
export function Logo({ inverted = false, size = "md" }: LogoProps) {
  const markSizes = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-11 w-11",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <Link
      href="/"
      aria-label="Web Guru Home"
      className="group inline-flex items-center gap-3 focus-visible:outline-acid"
    >
      {/* Sharp Neo-Brutalist monogram block with Signal Orange dot */}
      <svg
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        className={`${markSizes[size]} shrink-0 border-2 ${
          inverted
            ? "border-acid bg-cobalt shadow-[3px_3px_0px_#E9FF45]"
            : "border-ink bg-ink shadow-[3px_3px_0px_#3155F5]"
        } transition-transform duration-150 group-hover:translate-x-0.5 group-hover:translate-y-0.5`}
      >
        <path
          d="M7.5 11.5L12 24.5L16.5 14L21 24.5L25.5 11.5"
          stroke="#F5F0E6"
          strokeWidth="2.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <rect x="26" y="21" width="5.5" height="5.5" fill="#E9FF45" />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-extrabold tracking-[-0.03em] uppercase ${textSizes[size]} ${
            inverted ? "text-ivory" : "text-ink"
          }`}
        >
          Web Guru
          <span className={inverted ? "text-acid" : "text-orange"}>.</span>
        </span>
        <span
          className={`mt-0.5 font-mono text-[10px] font-medium tracking-[0.14em] uppercase ${
            inverted ? "text-acid/85" : "text-ink/70"
          }`}
        >
          Digital Studio
        </span>
      </span>
    </Link>
  );
}
