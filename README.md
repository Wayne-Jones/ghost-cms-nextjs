This repo was made with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) using the latest version of NextJS/TypeScript and connects using the v3 of the Content API from [`GhostCMS`](https://ghost.org/docs/content-api/javascript/).

This serves as a starting template to fetch and retieve all posts and single posts as a Statically Generated Site. I might update this repo in the future to use other parts of the GhostCMS Content API, but this is just a proof of concept.

## Getting Started

First, create your own .env file using the .env-example file and replace the values of your BLOG_URL and CONTENT_API_KEY with the values that you get from GhostCMS. If you currently don't have a Content API Key, you can create one by going to the GhostCMS Admin panel and adding a Custom Integration.

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
