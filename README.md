# 🧬 Web Component to display Nanopublications

[![Run tests and update docs](https://github.com/vemonet/nanopub-display/actions/workflows/build.yml/badge.svg)](https://github.com/vemonet/nanopub-display/actions/workflows/build.yml)

A standard Web Component to display [Nanopublications](https://nanopub.net).

This document contains details on the development workflow used for the component.

Refer to the documentation website for more details on how to use the component: **[vemonet.github.io/nanopub-display](https://vemonet.github.io/nanopub-display)**

## 📥️ Install

Clone the repository:

```bash
git clone https://github.com/vemonet/nanopub-display
cd nanopub-display
```

Install dependencies:

```bash
yarn
```

## 🧑‍💻 Development

Start the component in development mode, it will automatically reload when the code is changed:

```bash
yarn dev
```

## 📦️ Build

This sample uses the TypeScript compiler to produce JavaScript that runs in modern browsers.

To build the JavaScript version of your component:

```bash
yarn build
```

To watch files and rebuild when the files are modified, run the following command in a separate shell:

```bash
yarn build:watch
```

## ☑️ Testing

This sample uses modern-web.dev's [@web/test-runner](https://www.npmjs.com/package/@web/test-runner) for testing. See the [modern-web.dev testing documentation](https://modern-web.dev/docs/test-runner/overview) for more information.

Tests can be run with the `test` script:

```bash
yarn test
```

For local testing during development, the `test:dev:watch` command will run your tests in Lit's development mode (with verbose errors) on every change to your source files:

```bash
yarn test:watch
```

Alternatively the `test:prod` and `test:prod:watch` commands will run your tests in Lit's production mode.

> If you use VS Code, we highly recommend the [lit-plugin extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin), which enables some extremely useful features for lit-html templates.

## ✒️ Formatting

[Prettier](https://prettier.io/) is used for code formatting. It has been pre-configured according to the Lit's style. You can change this in the `package.json`.

Prettier has not been configured to run when committing files, but this can be added with Husky and `pretty-quick`. See the [prettier.io](https://prettier.io/) site for instructions.

## ✅ Linting

Linting of TypeScript files is provided by [ESLint](eslint.org) and [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint). In addition, [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) is used to type-check and lint lit-html templates with the same engine and rules as lit-plugin.

The rules are mostly the recommended rules from each project, but some have been turned off to make LitElement usage easier. The recommended rules are pretty strict, so you may want to relax them by editing `.eslintrc.json` and `tsconfig.json`.

To lint the project run:

```bash
yarn lint
```

## 📖 Documentation website

This project includes a simple website generated with the [eleventy](11ty.dev) static site generator and the templates and pages in `/docs`. The site is generated to `/docs-dist` and intended to be checked in so that GitHub pages can serve the site [from `/docs` on the master branch](https://help.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

To enable the site go to the GitHub settings and change the GitHub Pages &quot;Source&quot; setting to &quot;master branch /docs folder&quot;.</p>

To build the site, run:

```bash
yarn docs
```

To serve the site locally, run:

```bash
yarn docs:serve
```

To watch the site files, and re-build automatically, run:

```bash
yarn docs:watch
```

The site will usually be served at http://localhost:8000.

## ℹ️ More information

Vite TS starter: https://github.com/vitejs/vite/tree/main/packages/create-vite/template-lit-ts
