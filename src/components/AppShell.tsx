"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Background } from "@/components/Background";
import { Button } from "@/components/Button";
import { CopyButton } from "@/components/CopyButton";
import { Cursor } from "@/components/Cursor";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { cn } from "@/lib/cn";
import {
  experience,
  nav,
  person,
  projects,
  skillGroups,
  socials,
  type ProjectCategory,
} from "@/lib/site-data";

type ProjectFilter = "All" | ProjectCategory;

function useActiveSectionObserver(setActiveId: (id: string) => void) {
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-section][id]")
    );

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        const top = visible[0]?.target as HTMLElement | undefined;
        if (!top?.id) return;

        if (raf.current) cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(() => setActiveId(top.id));
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-10% 0px -70% 0px",
      }
    );

    sections.forEach((s) => observer.observe(s));

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      observer.disconnect();
    };
  }, [setActiveId]);
}

export function AppShell() {
  const [activeId, setActiveId] = useState(nav[0]?.id ?? "home");
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [transition, setTransition] = useState<{
    show: boolean;
    phase: "in" | "out";
    targetId?: string;
  }>({ show: false, phase: "in" });

  useActiveSectionObserver(setActiveId);

  const filteredProjects = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function onNavigate(id: string) {
    setTransition({ show: true, phase: "in", targetId: id });
    window.setTimeout(() => {
      scrollTo(id);
      setTransition((t) => ({ ...t, phase: "out" }));
    }, 220);
    window.setTimeout(() => setTransition({ show: false, phase: "in" }), 520);
  }

  return (
    <div className="relative min-h-dvh">
      <Background />
      <Cursor />
      <Navbar activeId={activeId} onNavigate={onNavigate} />

      <AnimatePresence>
        {transition.show && (
          <motion.div
            className="fixed inset-0 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(1200px 700px at 30% 20%, rgba(139,92,246,0.25), transparent 55%), radial-gradient(900px 600px at 70% 30%, rgba(6,182,212,0.18), transparent 60%), rgba(0,0,0,0.55)",
                backdropFilter: "blur(6px)",
              }}
              initial={{ y: "-30%", opacity: 0 }}
              animate={{
                y: transition.phase === "in" ? "0%" : "30%",
                opacity: transition.phase === "in" ? 1 : 0,
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pb-24 pt-24">
        <section id="home" data-section className="container-page py-24 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl p-7 sm:p-10"
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium tracking-tight text-white/75 ring-1 ring-white/10">
                    <MapPin className="h-4 w-4" />
                    {person.location}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium tracking-tight text-white/75 ring-1 ring-white/10">
                    {person.relocation}
                  </span>
                </div>

                <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  <span className="text-gradient">{person.name}</span>
                  <span className="text-white/80"> — </span>
                  <span className="text-white/90">{person.headline}</span>
                </h1>

                <p className="max-w-2xl text-pretty text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                  Multidisciplinary builder blending{" "}
                  <span className="text-white/90">software engineering</span>,{" "}
                  <span className="text-white/90">ML prototypes</span>, and{" "}
                  <span className="text-white/90">UI/UX taste</span> to ship
                  crisp, modern work. I’m aiming for SDE roles where I can own
                  features end-to-end and keep iterating.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={`mailto:${person.email}`} variant="primary">
                  Email me
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <Button href={person.resumePath} variant="secondary" external>
                  Download resume
                </Button>
                <CopyButton value={person.email} label="Copy email" />
                <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
                  {socials
                    .filter((s) => s.label !== "Email")
                    .map((s) => (
                      <a
                        key={s.href}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-tight text-white/80 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
                      >
                        <s.icon className="h-4 w-4" />
                        {s.label}
                      </a>
                    ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  {
                    label: "Focus",
                    value: "Backend Dev (Python) + ML prototypes",
                  },
                  { label: "Strength", value: "Clean UI + strong taste" },
                  { label: "Edge", value: "VFX/photobashing mindset" },
                ].map((i) => (
                  <div
                    key={i.label}
                    className="glass rounded-2xl p-4 ring-1 ring-white/10"
                  >
                    <div className="text-xs font-medium tracking-[0.18em] text-white/50">
                      {i.label}
                    </div>
                    <div className="mt-2 text-sm font-medium tracking-tight text-white/85">
                      {i.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <Section
          id="about"
          kicker="ABOUT"
          title="A builder with taste"
          className="pt-10"
        >
          <div className="grid gap-6 md:grid-cols-5">
            <div className="glass rounded-2xl p-6 md:col-span-3">
              <p className="text-sm leading-7 text-white/70">
                I’m a Computer Science engineer who likes shipping features that
                feel intentional — clean interactions, readable code, and
                outputs that are easy to evaluate. My background spans Python,
                web fundamentals, ML notebooks, and UI/UX (Figma + Framer),
                which helps me move quickly from idea → interface → working
                prototype.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 md:col-span-2">
              <div className="text-xs font-medium tracking-[0.18em] text-white/50">
                CURRENTLY
              </div>
              <ul className="mt-4 space-y-3 text-sm text-white/75">
                <li className="flex items-center justify-between gap-3">
                  <span>Role</span>
                  <span className="text-white/90">Software Dev Trainee</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span>Learning</span>
                  <span className="text-white/90">Next.js + motion</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span>Open to</span>
                  <span className="text-white/90">SDE interviews</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        <Section id="experience" kicker="TIMELINE" title="Experience">
          <div className="grid gap-4">
            {experience.map((e) => (
              <div key={`${e.company}-${e.timeframe}`} className="glass rounded-2xl p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="text-base font-semibold tracking-tight text-white">
                    {e.title}
                  </div>
                  <div className="text-sm font-medium text-white/60">
                    {e.timeframe}
                  </div>
                </div>
                <div className="mt-1 text-sm font-medium text-white/75">
                  {e.company}
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-white/70">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" kicker="WORK" title="Projects (SDE / ML / UI/UX)">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {(["All", "SDE", "ML", "UI/UX"] as const).map((t) => {
                const active = filter === t;
                return (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-xs font-medium tracking-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]",
                      active
                        ? "text-white"
                        : "text-white/65 hover:text-white"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="proj-pill"
                        className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/15"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.55,
                        }}
                      />
                    )}
                    <span className="relative z-10">{t}</span>
                  </button>
                );
              })}
            </div>
            <div className="text-xs font-medium tracking-tight text-white/55">
              Showing {filteredProjects.length} project
              {filteredProjects.length === 1 ? "" : "s"}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>

          <div className="mt-8 glass rounded-2xl p-6">
            <div className="text-sm font-semibold tracking-tight text-white">
              Want more?
            </div>
            <p className="mt-2 text-sm leading-7 text-white/70">
              I’m actively curating and polishing my best work. Meanwhile, you
              can explore my GitHub for repositories and experiments.
            </p>
            <div className="mt-4">
              <Button href={person.links.github} variant="secondary" external>
                View GitHub
              </Button>
            </div>
          </div>
        </Section>

        <Section id="skills" kicker="STACK" title="Skills">
          <div className="grid gap-4 md:grid-cols-2">
            {skillGroups.map((g) => (
              <div key={g.label} className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <g.icon className="h-5 w-5 text-white/80" />
                  <div className="text-sm font-semibold tracking-tight text-white">
                    {g.label}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <span
                      key={i}
                      className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium tracking-tight text-white/70 ring-1 ring-white/10"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" kicker="CONTACT" title="Let’s talk">
          <div className="glass rounded-3xl p-7 sm:p-10">
            <div className="grid gap-8 md:grid-cols-5">
              <div className="md:col-span-3">
                <h3 className="text-balance text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  If you’re hiring for an SDE role, I’d love to interview.
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  Best way to reach me is email. If you prefer LinkedIn, that
                  works too. I respond quickly.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button href={`mailto:${person.email}`} variant="primary">
                    Email me
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                  <Button href={person.resumePath} variant="secondary" external>
                    Download resume
                  </Button>
                  <CopyButton value={person.email} label="Copy email" />
                </div>

                <div className="mt-6 text-xs font-medium tracking-tight text-white/55">
                  Email: <span className="text-white/75">{person.email}</span>
                  {" · "}
                  Phone: <span className="text-white/75">{person.phone}</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="grid gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target={s.external ? "_blank" : undefined}
                      rel={s.external ? "noreferrer noopener" : undefined}
                      className="glass inline-flex items-center justify-between gap-3 rounded-2xl px-5 py-4 text-sm font-medium tracking-tight text-white/80 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
                    >
                      <span className="inline-flex items-center gap-3">
                        <s.icon className="h-5 w-5" />
                        {s.label}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-white/60" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <footer className="container-page pb-10">
        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-7 text-xs text-white/55 sm:flex-row sm:items-center">
          <div>
            © {new Date().getFullYear()} {person.name}
          </div>
          <div className="flex flex-wrap gap-3">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => onNavigate(n.id)}
                className="hover:text-white/80"
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

