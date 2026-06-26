"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { stats } from "@/data/content";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative border-y border-hairline">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="group relative px-5 py-10 transition-colors hover:bg-white/[0.02] sm:px-7 sm:py-14"
          >
            <div className="font-display text-5xl font-bold text-gradient sm:text-6xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-3 text-sm leading-snug text-bone/55">{s.label}</div>
            <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-accent-violet to-accent-cyan transition-all duration-500 group-hover:w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
