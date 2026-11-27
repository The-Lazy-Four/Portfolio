import Link from "next/link";

interface LogoProps {
  inverted?: boolean;
  size?: "sm" | "md" | "lg";
}

/** Renders the Web Guru emblem and wordmark styled for the dark purple LiquidEther identity. */
export function Logo({ inverted = true, size = "md" }: LogoProps) {
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
      data-inverted={inverted}
      className="group inline-flex items-center gap-3 focus-visible:outline-[#A78BFA]"
    >
      {/* Clean dark-purple rounded W mark with pink-lavender accent */}
      <svg
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        className={`${markSizes[size]} shrink-0 rounded-lg border border-white/15 bg-[#171027] transition-transform duration-150 group-hover:scale-105`}
      >
        <path
          d="M7.5 11.5L12 24.5L16.5 14L21 24.5L25.5 11.5"
          stroke="#F5F1FA"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="28.5" cy="23.5" r="2.5" fill="#FF9FFC" />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-semibold tracking-[-0.02em] ${textSizes[size]} text-[#F5F1FA]`}
        >
          Web Guru
          <span className="text-[#FF9FFC]">.</span>
        </span>
        <span className="mt-0.5 font-sans text-[10px] font-medium tracking-[0.08em] text-[#91869F]">
          Digital Studio
        </span>
      </span>
    </Link>
  );
}
