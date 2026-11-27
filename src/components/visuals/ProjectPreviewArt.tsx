import type { ProjectVisualTheme } from "@/data/projects";

interface ProjectPreviewArtProps {
  theme: ProjectVisualTheme;
  label: string;
  aspectClass?: string;
}

/** Renders distinct bespoke UI and architectural compositions for each demo case study theme. */
export function ProjectPreviewArt({
  theme,
  label,
  aspectClass = "aspect-[16/10]",
}: ProjectPreviewArtProps) {
  return (
    <div
      className={`relative w-full overflow-hidden border border-rule ${aspectClass}`}
      role="img"
      aria-label={`${label} conceptual preview`}
    >
      {theme === "hospitality" && (
        <svg viewBox="0 0 640 400" fill="none" className="h-full w-full bg-[#18362F]" aria-hidden="true">
          {/* Warm architectural grid */}
          <line x1="0" y1="68" x2="640" y2="68" stroke="#F6F3EC" strokeOpacity="0.14" />
          <line x1="400" y1="0" x2="400" y2="400" stroke="#F6F3EC" strokeOpacity="0.14" />
          {/* Restaurant mobile storefront spread */}
          <rect x="48" y="88" width="320" height="264" rx="10" fill="#F6F3EC" />
          <rect x="74" y="116" width="110" height="8" rx="4" fill="#D94E28" />
          <rect x="74" y="138" width="220" height="18" rx="4" fill="#161A18" />
          <rect x="74" y="168" width="250" height="8" rx="4" fill="#535A55" fillOpacity="0.35" />
          <rect x="74" y="184" width="190" height="8" rx="4" fill="#535A55" fillOpacity="0.25" />
          <rect x="74" y="216" width="126" height="32" rx="16" fill="#161A18" />
          <rect x="74" y="272" width="124" height="54" rx="6" fill="#ECE7DC" />
          <rect x="210" y="272" width="124" height="54" rx="6" fill="#ECE7DC" />
          {/* Local Map Pin + NFC Counter Card */}
          <rect x="424" y="88" width="168" height="122" rx="10" fill="#22473E" stroke="#F6F3EC" strokeOpacity="0.2" />
          <circle cx="508" cy="144" r="30" stroke="#D94E28" strokeOpacity="0.5" strokeDasharray="3 3" />
          <circle cx="508" cy="144" r="12" fill="#D94E28" />
          <rect x="424" y="228" width="168" height="124" rx="10" fill="#161A18" />
          <rect x="444" y="250" width="76" height="8" rx="4" fill="#F6F3EC" />
          <rect x="526" y="286" width="44" height="44" rx="4" fill="#F6F3EC" />
          <rect x="534" y="294" width="12" height="12" fill="#161A18" />
          <rect x="550" y="310" width="12" height="12" fill="#D94E28" />
        </svg>
      )}

      {theme === "retail" && (
        <svg viewBox="0 0 640 400" fill="none" className="h-full w-full bg-[#ECE7DC]" aria-hidden="true">
          {/* Staggered editorial catalog cards */}
          <rect x="44" y="64" width="174" height="274" rx="8" fill="#FFFFFF" stroke="#D6CFC2" />
          <rect x="60" y="82" width="142" height="148" rx="6" fill="#18362F" />
          <circle cx="131" cy="156" r="36" fill="#D94E28" />
          <rect x="60" y="248" width="104" height="10" rx="3" fill="#161A18" />
          <rect x="60" y="268" width="72" height="7" rx="3" fill="#535A55" fillOpacity="0.4" />
          <rect x="60" y="294" width="142" height="26" rx="13" fill="#161A18" />

          <rect x="236" y="42" width="174" height="296" rx="8" fill="#161A18" />
          <rect x="252" y="60" width="142" height="164" rx="6" fill="#2A2F2C" />
          <rect x="252" y="242" width="110" height="10" rx="3" fill="#F6F3EC" />
          <rect x="252" y="262" width="84" height="7" rx="3" fill="#F6F3EC" fillOpacity="0.45" />
          <rect x="252" y="288" width="142" height="28" rx="14" fill="#D94E28" />

          <rect x="428" y="86" width="168" height="252" rx="8" fill="#FFFFFF" stroke="#D6CFC2" />
          <rect x="444" y="104" width="136" height="122" rx="6" fill="#F6F3EC" />
          <rect x="444" y="244" width="96" height="10" rx="3" fill="#161A18" />
          <rect x="444" y="264" width="120" height="7" rx="3" fill="#535A55" fillOpacity="0.4" />
          <rect x="444" y="290" width="104" height="24" rx="12" fill="#ECE7DC" />
        </svg>
      )}

      {theme === "services" && (
        <svg viewBox="0 0 640 400" fill="none" className="h-full w-full bg-[#161A18]" aria-hidden="true">
          {/* Editorial consulting split layout */}
          <line x1="320" y1="0" x2="320" y2="400" stroke="#F6F3EC" strokeOpacity="0.12" />
          <rect x="48" y="76" width="236" height="18" rx="4" fill="#F6F3EC" />
          <rect x="48" y="106" width="190" height="18" rx="4" fill="#D94E28" />
          <rect x="48" y="144" width="218" height="7" rx="3" fill="#F6F3EC" fillOpacity="0.45" />
          <rect x="48" y="160" width="180" height="7" rx="3" fill="#F6F3EC" fillOpacity="0.3" />
          <rect x="48" y="196" width="120" height="32" rx="16" fill="#F6F3EC" />
          <rect x="48" y="256" width="236" height="84" rx="8" fill="#232825" />

          <rect x="356" y="76" width="236" height="264" rx="10" fill="#F6F3EC" />
          <rect x="382" y="106" width="94" height="8" rx="4" fill="#D94E28" />
          <rect x="382" y="130" width="184" height="10" rx="4" fill="#161A18" />
          <rect x="382" y="156" width="184" height="34" rx="4" fill="#ECE7DC" />
          <rect x="382" y="202" width="184" height="34" rx="4" fill="#ECE7DC" />
          <rect x="382" y="248" width="184" height="34" rx="4" fill="#ECE7DC" />
          <rect x="382" y="294" width="110" height="26" rx="13" fill="#18362F" />
        </svg>
      )}

      {theme === "workflow" && (
        <svg viewBox="0 0 640 400" fill="none" className="h-full w-full bg-[#E3DDD0]" aria-hidden="true">
          {/* Operations workflow dashboard + mobile companion */}
          <rect x="44" y="62" width="388" height="276" rx="10" fill="#18362F" />
          <rect x="68" y="88" width="136" height="10" rx="4" fill="#F6F3EC" />
          <rect x="68" y="118" width="104" height="190" rx="6" fill="#22473E" />
          <rect x="186" y="118" width="104" height="190" rx="6" fill="#22473E" />
          <rect x="304" y="118" width="104" height="190" rx="6" fill="#22473E" />
          <rect x="80" y="134" width="80" height="44" rx="4" fill="#F6F3EC" />
          <rect x="80" y="188" width="80" height="44" rx="4" fill="#F6F3EC" fillOpacity="0.85" />
          <rect x="198" y="134" width="80" height="44" rx="4" fill="#D94E28" />
          <rect x="316" y="134" width="80" height="44" rx="4" fill="#F6F3EC" />

          <rect x="456" y="98" width="140" height="240" rx="14" fill="#FFFFFF" stroke="#161A18" strokeOpacity="0.2" />
          <circle cx="526" cy="146" r="22" fill="#D94E28" />
          <rect x="480" y="186" width="92" height="10" rx="3" fill="#161A18" />
          <rect x="480" y="206" width="70" height="7" rx="3" fill="#535A55" fillOpacity="0.4" />
          <rect x="480" y="236" width="92" height="74" rx="6" fill="#ECE7DC" />
        </svg>
      )}

      {/* Clear demo disclosure watermark */}
      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-rule bg-paper/95 px-3 py-1 font-mono text-[10px] font-medium tracking-[0.06em] text-ink uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Demo Concept Preview
      </span>
    </div>
  );
}
