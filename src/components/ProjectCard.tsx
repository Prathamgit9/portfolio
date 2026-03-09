"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { linkIcons, type Project } from "@/lib/site-data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className={cn(
        "glass group flex h-full flex-col gap-4 rounded-2xl p-5",
        "transition hover:brightness-110"
      )}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-25% 0px -25% 0px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-white/5 px-2 py-1 text-[11px] font-medium tracking-tight text-white/70 ring-1 ring-white/10">
              {project.category}
            </span>
            {project.highlight && (
              <span className="text-[11px] font-medium tracking-tight text-white/60">
                {project.highlight}
              </span>
            )}
          </div>
          <h3 className="truncate text-base font-semibold tracking-tight text-white">
            {project.title}
          </h3>
        </div>
      </header>

      <p className="text-sm leading-7 text-white/70">{project.summary}</p>

      <div className="mt-auto">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium tracking-tight text-white/70 ring-1 ring-white/10"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.links.length ? (
            project.links.map((l) => {
              const Icon = linkIcons[l.type];
              return (
                <a
                  key={`${project.title}-${l.type}-${l.href}`}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs font-medium tracking-tight text-white/80 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
                >
                  <Icon className="h-4 w-4" />
                  {l.label ?? (l.type === "github" ? "Code" : "Link")}
                </a>
              );
            })
          ) : (
            <span className="text-xs font-medium tracking-tight text-white/50">
              Link coming soon
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

