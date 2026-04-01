# robert's secrets.

[hosted app.](https://secrets.roberts-web.site/)

## what this is.

`robert's secrets` is a browser app for organizing sensitive material—api-style tokens, ssh key pairs, long notes, and anything else you would rather not paste into a random text file. you work inside named collections; each row is a secret with a type, a name, optional tags, and (when you export) a single json document you save wherever you want. it is a structured notebook for secrets, not a cloud password manager. there is no signup, no shared database, and no sync layer, only the page in front of you and files you explicitly read or write.

## privacy and data flow.

your collections are not uploaded anywhere. the app has no backend, no accounts, and no sync service. there is no code path that sends your secrets over the network or saves them to browser storage (nothing is written to `localStorage` or similar). while you work, everything lives in ordinary page memory; if you close or refresh the tab without exporting, that session’s data is gone.

loading the hosted site uses normal web traffic only to fetch the static html, scripts, and assets that make the app run—like any webpage. after that, editing, generating keys, copying to the clipboard, and importing files happen on your machine. the clipboard and file apis are local to your browser.

if you want to double-check, open developer tools, watch the network tab, and use sample data: you will see no requests carrying your sensitive data.

## what gets stored (in a file you choose).

everything is ordinary json you can save as `.secrets` or `.json`. a collection has a title and an ordered list of secrets. each secret has a stable id, a name, optional tags, and timestamps for when it was created and last updated.

secrets are typed so you can be precise about what each row represents. you pick the type when you create a secret; it does not change later.

| type       | what it holds                                                                                                                                                               |
|:---------- |:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| plain text | one text `value`—configuration snippets, notes, or anything you want to treat as generic text.                                                                              |
| token      | one text `value` with the same shape as plain text in the file, but labeled separately in the ui so you can keep api keys and similar material distinct from general notes. |
| ssh key    | a `public` and `private` string—either pasted or generated in the browser (rsa, ecdsa, or ed25519 via `@peculiar/ssh`).                                                     |

plain-text and token secrets must have a non-empty value before you can save them. ssh entries need both halves filled (or generated) in a way that passes validation in the editor.

## flexibility in the ui.

you can tag secrets with free-form labels, expand rows to see metadata and masked values, reorder entries, edit in a modal, or delete. sensitive fields support show/hide and copy using the browser’s clipboard api. the design stays flexible (tags, types, ordering) and strict about types and validation so what you store matches what you think you stored.

## keeping a backup.

use import and export to read and write files on disk. exported json is pretty-printed. the filename for export is chosen from your last import, or from a slug of the collection title, or a simple default—always under your control, like any save dialog.

## developing this repo.

```bash
npm install
npm run dev
```

- `npm run build` — typescript check and production build.
- `npm run preview` — serve the production build locally.
- `npm run lint` — eslint.

built with react, vite, typescript, and tailwind css. the output is static files; a dockerfile and `captain-definition` are included for caprover-style deployment.
