# robert's secrets.

[live instance.](https://secrets.roberts-web.site/)

- client-side secrets manager.
- store secrets in named collections.
- import/export as `.secrets` or `.json` files (pretty-printed JSON).
- no server or backend; everything runs locally in the browser without network traffic.

## features.

- **collections.** – name your collection, import a file, or export the current state. export picks a filename from the last import, or from the collection title (slugified), or falls back to `untitled.secrets`.
- **secret types.** – each entry is either **plain text** (a single value) or an **ssh key** (public and private material). the type is fixed after creation; plain-text secrets need a non-empty value before you can save.
- **tags.** – attach free-form tags to any secret. add a tag with enter; remove one from the chip in the editor. expanded list rows show tags when present.
- **ssh keys.** – choose **new** to generate a key pair in the browser (RSA with 2048/3072/4096, ECDSA on P-256/P-384/P-521, or Ed25519) using `@peculiar/ssh`, or **existing** to paste public and private keys. generation shows a short waiting state while keys are produced.
- **list & editing.** – collapsible rows with type icon and name; expand to see tags, **created** / **updated** timestamps, and masked values. reorder with move up/down, edit in a modal, or delete. in the expanded view, show/hide and **copy** controls sit beside each sensitive field (clipboard API).
- **import/export.** – load `.secrets` or `.json`; invalid files show an error modal. version **1** files are migrated to **version 2** on import (secrets gain timestamps). exported data is **version 2** JSON. data never leaves your machine—use the network tab with fake data if you want to verify there is no traffic.

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

## stack.

- React 19, Vite 7, TypeScript, Tailwind CSS 4.

## deployment.

- builds to static files.
- included dockerfile produces an image that serves the built assets with busybox `httpd` on port 80.
- `captain-definition` is set up for CapRover.
