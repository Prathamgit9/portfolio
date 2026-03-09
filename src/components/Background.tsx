"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function Background() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const x1 = useTransform(smoothMouseX, [0, 1920], [-30, 30]);
  const y1 = useTransform(smoothMouseY, [0, 1080], [-30, 30]);
  
  const x2 = useTransform(smoothMouseX, [0, 1920], [40, -40]);
  const y2 = useTransform(smoothMouseY, [0, 1080], [40, -40]);
  
  const x3 = useTransform(smoothMouseX, [0, 1920], [-20, 20]);
  const y3 = useTransform(smoothMouseY, [0, 1080], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 opacity-70 grid-fade" />

      <motion.div
        className="absolute -left-24 top-20 h-80 w-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--accent) 60%, transparent), transparent 60%)",
          filter: "blur(18px)",
          x: x1,
          y: y1,
        }}
        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute right-[-6rem] top-28 h-96 w-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--accent2) 48%, transparent), transparent 62%)",
          filter: "blur(20px)",
          x: x2,
          y: y2,
        }}
        animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-[40%] bottom-[-8rem] h-[28rem] w-[28rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--accent3) 30%, transparent), transparent 62%)",
          filter: "blur(22px)",
          x: x3,
          y: y3,
        }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, 4, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />
    </div>
  );
}

