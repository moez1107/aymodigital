# Deployment Guide — AYMO Digital

This project is built with **TanStack Start + Vite + Nitro**, so it deploys as a real
SSR app on any modern host. Page refresh on deep links (e.g. `/services/seo`,
`/blog/<slug>`) works everywhere because the server resolves the route — no
`BrowserRouter` 404s.

---

## 1. Local development

```bash
bun install        # or: npm install
bun run dev        # vite dev server -> http://localhost:8080
bun run build      # production build
bun run preview    # preview the built app
```

Node **20+** is required (`.nvmrc` is included).

Create `.env.local` from `.env.example` for local secrets. Anything prefixed
`VITE_` is exposed to the browser; everything else is server-only.

---

## 2. Deploy to **Vercel**

`vercel.json` is preconfigured.

1. Push the repo to GitHub / GitLab / Bitbucket.
2. Import the project in Vercel.
3. Framework preset: **Other** (auto-detected via `vercel.json`).
4. Build command: `NITRO_PRESET=vercel npm run vercel-build`
5. Output directory: `.vercel/output`
6. Add env vars from `.env.example` in **Settings → Environment Variables**.
7. Deploy.

Deep-link refresh works out of the box (Vercel serves the Nitro SSR function).

---

## 3. Deploy to **Netlify**

`netlify.toml` is preconfigured.

1. Push the repo and "Add new site → Import from Git" in Netlify.
2. Build command: `NITRO_PRESET=netlify bun run build`
3. Publish directory: `dist`
4. Add env vars in **Site settings → Environment variables**.
5. Deploy.

The `[[redirects]]` rule + `public/_redirects` ensure any URL refresh falls
back to the SSR/SPA entry — no 404 on `/about`, `/services/...`, `/blog/...`.

---

## 4. Deploy to **Cloudflare Pages / Workers**

Default Nitro preset. No env var needed.

```bash
bun run build
npx wrangler deploy
```

`wrangler.jsonc` controls the worker config.

---

## 5. Deploy to **Firebase Hosting**

Firebase Hosting is static; use it only for the SPA fallback (no SSR).

```bash
NITRO_PRESET=static bun run build
firebase init hosting   # public dir: dist/client
firebase deploy
```

Add to `firebase.json` so refresh works:

```json
{
  "hosting": {
    "public": "dist/client",
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

---

## 6. Deploy to **GitHub Pages**

Static only.

```bash
NITRO_PRESET=github-pages bun run build
# push contents of dist/ to the gh-pages branch
```

GitHub Pages does not support SSR — server functions will not run.

---

## 7. Self-hosted (Node server / Docker / VPS)

```bash
NITRO_PRESET=node-server bun run build
node .output/server/index.mjs
```

Runs on `PORT` (default `3000`). Put Nginx / Caddy in front for HTTPS.

---

## 8. Troubleshooting

| Symptom | Fix |
|---|---|
| 404 on refresh of `/services/...` | Confirm `netlify.toml` / `vercel.json` rewrites are present (already included). |
| White screen after deploy | Check the host's build logs — usually a missing env var. |
| `process.env.X` undefined in browser | Rename to `VITE_X` (only `VITE_*` vars reach the client). |
| Server function 500 | Read host's function logs; secrets must be set in the host dashboard, not in `.env.local`. |

---

## 9. Environment variables checklist

Add these to **every** host you deploy to:

- `VITE_APP_NAME`
- `VITE_SUPABASE_URL` *(only if using Lovable Cloud externally)*
- `VITE_SUPABASE_PUBLISHABLE_KEY` *(only if using Lovable Cloud externally)*
- `LOVABLE_API_KEY` *(server-only; auto-injected on Lovable hosting)*
