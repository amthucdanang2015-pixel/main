"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = ["React", "Next.js", "React Native", "Node.js", "AWS", "Solidity"];

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false); // hard bypass (no exit animation)
  const [count, setCount] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    // If the page mounts hidden (background tab) rAF is paused and the splash
    // can't animate — show the content immediately instead of trapping the user.
    if (typeof document !== "undefined" && document.visibilityState === "hidden") {
      document.body.style.overflow = "";
      setSkip(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const dur = 2200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      setWordIdx(Math.min(words.length - 1, Math.floor(eased * words.length)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    // Guaranteed dismissal — never trap the user behind the splash even if
    // requestAnimationFrame is throttled (background tab, reduced motion, etc.).
    const failsafe = setTimeout(() => {
      setCount(100);
      setDone(true);
      setSkip(true);
      document.body.style.overflow = "";
    }, dur + 1500);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
      document.body.style.overflow = "";
    };
  }, []);

  if (skip) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-110%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-ink"
          />
          <div className="relative z-10 flex flex-col items-center gap-8 px-6">
            <div className="overflow-hidden">
              <motion.div
                key={wordIdx}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-xs uppercase tracking-[0.4em] text-white/40"
              >
                {words[wordIdx]}
              </motion.div>
            </div>
            <div className="text-center">
              <div className="font-display text-[11vw] font-bold leading-none tracking-tightest text-white sm:text-7xl">
                MANH NGUYEN CONG
              </div>
            </div>
          </div>
          <motion.div className="absolute bottom-10 right-8 z-10 font-display text-6xl font-bold tabular-nums text-white/90 sm:text-8xl">
            {count}
            <span className="text-accent-violet">%</span>
          </motion.div>
          <div className="absolute bottom-0 left-0 h-px w-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-violet via-accent-blue to-accent-cyan"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
