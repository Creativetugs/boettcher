# Boettcher Supply — Home Page Concept

A single-page concept design for **Boettcher Supply, Inc.** (Beloit, KS) — an employee-owned
wholesale distributor of electrical, plumbing, and outdoor power equipment, in business since 1937.

Built as a prospecting demo to show what an interactive e-commerce home page could look like.

## Highlights

- **Interactive Product Finder** — the standout feature. Visitors pick a department →
  category, or type a search (e.g. "SharkBite", "LED tube", "chainsaw chain") and see
  matching products instantly, color-coded by department. Includes an "Add to quote"
  cart demo.
- **Three department showcase** — Electrical, Plumbing, Outdoor Power & Small Engine.
- **Brands they carry** — Milwaukee, Echo, SharkBite, Peerless, Bradford White, InSinkErator.
- **Company story** — the 1937 "Model T full of cantaloupe" origin and employee-ownership.
- **Two-location info** with real addresses, phones, and hours.
- **Account login strip** reflecting the members-only pricing model.
- **How It Works** section — a clear 4-step ordering process (account → find → price/stock → pickup/delivery).
- Uses the real **Boettcher Supply logo** and brand palette (red `#ec5856`, white, black).
- Fully responsive, custom industrial theme (no build step, no dependencies).

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page markup / content |
| `styles.css` | Theme & layout |
| `script.js` | Product Finder, cart demo, mobile nav |
| `logo.png` | Official Boettcher Supply logo |

## Run it

Just open `index.html` in any browser — no server or install needed.
Fonts load from Google Fonts (needs internet); everything else works offline.

## Notes for the client pitch

- All catalog data lives in the `CATALOG` object at the top of `script.js`, so departments,
  categories and products are easy to expand.
- The Product Finder is a front-end demo; in production it would connect to live inventory
  and member pricing behind the account login.
