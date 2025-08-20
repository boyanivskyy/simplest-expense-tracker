Project Rules

- Use shadcn/ui components as-installed: Do not modify the generated shadcn/ui components directly in `src/components/ui/*`. If a bug or need arises, prefer fixing usage in feature components or replacing with upstream default implementations. Any alignment to upstream should be a one-time sync; thereafter, treat them as vendor code and avoid edits.

- Accessibility: Ensure dialogs include a proper `DialogTitle` (and optionally description) using the shadcn/radix primitives, and that chart cards have sensible min-heights to avoid invisible content.

- SSR/Hydration: For complex client-only visualizations (e.g., Recharts), render after mount to avoid hydration mismatches.

- Layout rule: Prefer Flexbox over CSS Grid across the app. Use `flex`, `flex-col`, `flex-1`, and `min-h-0` patterns to manage sizes and scrolling. If a layout need seems to require grid, implement a flex-based workaround instead; no grid usage.
