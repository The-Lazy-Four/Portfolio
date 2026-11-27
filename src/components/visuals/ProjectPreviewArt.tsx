import type { ProjectVisualTheme } from "@/data/projects";

interface ProjectPreviewArtProps {
  theme: ProjectVisualTheme;
  label: string;
  aspectClass?: string;
}

/** Renders distinct Neo-Brutalist architectural compositions for each demo case study theme. */
export function ProjectPreviewArt({
  theme,
  label,
  aspectClass = "aspect-[16/10]",
}: ProjectPreviewArtProps) {
  return (
    <div
      className={`relative w-full overflow-hidden border-2 border-ink ${aspectClass}`}
      role="img"
      aria-label={`${label} conceptual preview`}
    >
      {theme === "hospitality" && (
        <svg viewBox="0 0 640 400" fill="none" className="h-full w-full bg-[#3155F5]" aria-hidden="true">
          <line x1="0" y1="68" x2="640" y2="68" stroke="#F5F0E6" strokeOpacity="0.25" strokeWidth="1.5" />
          <line x1="400" y1="0" x2="400" y2="400" stroke="#F5F0E6" strokeOpacity="0.25" strokeWidth="1.5" />
          {/* Restaurant mobile storefront spread with hard ink offset shadow */}
          <rect x="54" y="94" width="320" height="264" fill="#151515" />
          <rect x="46" y="86" width="320" height="264" fill="#F5F0E6" stroke="#151515" strokeWidth="3" />
          <rect x="74" y="116" width="110" height="10" fill="#F0522B" />
          <rect x="74" y="138" width="220" height="20" fill="#151515" />
          <rect x="74" y="170" width="250" height="8" fill="#151515" fillOpacity="0.3" />
          <rect x="74" y="186" width="190" height="8" fill="#151515" fillOpacity="0.2" />
          <rect x="74" y="216" width="126" height="32" fill="#E9FF45" stroke="#151515" strokeWidth="2.5" />
          <rect x="74" y="272" width="124" height="54" fill="#D6D1C6" stroke="#151515" strokeWidth="2" />
          <rect x="210" y="272" width="124" height="54" fill="#D6D1C6" stroke="#151515" strokeWidth="2" />
          {/* Map pin & NFC counter block */}
          <rect x="424" y="86" width="168" height="122" fill="#E9FF45" stroke="#151515" strokeWidth="3" />
          <rect x="480" y="120" width="56" height="56" stroke="#151515" strokeWidth="2" strokeDasharray="4 4" />
          <rect x="496" y="136" width="24" height="24" fill="#F0522B" stroke="#151515" strokeWidth="2" />
          <rect x="424" y="228" width="168" height="124" fill="#151515" stroke="#F5F0E6" strokeWidth="2.5" />
          <rect x="444" y="250" width="76" height="9" fill="#E9FF45" />
          <rect x="526" y="286" width="44" height="44" fill="#F5F0E6" />
          <rect x="534" y="294" width="12" height="12" fill="#151515" />
          <rect x="550" y="310" width="12" height="12" fill="#F0522B" />
        </svg>
      )}

      {theme === "retail" && (
        <svg viewBox="0 0 640 400" fill="none" className="h-full w-full bg-[#D6D1C6]" aria-hidden="true">
          <rect x="44" y="64" width="174" height="274" fill="#F5F0E6" stroke="#151515" strokeWidth="3" />
          <rect x="60" y="82" width="142" height="148" fill="#3155F5" stroke="#151515" strokeWidth="2" />
          <rect x="96" y="120" width="70" height="70" fill="#E9FF45" stroke="#151515" strokeWidth="2.5" />
          <rect x="60" y="248" width="104" height="10" fill="#151515" />
          <rect x="60" y="268" width="72" height="7" fill="#151515" fillOpacity="0.4" />
          <rect x="60" y="294" width="142" height="26" fill="#151515" />

          <rect x="236" y="42" width="174" height="296" fill="#151515" stroke="#151515" strokeWidth="3" />
          <rect x="252" y="60" width="142" height="164" fill="#E9FF45" stroke="#F5F0E6" strokeWidth="2" />
          <rect x="252" y="242" width="110" height="10" fill="#F5F0E6" />
          <rect x="252" y="262" width="84" height="7" fill="#F5F0E6" fillOpacity="0.55" />
          <rect x="252" y="288" width="142" height="28" fill="#F0522B" />

          <rect x="428" y="86" width="168" height="252" fill="#F5F0E6" stroke="#151515" strokeWidth="3" />
          <rect x="444" y="104" width="136" height="122" fill="#D6D1C6" stroke="#151515" strokeWidth="2" />
          <rect x="444" y="244" width="96" height="10" fill="#151515" />
          <rect x="444" y="264" width="120" height="7" fill="#151515" fillOpacity="0.4" />
          <rect x="444" y="290" width="104" height="24" fill="#3155F5" />
        </svg>
      )}

      {theme === "services" && (
        <svg viewBox="0 0 640 400" fill="none" className="h-full w-full bg-[#151515]" aria-hidden="true">
          <line x1="320" y1="0" x2="320" y2="400" stroke="#F5F0E6" strokeOpacity="0.22" strokeWidth="2" />
          <rect x="48" y="76" width="236" height="20" fill="#E9FF45" />
          <rect x="48" y="108" width="190" height="18" fill="#F0522B" />
          <rect x="48" y="146" width="218" height="7" fill="#F5F0E6" fillOpacity="0.55" />
          <rect x="48" y="162" width="180" height="7" fill="#F5F0E6" fillOpacity="0.35" />
          <rect x="48" y="196" width="120" height="32" fill="#3155F5" stroke="#F5F0E6" strokeWidth="2" />
          <rect x="48" y="256" width="236" height="84" fill="#232323" stroke="#E9FF45" strokeWidth="2" />

          <rect x="356" y="76" width="236" height="264" fill="#F5F0E6" stroke="#E9FF45" strokeWidth="3" />
          <rect x="382" y="106" width="94" height="10" fill="#F0522B" />
          <rect x="382" y="130" width="184" height="10" fill="#151515" />
          <rect x="382" y="156" width="184" height="34" fill="#D6D1C6" stroke="#151515" strokeWidth="2" />
          <rect x="382" y="202" width="184" height="34" fill="#D6D1C6" stroke="#151515" strokeWidth="2" />
          <rect x="382" y="248" width="184" height="34" fill="#E9FF45" stroke="#151515" strokeWidth="2" />
          <rect x="382" y="294" width="110" height="26" fill="#3155F5" />
        </svg>
      )}

      {theme === "workflow" && (
        <svg viewBox="0 0 640 400" fill="none" className="h-full w-full bg-[#E9FF45]" aria-hidden="true">
          <rect x="52" y="70" width="388" height="276" fill="#151515" />
          <rect x="44" y="62" width="388" height="276" fill="#3155F5" stroke="#151515" strokeWidth="3" />
          <rect x="68" y="88" width="136" height="12" fill="#E9FF45" />
          <rect x="68" y="118" width="104" height="190" fill="#151515" stroke="#F5F0E6" strokeWidth="1.5" />
          <rect x="186" y="118" width="104" height="190" fill="#151515" stroke="#F5F0E6" strokeWidth="1.5" />
          <rect x="304" y="118" width="104" height="190" fill="#151515" stroke="#F5F0E6" strokeWidth="1.5" />
          <rect x="80" y="134" width="80" height="44" fill="#F5F0E6" />
          <rect x="80" y="188" width="80" height="44" fill="#D6D1C6" />
          <rect x="198" y="134" width="80" height="44" fill="#F0522B" />
          <rect x="316" y="134" width="80" height="44" fill="#E9FF45" />

          <rect x="462" y="104" width="140" height="240" fill="#151515" />
          <rect x="456" y="98" width="140" height="240" fill="#F5F0E6" stroke="#151515" strokeWidth="3" />
          <rect x="504" y="124" width="44" height="44" fill="#F0522B" stroke="#151515" strokeWidth="2" />
          <rect x="480" y="186" width="92" height="10" fill="#151515" />
          <rect x="480" y="206" width="70" height="7" fill="#151515" fillOpacity="0.4" />
          <rect x="480" y="236" width="92" height="74" fill="#D6D1C6" stroke="#151515" strokeWidth="2" />
        </svg>
      )}

      {/* Neo-Brutalist crisp concept label */}
      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 border-2 border-ink bg-acid px-3 py-1 font-mono text-[10px] font-extrabold tracking-[0.08em] text-ink uppercase shadow-[2px_2px_0px_#151515]">
        <span className="h-2 w-2 bg-orange" />
        Demo Concept Preview
      </span>
    </div>
  );
}
