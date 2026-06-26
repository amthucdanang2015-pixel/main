"use client";

import { useEffect, useRef } from "react";

/* Fixed, animated aurora gradient + cursor-reactive glow + fine grid. */
export default function AuroraBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.setProperty("--mx", `${(e.clientX / window.innerWidth) * 100}%`);
      el.style.setProperty("--my", `${(e.clientY / window.innerHeight) * 100}%`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "30%" }}
    >
      {/* drifting blobs */}
      <div
        className="absolute -left-[20%] -top-[20%] h-[70vmax] w-[70vmax] rounded-full opacity-50 blur-[120px]"
        style={{
          background: "radial-gradient(circle at center, rgba(124,92,255,0.45), transparent 60%)",
          animation: "drift 24s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-[20%] top-[10%] h-[60vmax] w-[60vmax] rounded-full opacity-40 blur-[120px]"
        style={{
          background: "radial-gradient(circle at center, rgba(34,211,238,0.4), transparent 60%)",
          animation: "drift 30s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[20%] h-[55vmax] w-[55vmax] rounded-full opacity-30 blur-[120px]"
        style={{
          background: "radial-gradient(circle at center, rgba(59,130,246,0.4), transparent 60%)",
          animation: "drift 27s ease-in-out infinite",
        }}
      />
      {/* cursor glow */}
      <div
        className="absolute inset-0 opacity-60 transition-[background] duration-300"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx) var(--my), rgba(245,181,68,0.08), transparent 40%)",
        }}
      />
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(237,234,228,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(237,234,228,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, #000 30%, transparent 80%)",
        }}
      />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,8,12,0.85)_100%)]" />
    </div>
  );
}
