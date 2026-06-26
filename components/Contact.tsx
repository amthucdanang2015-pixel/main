"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile, links } from "@/data/content";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./primitives";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden px-5 py-32 sm:px-8 sm:py-44">
      <motion.div
        style={{ y }}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.18),transparent_60%)] blur-2xl"
      />
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-bone/40">
            Let&apos;s build something
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-[12vw] font-bold leading-[0.9] tracking-tightest text-bone sm:text-7xl md:text-8xl">
            Available for
            <br />
            <span className="text-gradient">great work.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-xl text-balance text-lg text-bone/60">
            {profile.available}. The fastest way to reach me is email — or grab the CV.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a
                href={links.email}
                data-cursor="email"
                className="inline-flex items-center gap-2 rounded-full bg-bone px-7 py-4 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
              >
                {profile.email}
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.cv}
                download
                data-cursor="pdf"
                className="inline-flex items-center gap-2 rounded-full border border-hairline px-7 py-4 text-sm font-medium text-bone transition-colors hover:bg-white/5"
              >
                Download CV (PDF)
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-sm text-bone/45">
            <span>{profile.phone}</span>
            <span className="hidden h-1 w-1 rounded-full bg-bone/30 sm:block" />
            <span>{profile.location}</span>
            <span className="hidden h-1 w-1 rounded-full bg-bone/30 sm:block" />
            <a href={links.appStore} target="_blank" rel="noreferrer" className="hover:text-accent-cyan">
              App Store ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
