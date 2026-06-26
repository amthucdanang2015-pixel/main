"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/content";
import { Reveal, RevealText, SectionLabel } from "./primitives";

const accentMap: Record<string, string> = {
  violet: "from-accent-violet/20 to-transparent text-accent-violet",
  blue: "from-accent-blue/20 to-transparent text-accent-blue",
  cyan: "from-accent-cyan/20 to-transparent text-accent-cyan",
  amber: "from-accent-amber/20 to-transparent text-accent-amber",
};

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionLabel index="04">Toolkit</SectionLabel>
      <RevealText
        as="h2"
        text="A stack that spans the whole product."
        className="max-w-3xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-bone sm:text-4xl md:text-5xl"
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, gi) => (
          <Reveal key={g.title} delay={0.05 * gi}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-hairline bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04]">
              <div
                className={`absolute inset-x-0 -top-px h-px bg-gradient-to-r ${accentMap[g.accent]} opacity-60`}
              />
              <div className={`mb-5 text-sm font-medium uppercase tracking-wider ${accentMap[g.accent].split(" ").pop()}`}>
                {g.title}
              </div>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02 }}
                    className="rounded-full border border-hairline bg-ink-100/50 px-3 py-1.5 text-sm text-bone/75 transition-colors hover:border-bone/30 hover:text-bone"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
