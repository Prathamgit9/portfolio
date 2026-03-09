## Pratham Narang — Portfolio

Dark, cinematic, single-page portfolio built with Next.js + Tailwind + motion.

## Getting Started

Install deps and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Add your resume file (for the download button)

1. Put your PDF at `public/Pratham_Narang_Resume.pdf`
2. The site links to it via `src/lib/site-data.ts` (`person.resumePath`).

## Customize content

- Main content/data: `src/lib/site-data.ts`
- Page sections: `src/components/AppShell.tsx`

## Deploy

Recommended: deploy on Vercel.

