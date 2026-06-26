"use client";

import { references } from "@/data/work";
import { Reveal, RevealText, SectionLabel } from "./primitives";

export default function References() {
  return (
    <section id="references" className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionLabel index="06">Vouched for</SectionLabel>
      <RevealText
        as="h2"
        text="People I've shipped alongside."
        className="max-w-3xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-bone sm:text-4xl md:text-5xl"
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {references.map((r, i) => (
          <Reveal key={r.name} delay={0.08 * i}>
            <figure className="relative h-full overflow-hidden rounded-3xl border border-hairline bg-white/[0.02] p-8">
              <span className="font-display text-6xl leading-none text-accent-violet/30">“</span>
              <blockquote className="-mt-6 text-lg leading-relaxed text-bone/80">
                {r.quote}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4 border-t border-hairline pt-6">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-accent-violet to-accent-cyan font-display font-semibold text-white">
                  {r.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </span>
                <div>
                  <div className="font-medium text-bone">{r.name}</div>
                  <div className="text-sm text-bone/50">
                    {r.relation} · {r.period}
                  </div>
                </div>
              </figcaption>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-bone/40">
                <a href={`mailto:${r.email}`} className="hover:text-accent-cyan">{r.email}</a>
                <span>{r.phone}</span>
              </div>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
