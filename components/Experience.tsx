"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experience, education } from "@/data/content";
import { Reveal, RevealText, SectionLabel } from "./primitives";

const dot: Record<string, string> = {
  violet: "bg-accent-violet",
  blue: "bg-accent-blue",
  cyan: "bg-accent-cyan",
  amber: "bg-accent-amber",
};

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 60%"],
  });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionLabel index="03">Trajectory</SectionLabel>
      <RevealText
        as="h2"
        text="Ten years, three countries, one constant: shipping."
        className="max-w-3xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-bone sm:text-4xl md:text-5xl"
      />

      <div ref={ref} className="relative mt-16 pl-7 sm:pl-10">
        {/* track */}
        <div className="absolute left-[3px] top-2 h-full w-px bg-hairline sm:left-[5px]">
          <motion.div style={{ height: h }} className="w-full bg-gradient-to-b from-accent-violet via-accent-blue to-accent-cyan" />
        </div>

        <div className="space-y-14">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={0.05}>
              <div className="relative">
                <span
                  className={`absolute -left-7 top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-ink sm:-left-10 ${dot[e.accent]}`}
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-xl font-semibold text-bone sm:text-2xl">
                    {e.company}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-wider text-bone/40">
                    {e.period}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-bone/55">
                  <span className="text-bone/80">{e.role}</span>
                  <span className="text-bone/30">·</span>
                  <span>{e.location}</span>
                </div>
                <p className="mt-4 max-w-2xl text-bone/65">{e.summary}</p>
                <ul className="mt-4 space-y-2">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-bone/55">
                      <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${dot[e.accent]}`} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {e.stack.map((s) => (
                    <span key={s} className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[11px] text-bone/55">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="relative">
              <span className="absolute -left-7 top-1.5 h-2.5 w-2.5 rounded-full bg-bone/30 ring-4 ring-ink sm:-left-10" />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-display text-xl font-semibold text-bone sm:text-2xl">{education.school}</h3>
                <span className="font-mono text-xs uppercase tracking-wider text-bone/40">{education.period}</span>
              </div>
              <p className="mt-1 text-sm text-bone/55">{education.degree}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
