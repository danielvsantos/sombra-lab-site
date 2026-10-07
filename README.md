# Sombra Lab website

Two independent apps in one repo:

| Folder | What | Deployed to |
|---|---|---|
| `/` (root) | Public site: Next.js 16, reads published content from Sanity, video from Mux | Vercel project for `sombralab.com` |
| `studio/` | Sanity Studio (content editing), own `package.json` and lockfile | Vercel project for `studio.sombralab.com` |

Content schemas live **only** in `studio/schemas`. The site does not import them: it reads with
`@sanity/client` + `groq` and uses its own types in `src/sanity/lib/types.ts`. The site never
depends on `sanity`, `next-sanity`, `@sanity/vision`, `sanity-plugin-mux-input` or
`styled-components` (CI enforces this).

Client name and Instagram handle of portfolio projects linked to Sombra Hub (`hubClientId` set)
are managed in the Hub and are read-only in the Studio. The Hub pushes them to Sanity; the site
never calls the Hub. Contract: spec 14 (`docs/specs/14-website-content.md`) in the `sombrahub` repo.

## Local development

```bash
# Site (http://localhost:3000). Needs NEXT_PUBLIC_SANITY_PROJECT_ID=5jy0w4kq and
# NEXT_PUBLIC_SANITY_DATASET=production in .env.local.
npm ci
npm run dev

# Studio (http://localhost:3333). Sign in with Google.
cd studio
npm ci
npm run dev
```

Checks: `npm run lint && npm run build` (site); `cd studio && npx tsc --noEmit -p . && npm run build`
(Studio). CI (`.github/workflows/ci.yml`) runs both on every PR.

## Deployment

### Site (`sombralab.com`)
Unchanged: Vercel project with the repo root as Root Directory, framework Next.js.
**Ignored Build Step** (Settings → Git), so Studio-only commits don't redeploy the site:

```bash
git diff --quiet HEAD^ HEAD -- . ':(exclude)studio'
```

### Studio (`studio.sombralab.com`)
A second Vercel project from the same repo:

1. Vercel → Add New → Project → this repo. **Root Directory `studio`**, Framework Preset
   **Other**. Build, output and headers come from `studio/vercel.json` (`npm run build` → `dist`,
   SPA rewrite, `X-Robots-Tag: noindex, nofollow`, `/robots.txt` disallows everything).
2. **Ignored Build Step**, so site-only commits don't redeploy the Studio:
   ```bash
   git diff --quiet HEAD^ HEAD -- .
   ```
3. Domains → add `studio.sombralab.com`. In the `sombralab.com` DNS zone add
   `CNAME studio → cname.vercel-dns.com`.
4. sanity.io/manage → project `5jy0w4kq` → API → CORS origins → add
   `https://studio.sombralab.com` with **Allow credentials**. (Also add the Vercel preview URL
   if you want to test there before the domain is live.)
5. Check: open the Vercel preview, sign in with Google (the only option), edit a draft, upload a
   Mux video. Then the custom domain. Then `curl -I https://studio.sombralab.com` shows
   `X-Robots-Tag: noindex, nofollow`.
6. Once confirmed, retire the old hosted Studio: from a checkout of the previous commit (which
   still has `deployment.appId` in `sanity.cli.ts`) run `npx sanity undeploy` once, and remove its
   `*.sanity.studio` origin from the Sanity CORS list.

The Studio is no longer deployed with `sanity deploy`; there is no `appId` and no deploy script.
