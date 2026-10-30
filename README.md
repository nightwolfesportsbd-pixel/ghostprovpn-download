# Ghost VPN website — setup
1. Install Node.js 20+. In this folder run: `npm install` then `npm run dev` and open http://localhost:3000
2. Counter DB (free): create a Redis database at upstash.com, copy URL + token into `.env.local` (see `.env.example`).
3. Deploy: push to GitHub → vercel.com → Add New Project → import repo → add the same env vars → Deploy.
4. New version: replace the file in `public/`, edit `lib/config.ts` (version, date, size, file name), redeploy.
