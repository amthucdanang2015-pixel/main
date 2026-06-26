"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile, links } from "@/data/content";
import { Magnetic } from "./Magnetic";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const ease = [0.22, 1, 0.36, 1] as const;
  const base = 2.7; // appear after preloader

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center px-5 pt-28 sm:px-8"
    >
      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: base, duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-white/[0.03] px-3.5 py-1.5 text-xs text-bone/70"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {profile.available}
        </motion.div>

        <h1 className="font-display font-bold leading-[0.86] tracking-tightest">
          <Line text="Full-Stack" delay={base + 0.1} ease={ease} />
          <Line text="Developer" delay={base + 0.22} ease={ease} gradient />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: base + 0.5, duration: 0.7, ease }}
          className="mt-8 max-w-2xl text-balance text-lg text-bone/70 sm:text-xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: base + 0.65, duration: 0.7, ease }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <a
              href="#work"
              data-cursor="explore"
              className="group inline-flex items-center gap-2 rounded-full bg-bone px-6 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-[1.02]"
            >
              View the work
              <span className="transition-transform group-hover:translate-x-1">↓</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={profile.cv}
              download
              data-cursor="pdf"
              className="inline-flex items-center gap-2 rounded-full border border-hairline px-6 py-3.5 text-sm font-medium text-bone transition-colors hover:bg-white/5"
            >
              Download CV
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={links.appStore}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              className="inline-flex items-center gap-2 rounded-full border border-hairline px-6 py-3.5 text-sm font-medium text-bone transition-colors hover:bg-white/5"
            >
               App Store
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: base + 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-bone/40 sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-bone/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function Line({
  text,
  delay,
  ease,
  gradient,
}: {
  text: string;
  delay: number;
  ease: readonly [number, number, number, number];
  gradient?: boolean;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 0.9, ease }}
        className={`block text-[16vw] sm:text-[14vw] lg:text-[11rem] ${
          gradient ? "text-gradient" : "text-bone"
        }`}
      >
        {text}
      </motion.span>
    </span>
  );
}
