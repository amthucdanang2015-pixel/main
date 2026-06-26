"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { WorkItem } from "@/data/work";

const accentText: Record<string, string> = {
  violet: "text-accent-violet",
  blue: "text-accent-blue",
  cyan: "text-accent-cyan",
  amber: "text-accent-amber",
};

/* Typewriter that re-runs whenever `text` changes */
function Typewriter({ text, speed = 14 }: { text: string; speed?: number }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return (
    <span>
      {out}
      <span className="ml-0.5 inline-block h-4 w-[2px] -translate-y-0.5 animate-pulse bg-accent-cyan align-middle" />
    </span>
  );
}

/* macOS-style browser chrome that lazily loads a live site once on screen.
   If the site refuses to embed (frame-busting / CSP) or is slow, it falls
   back to an animated description of what Manh built + the stack. */
export function BrowserFrame({ project }: { project: WorkItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "200px" });
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const loadedRef = useRef(false);
  const url = project.url ?? "";
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
    loadedRef.current = false;
    if (!inView) return;
    // if the iframe hasn't reported load in 9s, assume it's blocked/slow
    const t = setTimeout(() => {
      if (!loadedRef.current) setFailed(true);
    }, 9000);
    return () => clearTimeout(t);
  }, [url, inView]);

  const handleLoad = () => {
    loadedRef.current = true;
    setLoaded(true);
  };

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-hairline bg-ink-100 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
    >
      {/* chrome */}
      <div className="flex items-center gap-3 border-b border-hairline bg-ink-200/60 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex w-full max-w-md items-center gap-2 rounded-md bg-ink-300/60 px-3 py-1.5">
          <span className={`h-2 w-2 rounded-full ${failed ? "bg-accent-amber" : "bg-emerald-400"}`} />
          <span className="truncate font-mono text-xs text-bone/60">{host}</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          data-cursor="open"
          className="hidden shrink-0 rounded-md border border-hairline px-2.5 py-1 text-xs text-bone/70 transition-colors hover:bg-white/5 sm:block"
        >
          Open ↗
        </a>
      </div>

      {/* viewport */}
      <div className="relative aspect-[16/10.5] w-full bg-ink">
        {!loaded && !failed && (
          <div className="absolute inset-0 z-10 grid place-items-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-bone/20 border-t-accent-violet" />
              <span className="font-mono text-xs text-bone/40">loading live site…</span>
            </div>
          </div>
        )}

        {/* animated fallback */}
        {failed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10 flex flex-col justify-center gap-4 bg-[radial-gradient(ellipse_at_top_left,rgba(124,92,255,0.12),transparent_60%)] p-6 sm:p-10"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/40">
              {project.role} · {project.year}
            </div>
            <h4 className="font-display text-2xl font-semibold text-bone sm:text-3xl">
              {project.name}
            </h4>
            <p className={`text-sm ${accentText[project.accent]}`}>{project.tagline}</p>
            <p className="max-w-lg text-sm leading-relaxed text-bone/70 sm:text-base">
              <Typewriter text={project.description} />
            </p>
            <div className="mt-1 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[11px] text-bone/55"
                >
                  {s}
                </span>
              ))}
            </div>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
            >
              Visit live site ↗
            </a>
          </motion.div>
        )}

        {inView && !failed && (
          <motion.iframe
            key={url}
            src={url}
            title={project.name}
            loading="lazy"
            onLoad={handleLoad}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            className="absolute left-0 top-0 origin-top-left"
            style={{ width: "125%", height: "125%", transform: "scale(0.8)", border: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_15%)]" />
      </div>
    </div>
  );
}
