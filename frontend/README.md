# MedClear Frontend

Next.js app for MedClear AI: upload a medical bill, prescription, or lab report
and read it back in plain language.

## Running locally

```bash
npm install
npm run dev
```

The app runs at http://localhost:3000.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript, no emit

## Structure

- `src/app/globals.css` — design tokens (colour, type) as Tailwind theme variables
- `src/app/layout.tsx` — fonts, metadata, skip link
- `src/app/page.tsx` — upload screen
- `src/components/` — page components

## Status

Frontend foundation and upload experience only. Backend integration, language
toggle, text-to-speech, and the results view are not built yet.
