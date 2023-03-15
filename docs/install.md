---
layout: page.11ty.cjs
title: nanopub-display ⌲ Install
---

# 📥️ Install

`<nanopub-display>` is distributed on npm, so you can install it in your project, or use it via npm CDNs like [unpkg.com](https://unpkg.com).

## 📦️ Install with a package manager

The most convenient way to install a package in your project, using either `npm` or `yarn`:

```bash
npm i --save @nanopub/display
```

```bash
yarn add @nanopub/display
```

## 🌐 Import from a CDN

npm CDNs like [unpkg.com](https://unpkg.com) or [jsdelivr.com](https://www.jsdelivr.com) can directly serve files that have been published to npm. This works great for standard JavaScript modules that the browser can load natively, or minified bundles.

For this element to work from unpkg.com specifically, you need to include the `?module` query parameter, which tells unpkg.com to rewrite "bare" module specifiers to full URLs.

### 🛩️ Import Module

In HTML:

```html
<script type="module" src="https://unpkg.com/@nanopub/display?module"></script>
```

In JavaScript:

```js
import {NanopubDisplay} from 'https://unpkg.com/@nanopub/display?module';
```

### 🚛 Import Bundle

We also distribute Nanopub Display as a minified bundle with all dependencies pre-included (~60kB).

Import the latest version:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@nanopub/display/dist/nanopub-display.min.js"></script>
```

In production we recommend to use a specific version:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@nanopub/display@0.0.1/dist/nanopub-display.min.js"></script>
```
