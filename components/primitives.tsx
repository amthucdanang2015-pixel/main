"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* Word-by-word reveal for headings */
export function RevealText({
  text,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const words = text.split(" ");
  const MTag = motion(Tag as any);
  return (
    <MTag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MTag>
  );
}

/* Generic fade-up on scroll */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-bone/40">
      <span className="text-accent-violet">{index}</span>
      <span className="h-px w-8 bg-bone/20" />
      {children}
    </div>
  );
}
