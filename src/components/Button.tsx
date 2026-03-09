"use client";

import Link from "next/link";
import { type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
};

export function Button({
  className,
  variant = "primary",
  external,
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-tight transition will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98]";

  const styles =
    variant === "primary"
      ? "glass-strong hover:brightness-110"
      : variant === "secondary"
        ? "glass hover:brightness-110"
        : "hover:bg-white/5";

  const target = external ? "_blank" : props.target;
  const rel = external ? "noreferrer noopener" : props.rel;

  const isAnchor = props.href.startsWith("#");
  const isExternalLike =
    props.href.startsWith("http://") ||
    props.href.startsWith("https://") ||
    props.href.startsWith("mailto:") ||
    props.href.startsWith("tel:");

  if (isAnchor || isExternalLike) {
    return (
      <a
        {...props}
        target={target}
        rel={rel}
        className={cn(base, styles, className)}
      />
    );
  }

  return (
    <Link
      href={props.href}
      target={target}
      rel={rel}
      className={cn(base, styles, className)}
    >
      {props.children}
    </Link>
  );
}

