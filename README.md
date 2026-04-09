# robert's secrets.

[hosted app.](https://secrets.roberts-web.site/)

## what this is.

`robert's secrets` is a browser app for organizing sensitive material. api-style
tokens, ssh key pairs, name/value lists like a small `.env`, username and
password pairs, long notes, and anything else you would rather not paste into a
random text file. you work in one collection at a time with a title at the top;
each row is a secret with a type, a name, and optional tags. when you export,
you get a single json file to save wherever you want. it is not a cloud password
manager: no signup, no shared database, and no automatic sync—only the page in
front of you and files you explicitly open or save.

## privacy and data flow.

your collections are not uploaded anywhere. there is no backend, no accounts,
and nothing is written to browser storage like `localStorage`. while you work,
data lives in normal page memory; if you close or refresh without exporting,
that session is lost.

loading the site only fetches the static page and scripts, the same as any
website. after that, editing, generating keys, copying, and opening or saving
files all happen on your device.

## what you can store.

exported files are json (you can use a `.secrets` or `.json` extension). each
secret keeps a stable id, name, tags, and type-specific content. you pick the
type when you create a secret; you cannot change the type later.

| type.                  | what it’s for.             |
|:---------------------- |:-------------------------- |
| environment variables. | a list of keys and values. |
| password.              | a username and a password. |
| plain text.            | one block of text.         |
| ssh key.               | ssh keypair.               |
| token.                 | secret tokens.             |

to save a new or edited secret you need a name and valid content for that type
(for example non-empty text for plain text and token, both user and password
filled for a password pair).

## using the app.

tag secrets with free-form labels, expand rows to see details and masked values,
move rows up or down, open a row to edit or delete it, and use show/hide and
copy where it helps. if you close the editor with unsaved changes, you’ll be
asked to confirm.

## backup and restore.

use **import** and **export** to read and write files on your machine. if a file
is not in the expected format, the app will tell you. export picks a sensible
default filename from your last import or the collection title when possible;
the final path is always yours in the save dialog.

## running locally.

use a recent node.js (the docker build targets node 20). from the repo root:

```bash
npm install
npm run dev
```

that starts the vite dev server with hot reload. other useful commands:

| command.           | what it does.                                      |
|:------------------ |:-------------------------------------------------- |
| `npm run build`    | typecheck and emit the static site into `dist/`.   |
| `npm run preview`  | serve the production build locally.                |
| `npm run lint`     | run eslint.                                        |

## deployment.

the dockerfile builds the app with node, copies `dist/` into a minimal image,
and serves it with busybox `httpd` on port 80.

for this repository, a github actions workflow runs on every push to `main`: it
builds that docker image, pushes it to ghcr.io as
`ghcr.io/<owner>/secrets:<commit-sha>`, then runs the caprover cli to deploy
that image. set the repository (or environment) secrets `CAPROVER_SERVER`,
`CAPROVER_APP`, and `CAPROVER_APP_TOKEN`.

to deploy elsewhere, run the container built from the dockerfile (expose port
80) or serve the contents of `dist/` with any static host.
