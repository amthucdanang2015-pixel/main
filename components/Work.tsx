"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { workGroups, type WorkItem } from "@/data/work";
import { BrowserFrame } from "./BrowserFrame";
import { WorkGallery } from "./WorkGallery";
import { WorkInfo } from "./WorkInfo";
import { Reveal, RevealText, SectionLabel } from "./primitives";

const dot: Record<string, string> = {
  violet: "bg-accent-violet",
  blue: "bg-accent-blue",
  cyan: "bg-accent-cyan",
  amber: "bg-accent-amber",
};
const accentText: Record<string, string> = {
  violet: "text-accent-violet",
  blue: "text-accent-blue",
  cyan: "text-accent-cyan",
  amber: "text-accent-amber",
};
const modeTag: Record<string, string> = { live: "Live", gallery: "Gallery", info: "Story" };

export default function Work() {
  const allItems = useMemo(() => workGroups.flatMap((g) => g.items), []);
  const [activeId, setActiveId] = useState(allItems[0].id);
  const active = allItems.find((i) => i.id === activeId) ?? allItems[0];

  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const activeRef = useRef(activeId);
  const lockUntil = useRef(0);
  const commitTimer = useRef<ReturnType<typeof setTimeout>>();
  activeRef.current = activeId;

  // Scroll-sync (desktop): the item nearest a trigger line becomes active, so
  // the sticky panel tracks where you are. A short lock after a click lets
  // manual selection win briefly. Mobile uses tap only.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    const onScroll = () => {
      if (!mq.matches || Date.now() < lockUntil.current) return;
      const sec = sectionRef.current;
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return; // section off-screen
      const line = window.innerHeight * 0.32;
      let best: string | null = null;
      let bestDist = Infinity;
      for (const item of allItems) {
        const el = itemRefs.current[item.id];
        if (!el) continue;
        const b = el.getBoundingClientRect();
        const d = Math.abs(b.top + b.height / 2 - line);
        if (d < bestDist) {
          bestDist = d;
          best = item.id;
        }
      }
      // Debounced commit: only switch once scrolling settles near an item, so
      // fast scrolling doesn't queue transitions or thrash the live iframes.
      if (best && best !== activeRef.current) {
        const target = best;
        clearTimeout(commitTimer.current);
        commitTimer.current = setTimeout(() => {
          if (Date.now() >= lockUntil.current) setActiveId(target);
        }, 130);
      }
    };
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(onScroll);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(commitTimer.current);
      window.removeEventListener("scroll", handler);
    };
  }, [allItems]);

  const select = (id: string) => {
    lockUntil.current = Date.now() + 900;
    setActiveId(id);
  };

  return (
    <section id="work" ref={sectionRef} className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionLabel index="02">Work</SectionLabel>
      <RevealText
        as="h2"
        text="Everything I've shipped, in one place."
        className="max-w-3xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-bone sm:text-4xl md:text-5xl"
      />
      <Reveal delay={0.1}>
        <p className="mt-5 max-w-2xl text-bone/55">
          Live web platforms, App Store apps and earlier products. Pick one — or scroll the list — and
          the panel loads the real site, plays its screenshots, or tells the story.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        {/* ── left: project menu ── */}
        <div className="order-2 flex flex-col gap-7 lg:order-1">
          {workGroups.map((group) => (
            <div key={group.label}>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-bone/45">
                {group.label}
              </div>
              <div className="flex flex-wrap gap-2 lg:flex-col">
                {group.items.map((item) => {
                  const on = item.id === activeId;
                  return (
                    <button
                      key={item.id}
                      ref={(el) => {
                        itemRefs.current[item.id] = el;
                      }}
                      onClick={() => select(item.id)}
                      data-cursor="view"
                      aria-pressed={on}
                      className={`group relative flex items-center gap-2.5 overflow-hidden rounded-xl border px-3.5 py-2.5 text-left transition-all duration-300 lg:w-full ${
                        on
                          ? "border-bone/20 bg-white/[0.06]"
                          : "border-hairline bg-white/[0.01] hover:bg-white/[0.035]"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot[item.accent]}`} />
                      <span className={`text-sm ${on ? "text-bone" : "text-bone/65"}`}>{item.name}</span>
                      <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-wider text-bone/30 lg:inline">
                        {modeTag[item.mode]}
                      </span>
                      {on && (
                        <motion.span
                          layoutId="work-rail"
                          className="absolute left-0 top-0 hidden h-full w-1 bg-gradient-to-b from-accent-violet to-accent-cyan lg:block"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── right: adaptive detail view (sticky on desktop) ── */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4 }}
            >
              {active.mode === "live" && <LiveView item={active} />}
              {active.mode === "gallery" && <WorkGallery item={active} />}
              {active.mode === "info" && <WorkInfo item={active} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* Live mode = browser frame + a compact context strip beneath it. */
function LiveView({ item }: { item: WorkItem }) {
  return (
    <div>
      <BrowserFrame project={item} />
      <div className="mt-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-xl font-semibold text-bone">{item.name}</h3>
          <span className="font-mono text-[11px] uppercase tracking-wider text-bone/40">
            {item.role} · {item.year}
          </span>
        </div>
        <p className={`mt-1 text-sm ${accentText[item.accent]}`}>{item.tagline}</p>
        <p className="mt-2 text-sm leading-relaxed text-bone/60">{item.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {item.stack.map((s) => (
            <span key={s} className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[11px] text-bone/55">
              {s}
            </span>
          ))}
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="ml-auto font-mono text-xs text-accent-cyan hover:underline"
            >
              Open in new tab ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
