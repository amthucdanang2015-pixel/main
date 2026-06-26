"use client";

import { profile } from "@/data/content";
import { Reveal, RevealText, SectionLabel } from "./primitives";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionLabel index="01">About</SectionLabel>
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <RevealText
            as="h2"
            text="A frontend engineer who can take a product all the way to ship."
            className="max-w-3xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-bone sm:text-4xl md:text-5xl"
          />
          <div className="mt-10 space-y-5 text-base leading-relaxed text-bone/65 sm:text-lg">
            {profile.bio.map((p, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15} className="lg:pt-4">
          <div className="glass rounded-3xl p-7">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-bone/40">
              At a glance
            </div>
            <dl className="mt-6 space-y-5 text-sm">
              {[
                ["Based in", profile.location],
                ["Focus", "Frontend — backend when needed"],
                ["Platforms", "iOS · Android · Web · Smart contracts"],
                ["Worked across", "Vietnam · Malaysia · US (remote)"],
                ["Education", "BS Software Engineering, FPT University"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-6 border-b border-hairline pb-5 last:border-0 last:pb-0">
                  <dt className="text-bone/45">{k}</dt>
                  <dd className="text-right text-bone">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
