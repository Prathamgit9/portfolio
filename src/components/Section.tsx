"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  id: string;
  title?: string;
  kicker?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, title, kicker, className, children }: Props) {
  return (
    <section
      id={id}
      data-section
      className={cn("container-page scroll-mt-24 py-20 sm:py-24", className)}
    >
      {(title || kicker) && (
        <div className="mb-10">
          {kicker && (
            <div className="mb-3 text-xs font-medium tracking-[0.22em] text-white/60">
              {kicker}
            </div>
          )}
          {title && (
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
          )}
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}

