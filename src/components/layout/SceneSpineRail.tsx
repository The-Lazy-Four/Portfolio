"use client";

import { usePathname } from "next/navigation";
import {
  HOMEPAGE_SCENES,
  useCinemaEngine,
} from "@/components/motion/CinemaEngineProvider";

/** Renders a stark Neo-Brutalist vertical chapter rail indexing all 7 homepage scenes while preserving scroll synchronization. */
export function SceneSpineRail() {
  const pathname = usePathname();
  const { activeSceneIndex, scrollProgress, scrollToTarget } =
    useCinemaEngine();

  if (pathname !== "/") {
    return null;
  }

  const currentScene = HOMEPAGE_SCENES[activeSceneIndex] || HOMEPAGE_SCENES[0];

  return (
    <aside
      aria-label="Scene navigation index"
      className="pointer-events-none fixed top-18 bottom-0 left-0 z-30 hidden w-12 flex-col items-center justify-between border-r-2 border-ink bg-ivory py-6 xl:flex"
    >
      {/* Rotated active scene counter badge */}
      <span className="pointer-events-auto rotate-180 bg-ink px-1 py-2 font-mono text-[10px] font-bold tracking-[0.18em] text-acid uppercase [writing-mode:vertical-rl]">
        WG / {currentScene.number}
      </span>

      {/* Interactive rectangular chapter ticks */}
      <nav
        aria-label="Quick scene jump"
        className="pointer-events-auto flex flex-col items-center gap-2"
      >
        {HOMEPAGE_SCENES.map((scene, index) => {
          const active = index === activeSceneIndex;
          return (
            <button
              key={scene.targetId}
              type="button"
              onClick={() => scrollToTarget(`#${scene.targetId}`)}
              title={`Scene ${scene.number} — ${scene.title}`}
              aria-label={`Jump to Scene ${scene.number}: ${scene.title}`}
              className="group flex h-5 w-7 items-center justify-center"
            >
              <span
                className={`block border border-ink transition-all duration-150 ${
                  active
                    ? "h-4 w-2.5 bg-cobalt shadow-[2px_2px_0px_#151515]"
                    : "h-2 w-2 bg-concrete group-hover:bg-acid"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Hard-edged vertical progress meter */}
      <div className="flex flex-col items-center gap-2">
        <div className="h-16 w-2 border border-ink bg-concrete p-0.5">
          <div
            className="w-full bg-orange transition-transform duration-150"
            style={{
              height: "100%",
              transformOrigin: "top center",
              transform: `scaleY(${Math.max(0.08, scrollProgress)})`,
            }}
          />
        </div>
        <span className="font-mono text-[10px] font-bold text-ink">
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>
    </aside>
  );
}
