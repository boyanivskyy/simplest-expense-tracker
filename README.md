Simple Expense Tracker built with Next.js App Router, TailwindCSS, Clerk, Convex, shadcn/ui, and Recharts.

## Getting Started

Setup

1) Copy `.env.local.example` to `.env.local` and set:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CONVEX_URL` (after running Convex dev)

2) Install dependencies:

```bash
npm install
```

3) Start Convex in a separate terminal (generates types and a local URL):

```bash
npm run convex:dev
```

4) Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Auth routes live at `/sign-in` and `/sign-up`. The dashboard is at `/dashboard` (protected by Clerk middleware).

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

Notes

- shadcn-style UI components live in `src/components/ui`.
- Convex functions and schema live in `convex/`. A stub is checked in under `convex/_generated/api.ts` so TypeScript compiles before running Convex; it will be replaced by the codegen when `npm run convex:dev` is running.
