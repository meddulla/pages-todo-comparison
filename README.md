# Threadline demos

Four independent Cloudflare Pages projects use the same source fixture, `stories.json`.
Each build copies that fixture into its own deployment output.

| Project | Root directory | Build command | Output directory |
| --- | --- | --- | --- |
| Plain HTML/JS/CSS | `plain` | `npm install && npm run build` | `dist` |
| React | `react` | `npm install && npm run build` | `dist` |
| Vue | `vue` | `npm install && npm run build` | `dist` |
| Svelte | `svelte` | `npm install && npm run build` | `dist` |

## Deploy with the Cloudflare dashboard

Push this repository to GitHub or GitLab, then create four separate Pages projects:

1. In the Cloudflare dashboard, open **Workers & Pages** and select **Create application**.
2. Choose **Pages** and **Connect to Git**.
3. Select this repository and configure one project using a row from the table above.
4. Leave the framework preset as **None**. Set the root directory, build command, and output directory exactly as listed.
5. Select **Save and Deploy**.
6. Repeat for the other three project roots.

Each project can use its generated `*.pages.dev` address or a separate custom domain. Subsequent pushes to the connected branch trigger a new deployment.

## Deploy with Wrangler

Build and deploy one project at a time from the repository root:

```sh
cd plain
npm install
npm run build
npx wrangler pages deploy dist --project-name threadline-plain
```

Replace `plain` and `threadline-plain` with `react`, `vue`, or `svelte` and the corresponding Pages project name. Authenticate first with `npx wrangler login` if needed.
