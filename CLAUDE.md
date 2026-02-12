# Helm

Helm is a dark SaaS **Revenue & Finance dashboard** for businesses to track MRR, ARR, churn, transactions, and financial performance.

## Tech Stack

- **Next.js** — App Router
- **React** — UI library
- **TypeScript** — strict mode enabled
- **Tailwind CSS** — utility-first styling
- **Recharts** — charts (lazy loaded with `dynamic()`, always `ssr: false`)

## Production Standards

### Code Quality

- TypeScript strict mode — no `any`, explicit types everywhere
- Props must be typed with interfaces, not inline types
- No unused variables, imports, or dead code
- Components stay focused — one responsibility per component

### Design System

- Dark theme is the primary and only theme
- All colors must use semantic tokens defined in `styles/globals.css` — never use raw Tailwind palette classes (e.g. `stone-900`) or hardcoded hex values directly in components
- Semantic tokens: `bg-background`, `bg-surface`, `bg-surface-raised`, `border-border`, `text-foreground`, `text-muted`
- Consistent spacing scale — never use arbitrary values unless absolutely necessary
- All interactive elements must have hover, focus, and active states

### Design Cheatsheet

| Token        | Value                              |
| ------------ | ---------------------------------- |
| Base font    | 14px                               |
| Font scale   | 12 / 14 / 16 / 20 / 24 / 30px     |
| Font weights | 400 regular · 500 medium · 600 semibold (sparingly) |
| Line height  | 1.5 body · 1.2 headings · 1 labels |
| Icon size    | 16px                               |
| Icon stroke  | 1.5 (single width throughout)      |
| Radius       | 6px cards · 4px badges, inputs, buttons |

### Components

- Build small, reusable, composable components
- Keep components in `components/` — organized by feature or type
- No logic in layout files — keep `layout.tsx` clean
- Avoid prop drilling — use composition patterns

### Performance

- Use `next/image` for all images
- Prefer server components by default — only use `"use client"` when necessary
- Lazy load heavy components (charts, tables) with `dynamic()`
- Keep bundle size lean — avoid unnecessary dependencies

### Accessibility

- All interactive elements must be keyboard navigable
- Use semantic HTML elements
- Include ARIA labels where needed
- Maintain sufficient color contrast ratios

### Responsive Design

- Mobile-first approach
- Dashboard must be fully functional on tablet and desktop
- Sidebar should collapse on smaller screens

## Pages

| Route           | Page         | Purpose                                                 |
| --------------- | ------------ | ------------------------------------------------------- |
| `/overview`     | Overview     | MRR, ARR, churn, active users — key metrics at a glance |
| `/revenue`      | Revenue      | Revenue trends, growth charts, breakdown by plan        |
| `/transactions` | Transactions | Full data table — filter, sort, paginate                |
| `/customers`    | Customers    | Customer list, LTV, status, plan                        |
| `/settings`     | Settings     | Profile, billing, team, notifications                   |

## Folder Structure

```
helm/
├── app/                        # Next.js App Router
│   ├── (dashboard)/            # Route group — all dashboard pages
│   │   ├── overview/
│   │   │   └── page.tsx
│   │   ├── revenue/
│   │   │   └── page.tsx
│   │   ├── transactions/
│   │   │   └── page.tsx
│   │   ├── customers/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── layout.tsx          # Dashboard shell (sidebar + header)
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Entry point (redirect to dashboard)
│
├── styles/
│   └── globals.css             # Tailwind import + semantic color tokens
│
├── components/
│   ├── ui/                     # Base reusable UI (Button, Badge, Card, Input, etc.)
│   ├── charts/                 # Chart components (lazy loaded)
│   ├── tables/                 # Table components (lazy loaded)
│   ├── layout/                 # Sidebar, Header, Navbar
│   └── dashboard/              # Page-specific dashboard widgets
│
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions (e.g. lib/utils.ts)
├── types/                      # Shared TypeScript interfaces and types
├── constants/                  # App-wide constants (routes, nav items, etc.)
└── public/                     # Static assets (icons, images)
```

### Rules

- `components/ui/` — only generic, stateless, reusable primitives
- `components/dashboard/` — smart components tied to dashboard features
- `hooks/` — all custom hooks prefixed with `use`
- `types/` — no business logic, types and interfaces only
- `constants/` — no functions, plain data only
- Never import from `app/` into `components/` — keep the boundary clean

## Development Approach

- Build step by step, piece by piece — one thing at a time
- Only create folders and files when they are actually needed — never scaffold ahead
- Each task is scoped and focused — e.g. if working on layout, only touch layout files
- Do not add components, pages, or abstractions that aren't part of the current task
- Get each piece right before moving to the next
