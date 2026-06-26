"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { profile } from "@/data/content";

const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={`flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled
              ? "glass shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
              : "border border-transparent"
          }`}
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            data-cursor="top"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-accent-violet to-accent-cyan text-white shadow-lg">
              <span className="flex flex-col items-center leading-none">
                <span className="text-[11px] font-extrabold">M</span>
                <span className="text-[7px] font-bold tracking-tight">NC</span>
              </span>
            </span>
            <span className="font-display text-sm font-semibold tracking-tight text-bone">
              {profile.shortName} Nguyen Cong
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full px-3.5 py-1.5 text-sm text-bone/60 transition-colors hover:text-bone"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.cv}
              download
              data-cursor="get cv"
              className="hidden rounded-full bg-bone px-4 py-2 text-sm font-medium text-ink transition-transform hover:scale-[1.03] sm:inline-block"
            >
              Download CV
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-bone md:hidden"
            >
              <div className="flex flex-col gap-1">
                <span className="h-px w-4 bg-bone" />
                <span className="h-px w-4 bg-bone" />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            {sections.map((s, i) => (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                className="font-display text-3xl font-semibold text-bone"
              >
                {s.label}
              </motion.a>
            ))}
            <a
              href={profile.cv}
              download
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-bone px-6 py-3 font-medium text-ink"
            >
              Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
