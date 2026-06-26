"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { WorkItem } from "@/data/work";

const wash: Record<string, string> = {
  violet: "radial-gradient(ellipse at top left, rgba(124,92,255,0.16), transparent 60%)",
  blue: "radial-gradient(ellipse at top left, rgba(59,130,246,0.16), transparent 60%)",
  cyan: "radial-gradient(ellipse at top left, rgba(34,211,238,0.16), transparent 60%)",
  amber: "radial-gradient(ellipse at top left, rgba(245,181,68,0.16), transparent 60%)",
};
const accentText: Record<string, string> = {
  violet: "text-accent-violet",
  blue: "text-accent-blue",
  cyan: "text-accent-cyan",
  amber: "text-accent-amber",
};

function Typewriter({ text, runKey }: { text: string; runKey: string }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 12);
    return () => clearInterval(id);
  }, [text, runKey]);
  const done = out.length >= text.length;
  return (
    <span>
      {out}
      {!done && <span className="ml-0.5 inline-block h-4 w-[2px] -translate-y-0.5 animate-pulse bg-accent-cyan align-middle" />}
    </span>
  );
}

/* Animated, "impressive to read" detail view for items with no live embed. */
export function WorkInfo({ item }: { item: WorkItem }) {
  return (
    <div className="relative flex min-h-[460px] flex-col justify-center overflow-hidden rounded-xl border border-hairline bg-ink-100 p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] sm:min-h-[520px] sm:p-10">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: wash[item.accent] }} />
      {/* drifting accent orb */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-50 blur-3xl"
        style={{ background: wash[item.accent] }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* large watermark initial */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-3 select-none font-display text-[12rem] font-bold leading-none text-white/[0.03]"
      >
        {item.name[0]}
      </span>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-4">
              {item.icon ? (
                <img src={item.icon} alt="" className="h-14 w-14 rounded-2xl ring-1 ring-white/10" />
              ) : (
                <span className={`grid h-14 w-14 place-items-center rounded-2xl border border-hairline font-display text-xl font-bold ${accentText[item.accent]}`}>
                  {item.name[0]}
                </span>
              )}
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/40">
                  {item.role} · {item.year}
                </div>
                <h3 className="font-display text-2xl font-semibold text-bone sm:text-3xl">{item.name}</h3>
              </div>
            </div>

            <p className={`mt-6 font-display text-lg font-medium ${accentText[item.accent]}`}>{item.tagline}</p>

            <p className="mt-3 max-w-xl text-base leading-relaxed text-bone/75">
              <Typewriter text={item.description} runKey={item.id} />
            </p>

            {item.highlight && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-6 flex items-center gap-3 rounded-xl border border-hairline bg-white/[0.03] px-4 py-3"
              >
                <span className={`h-8 w-1 rounded-full ${item.accent === "violet" ? "bg-accent-violet" : item.accent === "blue" ? "bg-accent-blue" : item.accent === "cyan" ? "bg-accent-cyan" : "bg-accent-amber"}`} />
                <span className="text-sm font-medium text-bone/85">{item.highlight}</span>
              </motion.div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {item.stack.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.07 }}
                  className="rounded-full border border-hairline bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] text-bone/70"
                >
                  {s}
                </motion.span>
              ))}
            </div>

            {item.url && (
              <motion.a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                data-cursor="open"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + item.stack.length * 0.07 + 0.1 }}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
              >
                {item.urlLabel === "App Store" ? " View on App Store ↗" : `Visit ${item.urlLabel} ↗`}
              </motion.a>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
