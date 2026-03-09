"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { nav, person } from "@/lib/site-data";
import { Button } from "@/components/Button";

type Props = {
  activeId: string;
  onNavigate: (id: string) => void;
};

export function Navbar({ activeId, onNavigate }: Props) {
  const [open, setOpen] = useState(false);

  function go(id: string) {
    setOpen(false);
    onNavigate(id);
  }

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="container-page pt-5">
        <div className="glass bg-[#07070a]/85 flex items-center justify-between rounded-2xl px-4 py-3">
          <button
            onClick={() => go("home")}
            className="group inline-flex items-center gap-2 rounded-xl px-2 py-1 text-sm font-medium tracking-tight text-white/90 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
            aria-label="Go to top"
          >
            <span className="text-gradient font-semibold">{person.name}</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active = item.id === activeId;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-xs font-medium tracking-tight text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]",
                    active && "text-white"
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/15"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href={`mailto:${person.email}`}
              variant="ghost"
              className="hidden sm:inline-flex"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button
              href={person.resumePath}
              variant="secondary"
              external
              className="inline-flex"
              aria-label="Download resume"
            >
              <Download className="h-4 w-4" />
              Resume
            </Button>

            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/80 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu backdrop"
              className="fixed inset-0 z-40 md:hidden"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{
                background:
                  "radial-gradient(900px 600px at 20% 0%, rgba(139,92,246,0.12), transparent 55%), radial-gradient(900px 600px at 80% 10%, rgba(6,182,212,0.1), transparent 60%), rgba(0,0,0,0.72)",
                backdropFilter: "blur(6px)",
              }}
            />

            <motion.div
              className="fixed inset-x-0 top-[5.2rem] z-50 md:hidden"
              initial={{ opacity: 0, y: -10, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="container-page">
                <div className="rounded-2xl border border-white/14 bg-[#07070a]/95 p-2 shadow-[0_40px_120px_rgba(0,0,0,0.75)] backdrop-blur-xl">
                  {nav.map((item) => {
                    const active = item.id === activeId;
                    return (
                      <button
                        key={item.id}
                        onClick={() => go(item.id)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium tracking-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]",
                          active
                            ? "bg-white/10 text-white"
                            : "text-white/75 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <span>{item.label}</span>
                        <span className="text-xs text-white/40">↳</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

