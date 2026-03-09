import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Code2,
  ExternalLink,
  Figma,
  Github,
  Globe,
  Linkedin,
  Mail,
  Wand2,
} from "lucide-react";

export const person = {
  name: "Pratham Narang",
  headline: "Backend Developer (Python) • ML • UI/UX",
  location: "Delhi, India",
  relocation: "Open to relocate (offer-dependent)",
  email: "pn992003@gmail.com",
  phone: "9891664476",
  links: {
    github: "https://github.com/Prathamgit9",
    linkedin: "https://in.linkedin.com/in/prathamn09092003",
  },
  resumePath: "/Pratham_Narang_Resume.pdf",
};

export type NavItem = { id: string; label: string };
export const nav: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export type Social = {
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

export const socials: Social[] = [
  { label: "Email", href: `mailto:${person.email}`, icon: Mail },
  { label: "GitHub", href: person.links.github, icon: Github, external: true },
  {
    label: "LinkedIn",
    href: person.links.linkedin,
    icon: Linkedin,
    external: true,
  },
];

export type Experience = {
  title: string;
  company: string;
  timeframe: string;
  bullets: string[];
  tags?: string[];
};

export const experience: Experience[] = [
  {
    title: "Software Developer Trainee",
    company: "Bitxia Tech Pvt. Ltd.",
    timeframe: "Jan 2026 — Present",
    bullets: [
      "Working on product-focused development with an emphasis on reliability and clean UX.",
    ],
    tags: ["Software"],
  },
  {
    title: "Research Intern",
    company: "Delhi Police (IFSO)",
    timeframe: "Apr 2025 — Jun 2025",
    bullets: [
      "Research internship focused on applied problem-solving and analytical work.",
    ],
    tags: ["Research"],
  },
  {
    title: "Python Development Intern",
    company: "CodSoft",
    timeframe: "Aug 2024 — Sep 2024",
    bullets: [
      "Built Python-based mini-projects and sharpened fundamentals through structured deliverables.",
    ],
    tags: ["Python"],
  },
  {
    title: "AI Intern",
    company: "CodSoft",
    timeframe: "Oct 2023 — Nov 2023",
    bullets: [
      "Explored practical ML/AI workflows through hands-on notebooks and experiments.",
    ],
    tags: ["ML"],
  },
];

export type ProjectCategory = "SDE" | "ML" | "UI/UX";

export type ProjectLink =
  | { type: "github"; href: string; label?: string }
  | { type: "live"; href: string; label?: string }
  | { type: "case"; href: string; label?: string };

export type Project = {
  title: string;
  category: ProjectCategory;
  summary: string;
  stack: string[];
  links: ProjectLink[];
  highlight?: string;
};

export const projects: Project[] = [
  {
    title: "ALfred — Virtual Assistant (GenAI)",
    category: "ML",
    summary:
      "A lightweight virtual assistant prototype integrating GenAI to answer queries and drive a simple command flow.",
    stack: ["Python", "GenAI", "API Integration"],
    links: [
      {
        type: "github",
        href: "https://github.com/Prathamgit9/ALfred-AI-v1",
      },
    ],
    highlight: "GenAI integration",
  },
  {
    title: "Dogs vs Cats — Image Classifier",
    category: "ML",
    summary:
      "An end-to-end notebook workflow for training and evaluating a classifier on the classic Dogs-vs-Cats dataset.",
    stack: ["Python", "ML", "Jupyter"],
    links: [
      { type: "github", href: "https://github.com/Prathamgit9/Dogs-v-Cats" },
    ],
  },
  {
    title: "CodSoft Python Internship — Mini Projects",
    category: "SDE",
    summary:
      "A collection of internship deliverables focused on core Python development and practical problem-solving.",
    stack: ["Python"],
    links: [
      {
        type: "github",
        href: "https://github.com/Prathamgit9/CODSOFT-Python-Internship",
      },
    ],
  },
  {
    title: "Online Guest Reservation System",
    category: "SDE",
    summary:
      "A Java-based reservation system project implementing core flows and CRUD-style operations.",
    stack: ["Java"],
    links: [
      {
        type: "github",
        href: "https://github.com/Prathamgit9/Online-Guest-Reservation-System",
      },
    ],
  },
  {
    title: "Student Database Management Project",
    category: "SDE",
    summary:
      "A C++ console app for managing student records with structured operations and file handling basics.",
    stack: ["C++"],
    links: [
      {
        type: "github",
        href: "https://github.com/Prathamgit9/Student-Database-Management-Project",
      },
    ],
  },
  {
    title: "Metamatix Website (Design + Build)",
    category: "UI/UX",
    summary:
      "A website concept designed in Figma and built in Framer, focused on layout, typography, and motion feel.",
    stack: ["Figma", "Framer"],
    links: [],
    highlight: "UI/UX + motion polish",
  },
];

export const skillGroups: { label: string; icon: LucideIcon; items: string[] }[] =
  [
    {
      label: "Engineering",
      icon: Code2,
      items: ["Python", "JavaScript", "C/C++", "Java", "Git/GitHub"],
    },
    {
      label: "ML / AI",
      icon: Brain,
      items: ["Model training basics", "Computer vision", "Recommenders", "GenAI"],
    },
    {
      label: "UI / UX",
      icon: Figma,
      items: ["Figma", "Framer", "Prototyping", "Design systems"],
    },
    {
      label: "Product & Web",
      icon: Globe,
      items: ["Web fundamentals", "APIs", "Clean UI", "Responsive layouts"],
    },
    {
      label: "Creative Edge",
      icon: Wand2,
      items: ["VFX interest", "Photobashing", "Unreal Engine (learning/builds)"],
    },
  ];

export const linkIcons: Record<ProjectLink["type"], LucideIcon> = {
  github: Github,
  live: ExternalLink,
  case: ExternalLink,
};

