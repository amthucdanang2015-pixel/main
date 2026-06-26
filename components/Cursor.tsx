"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-cursor]");
      if (interactive) {
        setHovering(true);
        setLabel(interactive.getAttribute("data-cursor") || "");
      } else {
        setHovering(false);
        setLabel("");
      }
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[10px] font-medium uppercase tracking-widest text-black"
          animate={{
            width: label ? 76 : hovering ? 44 : 12,
            height: label ? 76 : hovering ? 44 : 12,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
        >
          {label}
        </motion.div>
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40"
        style={{ x, y }}
      />
    </>
  );
}
