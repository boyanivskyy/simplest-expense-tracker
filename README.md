<div align="center">

# 💸 Simple Expense Tracker

Track daily expenses with clean charts and a minimal, dark-friendly UI.

Built with Next.js App Router, TailwindCSS, Clerk, Convex, shadcn/ui, and Recharts.

</div>

## ✨ Features

- 🔐 Auth with Clerk (sign in/up pages included)
- ➕ Add and ✏️ edit expenses (amount, category, date, note)
- 🧭 Categories with icons for quick scanning
- 📊 Charts: Daily spend bar chart + Category pie chart
- 🌓 Dark-theme friendly colors and tooltips
- ⚡ Live data with Convex and automatic updates
- ♿ Accessible dialogs using shadcn/ui + Radix

## 🚀 Quickstart

1) Copy envs

```bash
cp .env.local.example .env.local
```

Fill in:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CONVEX_URL` (will be shown by Convex dev)

2) Install deps

```bash
npm install
```

3) Start Convex (separate terminal)

```bash
npm run convex:dev
```

This generates Convex types and a local URL for `NEXT_PUBLIC_CONVEX_URL`.

4) Run the app

```bash
npm run dev
```

Open http://localhost:3000. The dashboard is at `/dashboard`. Auth routes `/sign-in` and `/sign-up` are provided by Clerk.

## 🔧 Configuration

Environment variables (see `.env.local.example`):

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CONVEX_URL`

If Clerk is not configured yet, the UI still renders; data features require Convex URL.

## 🧱 Project Structure

```
.
├─ convex/                # Convex schema and functions
│  ├─ schema.ts
│  └─ expenses.ts         # list/add/update + aggregations
├─ src/
│  ├─ app/
│  │  ├─ (app)/dashboard/ # main dashboard page
│  │  └─ layout.tsx       # root layout + Providers
│  ├─ components/
│  │  ├─ charts/          # DailyBar, CategoryPie
│  │  ├─ expenses/        # ExpenseDialog, ExpensesList
│  │  ├─ providers.tsx    # Clerk + Convex providers
│  │  └─ ui/              # shadcn/ui primitives (vendor)
│  └─ lib/
│     └─ utils.ts
└─ AGENTS.md              # Repo rules and conventions
```

## 🖥️ Scripts

```bash
npm run dev         # Next.js dev (Turbopack)
npm run build       # Build (Turbopack)
npm run start       # Start production build
npm run convex:dev  # Convex dev + codegen
npm run lint        # Lint
```

## 📈 Data & Charts

- Charts render after mount to avoid SSR hydration warnings.
- The dashboard uses Flexbox to fill the viewport (MBP 14") with the expenses list as the only scrollable area.
- Colors are muted for a dark theme; tooltips use dark backgrounds with legible text.

## 🧭 UI & Accessibility

- shadcn/ui components live in `src/components/ui` and are treated as vendor code.
- Dialogs include `DialogTitle` for screen readers.
- Category selects and expense list use icons aligned with text size for readability.

## 🛠️ Troubleshooting

- Category dropdown won’t open: ensure `NEXT_PUBLIC_CONVEX_URL` exists if testing data, and that the Select trigger isn’t inside a submitting form; our trigger uses `type="button"`.
- Charts not visible: containers must have a non-zero height. The provided layout uses `flex-1` and `min-h-0` to propagate height correctly.
- Convex types missing: run `npm run convex:dev` to regenerate `_generated` API types.

## ☁️ Deploy (Vercel)

1) Push to a Git repo and import in Vercel.
2) Set the environment variables in Vercel project settings.
3) Deploy. Ensure Convex is configured for your deployment and `NEXT_PUBLIC_CONVEX_URL` points to the deployed Convex URL.

## 📜 Notes

- Fonts are handled with `next/font` (Geist family).
- We follow the conventions in `AGENTS.md`:
  - Use shadcn/ui as installed (no local modifications),
  - Prefer Flexbox layouts,
  - Render client-only charts after mount for hydration safety.

Enjoy tracking your spending! 💚
