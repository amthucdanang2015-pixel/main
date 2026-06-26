"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { WorkItem } from "@/data/work";

const glow: Record<string, string> = {
  violet: "0 30px 80px -20px rgba(124,92,255,0.55)",
  blue: "0 30px 80px -20px rgba(59,130,246,0.55)",
  cyan: "0 30px 80px -20px rgba(34,211,238,0.55)",
  amber: "0 30px 80px -20px rgba(245,181,68,0.55)",
};

/* 3D coverflow of a single app's real App Store screenshots, auto-advancing. */
export function WorkGallery({ item }: { item: WorkItem }) {
  const shots = item.shots ?? [];
  const n = shots.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((d: number) => setActive((a) => (a + d + n) % n), [n]);

  useEffect(() => setActive(0), [item.id]);

  useEffect(() => {
    if (paused || n < 2) return;
    const t = setInterval(() => setActive((a) => (a + 1) % n), 3000);
    return () => clearInterval(t);
  }, [paused, n, item.id]);

  return (
    <div
      className="rounded-xl border border-hairline bg-ink-100 p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] sm:p-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-2 flex items-center gap-3">
        {item.icon && <img src={item.icon} alt="" className="h-9 w-9 rounded-xl ring-1 ring-white/10" />}
        <div>
          <div className="font-display text-sm font-semibold text-bone">{item.name}</div>
          <div className="font-mono text-[11px] text-bone/40">{n} screens · auto-playing</div>
        </div>
      </div>

      <div
        className="relative flex h-[420px] items-center justify-center sm:h-[480px]"
        style={{ perspective: "1500px" }}
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(124,92,255,0.14),transparent_70%)] blur-2xl" />
        {shots.map((src, i) => {
          let o = i - active;
          if (o > n / 2) o -= n;
          if (o < -n / 2) o += n;
          const abs = Math.abs(o);
          const visible = abs <= 2;
          const center = o === 0;
          return (
            <motion.div
              key={src}
              className="absolute will-change-transform"
              animate={{
                x: `${o * 52}%`,
                rotateY: center ? 0 : o > 0 ? -40 : 40,
                scale: center ? 1 : 0.8 - (abs - 1) * 0.08,
                opacity: visible ? (center ? 1 : 0.4) : 0,
                filter: center ? "brightness(1)" : "brightness(0.55)",
              }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              style={{ zIndex: 50 - abs, transformStyle: "preserve-3d", pointerEvents: visible ? "auto" : "none" }}
              onClick={() => !center && setActive(i)}
            >
              <div
                className="relative aspect-[9/19.5] w-[168px] overflow-hidden rounded-[1.9rem] bg-gradient-to-b from-ink-300 to-ink-100 p-[3px] sm:w-[200px]"
                style={{ boxShadow: center ? glow[item.accent] : "0 18px 45px -25px rgba(0,0,0,0.8)" }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[1.7rem] bg-ink ring-1 ring-white/10">
                  <div className="absolute left-1/2 top-2 z-20 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
                  <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-bone/70 transition-colors hover:bg-white/5"
        >
          ←
        </button>
        <div className="flex items-center gap-1.5">
          {shots.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Screen ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-bone" : "w-1.5 bg-bone/25 hover:bg-bone/50"}`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-bone/70 transition-colors hover:bg-white/5"
        >
          →
        </button>
      </div>
    </div>
  );
}
