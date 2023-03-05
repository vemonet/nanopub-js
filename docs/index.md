---
layout: page.11ty.cjs
title: nanopub-display
---

<br/>

`<nanopub-display>` is a standard web component to easily display [Nanopublications](https://nanopub.net) anywhere you can use HTML.

It enables developers and users to control which graphs from the nanopublication are displayed.

## 🏷️ As easy as HTML

<section>
  <div>

`<nanopub-display>` is just an HTML element, you can use it anywhere you can use HTML:

```html
<html lang="en">
  <head>
    <script type="module" src="https://unpkg.com/nanopub-display?module"></script>
  </head>

  <body>
    <div style="min-height: 100vh; width: 100%;">
      <nanopub-display
        url="https://purl.org/np/RAHtkscyyyJDLvWRuINckQrn5rbHzQKvwakNVC3fmRzGU"
      />
    </div>
  </body>
</html>
```

  </div>
  <div>

<nanopub-display url="https://purl.org/np/RAHtkscyyyJDLvWRuINckQrn5rbHzQKvwakNVC3fmRzGU"></nanopub-display>

  </div>
</section>

## 💫 Declarative rendering

<section>
  <div>

`<nanopub-display>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const np = 'https://purl.org/np/RAHtkscyyyJDLvWRuINckQrn5rbHzQKvwakNVC3fmRzGU';

render(
  html`
    <h4>This is a &lt;nanopub-display&gt;</h4>
    <nanopub-display url=${np} />
  `,
  document.body
);
```

  </div>
  <div>

<h4>This is a &lt;nanopub-display&gt;</h4>
<nanopub-display url="https://purl.org/np/RAHtkscyyyJDLvWRuINckQrn5rbHzQKvwakNVC3fmRzGU"></nanopub-display>

  </div>
</section>
