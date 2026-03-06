# robert's secrets.

[live instance.](https://secrets.roberts-web.site/)

- client-side secrets manager.
- store secrets in named collections.
- import/export as `.secrets` or `.json` files.
- no server or backend; everything runs locally in the browser without network traffic.

## features.

- **collections.** – give each file a title and manage a list of secrets. keep your project's secrets organized.
- **secrets.** – add, edit, delete, and reorder secrets.
- **import/export.** – load and save `.secrets` or `.json` files; data never leaves your machine. make up fake data and watch your network inspector tab in your browser if you don't believe me. i promise you this is a wholesome attempt at being helpful.

## setup.

```bash
npm install
npm run dev
```

## scripts.

- `npm run dev` – start dev server.
- `npm run build` – typescript check + production build.
- `npm run preview` – serve production build locally.
- `npm run lint` – run eslint.

## deployment.

- builds to static files.
- included dockerfile produces an image that serves the built assets with busybox `httpd` on port 80.
- `captain-definition` is set up for CapRover.