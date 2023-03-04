---
layout: page.11ty.cjs
title: nanopub-display
---

# &lt;nanopub-display>

`<nanopub-display>` is a standard web component to easily display [Nanopublications](https://nanopub.net) anywhere you can use HTML.

## As easy as HTML

<section>
  <div>

`<nanopub-display>` is just an HTML element. You can it anywhere you can use HTML!

```html
<nanopub-display url="https://purl.org/np/RAHtkscyyyJDLvWRuINckQrn5rbHzQKvwakNVC3fmRzGU.trig"></nanopub-display>
```

  </div>
  <div>

<nanopub-display style="max-height: 400px; overflow: scroll;" url="https://purl.org/np/RAHtkscyyyJDLvWRuINckQrn5rbHzQKvwakNVC3fmRzGU.trig"></nanopub-display>

  </div>
</section>

## Declarative rendering

<section>
  <div>

`<nanopub-display>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const np = 'https://purl.org/np/RAHtkscyyyJDLvWRuINckQrn5rbHzQKvwakNVC3fmRzGU.trig';

render(
  html`
    <h2>This is a &lt;nanopub-display&gt;</h2>
    <nanopub-display url=${np}></nanopub-display>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;nanopub-display&gt;</h2>
<nanopub-display url="https://purl.org/np/RAHtkscyyyJDLvWRuINckQrn5rbHzQKvwakNVC3fmRzGU.trig"></nanopub-display>

  </div>
</section>
