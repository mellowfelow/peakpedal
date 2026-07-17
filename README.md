# Peak Pedal

UK electric mountain bike retailer. React + Next.js (App Router), deployed to Vercel.

## Stack
- Next.js 15 (App Router), React 19
- Plain CSS (custom properties, mobile-first) — no framework dependency
- Forms: Web3Forms (client-side, no backend needed)
- Deploy: Vercel via GitHub (auto-deploy on push)

## Commands
```
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run crosscheck   # pre-ship checks against the build output — must pass before every push
npm run images       # process assets/product-photos/* into public/images/*.webp
```

## Live placeholders — must be set before real launch

| Placeholder | Where | What breaks while unset |
|---|---|---|
| `DOMAIN.com` | `src/config/site.js` → `SITE.domain` | Canonicals, sitemap, OG tags, all `.well-known/*`, `llms.txt` point at a fake domain. Change this ONE line, rebuild, push — never find-and-replace across files. |
| GSC verification code | `src/config/site.js` → `SITE.gscCode` | Can't verify domain in Google Search Console |
| Web3Forms access key | `src/config/site.js` → `FORMS.web3formsKey` | Contact/order forms redirect to the thank-you page but **no email is sent anywhere**. WhatsApp is the only live order channel until this is set. |
| Phone / WhatsApp number | `src/config/site.js` → `SITE.contact` | Chat button and `wa.me` links point at a placeholder number |
| Contact email | `src/config/site.js` → `SITE.contact.email` | Shown as `info@DOMAIN.com` sitewide |
| Founding year / brand story | `docs/PROJECT.md` Section N, then `src/config/site.js` | About page and homepage authority section stay generic until real facts are supplied — never invent these |
| Real product photos | `assets/product-photos/` | Every product currently uses a shared placeholder graphic (`/images/placeholder.svg`). Drop 2000px+ white-background photos in, run `npm run images`. |

## Deploy (Vercel)
1. `git init` (already done), commit.
2. Create an **empty** GitHub repo, then:
   ```
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
3. On [vercel.com](https://vercel.com) → Add New → Project → import the repo.
   **Framework Preset: Next.js** (must be set correctly or `vercel.json` headers/redirects won't apply and routes may 404).
4. Deploy. Once you have a domain: set it in Vercel, update `SITE.domain` in `src/config/site.js`, commit, push — everything else regenerates automatically.

## After every content change
Run `npm run build && npm run crosscheck` before pushing. The crosscheck fails the build if: the domain placeholder is still present in a flagged-production build, forms are misconfigured, JSON-LD is invalid, images are missing, or any agent-ready file is missing/malformed.

## Project docs
`docs/PROJECT.md` — full intake record, brand facts, deferred items. `docs/keyword-map.md` — keyword → page assignments and what's deferred to Phase 2/3. Both are excluded from the deployed site (Next.js only serves `public/` and rendered routes, never repo-root `docs/`).
