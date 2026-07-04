This repo was made with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) using the latest version of Next.js with the App Router (TypeScript) and connects to the [GhostCMS Content API](https://ghost.org/docs/content-api/javascript/) (v5.0).

It serves as a starting template to fetch and retrieve all posts and single posts as a Statically Generated Site using the App Router (`src/app/`). It might be updated in the future to use other parts of the GhostCMS Content API, but this is a proof of concept.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [pnpm](https://pnpm.io/) — the project's package manager (see `pnpm-lock.yaml`)
- [Docker](https://www.docker.com/) and the Docker Compose plugin — only required if you want to run the full self-hosted stack (Ghost CMS + MySQL + Caddy reverse proxy + Next.js)

## Configuration

This project ships two configuration surfaces:

1. **`.env`** — required by both the Next.js app (Ghost Content API key + blog URL) and the Docker Compose stack (domain, database, mail, storage, etc.).
2. **`caddy/Caddyfile`** — only used by the Docker stack. A working example (`Caddyfile.example`) is provided for reference.

Start by copying the example file and filling in your values:

```bash
cp .env-example .env
```

The minimum values you need to run the Next.js app against an existing Ghost instance are:

| Variable          | Description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `CONTENT_API_KEY` | Content API key from GhostCMS Admin → Settings → Integrations → Custom Integration. |
| `BLOG_URL`        | The base URL of your GhostCMS instance (e.g. `https://my-ghost.example.com`). |

If you also intend to run the full Docker stack (recommended), fill in the remaining values in `.env` (database credentials, `DOMAIN`, SMTP, Cloudinary, etc.) following the inline comments. The database and `DOMAIN` values must be set before the first `docker compose up` and **must not** be changed after initialization.

## Running the Full Stack (Recommended)

The repository's `compose.yml` defines a complete self-hosted stack:

- **`ghost`** — the GhostCMS server (with Cloudinary storage adapter)
- **`db`** — a MySQL 8.4 database
- **`app`** — this Next.js app running in dev mode (with Turbopack)
- **`caddy`** — a Caddy reverse proxy that terminates TLS and routes traffic to the Next.js app and (optionally) Ghost Admin

With `.env` populated, start the whole stack:

```bash
docker compose up --build
```

Once the containers are healthy:

- The public site is served by Caddy at `https://<DOMAIN>` (uses Caddy's local CA for `localhost`/`*.localhost` domains).
- Ghost Admin is available at `https://<ADMIN_DOMAIN>` if `ADMIN_DOMAIN` is set.

### Optional Services

Two optional profiles are available and can be enabled by setting the `COMPOSE_PROFILES` variable in your `.env`:

```bash
COMPOSE_PROFILES=analytics,activitypub
```

- **Analytics** — runs the `traffic-analytics` and Tinybird (`tinybird-login`, `tinybird-sync`, `tinybird-deploy`) containers. Run `docker compose run --rm tinybird-login get-tokens` first and paste the returned tokens into `.env`.
- **ActivityPub** — runs the `activitypub` container and its `activitypub-migrate` migration job.

Then start the stack with the desired profiles:

```bash
docker compose --profile analytics --profile activitypub up --build
```

## Running the Next.js App Locally (Without Docker)

If you already have a Ghost instance running (either self-hosted or on [Ghost(Pro)](https://ghost.org/pricing/)), you can run just the Next.js app against it.

Make sure `CONTENT_API_KEY` and `BLOG_URL` are set in your `.env`, then install dependencies and start the dev server (Turbopack is enabled by default):

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit files.

### Useful Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `pnpm dev`        | Start the dev server with Turbopack. |
| `pnpm build`      | Build the app for production.       |
| `pnpm start`      | Start the production server.        |
| `pnpm lint`       | Run ESLint.                          |

## Project Structure

```
.
├─ compose.yml        Full self-hosted stack (Ghost + MySQL + Caddy + Next.js)
├─ Dockerfile         Ghost image with the Cloudinary storage adapter baked in
├─ caddy/             Caddy reverse proxy config + reusable snippets
├─ src/
│  ├─ app/            App Router: layout.tsx, page.tsx, and post/[slug]/ page
│  ├─ helper/util.tsx GhostCMS Content API client and data-fetching helpers
│  └─ styles/         Global + component CSS Modules
└─ public/            Static assets (favicon, brand SVGs)
```

Start editing the home page in `src/app/page.tsx`. Single posts are served by the dynamic route at `src/app/post/[slug]/page.tsx`. Data fetching happens through the helpers in `src/helper/util.tsx`, and you can change the Ghost API version there (currently `v5.0`).

## Learn More

To learn more about the technologies used here:

- [Next.js Documentation](https://nextjs.org/docs) — learn about Next.js features and the App Router.
- [GhostCMS Content API](https://ghost.org/docs/content-api/javascript/) — the API this template pulls posts from.
- [Docker Compose](https://docs.docker.com/compose/) — used for the full self-hosted stack.

## Deploy on Vercel

The Next.js app can be deployed independently on [Vercel](https://vercel.com/new) from the creators of Next.js. Be sure to set the `BLOG_URL` and `CONTENT_API_KEY` environment variables in your Vercel project settings. See the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
