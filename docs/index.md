---
layout: page.11ty.cjs
title: nanopub-display
---

<br/>

`<nanopub-display>` is a standard web component to easily display [Nanopublications](https://nanopub.net) anywhere you can use HTML.

It enables developers and users to control which graphs from the nanopublication are displayed.

## 🏷️ As easy as HTML

`<nanopub-display>` and `<nanopub-status>` are just HTML elements, you can use them anywhere you can use HTML:

```html
<html lang="en">
  <head>
    <script type="module" src="https://unpkg.com/nanopub-display?module"></script>
  </head>

  <body>
    <div style="min-height: 100vh; width: 100%;">
      <div>
        <nanopub-status url="https://purl.org/np/RAHtkscyyyJDLvWRuINckQrn5rbHzQKvwakNVC3fmRzGU" />
      </div>
      <nanopub-display url="https://purl.org/np/RAHtkscyyyJDLvWRuINckQrn5rbHzQKvwakNVC3fmRzGU" />
    </div>
  </body>
</html>
```

<div>
  <nanopub-status url="https://purl.org/np/RAHtkscyyyJDLvWRuINckQrn5rbHzQKvwakNVC3fmRzGU" />
</div>
<nanopub-display url="https://purl.org/np/RAHtkscyyyJDLvWRuINckQrn5rbHzQKvwakNVC3fmRzGU"></nanopub-display>

## 💫 Declarative rendering

`<nanopub-display>` can be used with declarative rendering libraries like React, Angular, Vue, and lit-html

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

To fix JSX types, for example when used in a React app, you will need to add this declaration to one of your project `.d.ts` file:

```ts
declare namespace JSX {
  interface NanopubDisplay {
    url?: string;
    rdf?: string;
  }
  interface NanopubStatus {
    url?: string;
  }
  interface IntrinsicElements {
    'nanopub-display': NanopubDisplay;
    'nanopub-status': NanopubStatus;
  }
}
```

## 🕸️ Cytoscape configuration

`@nanopub/display` can also be used to generate a cytoscape configuration to easily display your nanopublication with [CytoscapeJS](https://js.cytoscape.org).

⚠️ Cytoscape is not imported by `@nanopub/display`, you will need to make sure to install the following packages first:

```bash
npm install --save cytoscape cytoscape-cose-bilkent cytoscape-popper
# or
yarn add cytoscape cytoscape-cose-bilkent cytoscape-popper
```

The code below shows how to easily generate the cytoscape configuration, please refer to the [cytoscape documentation](https://js.cytoscape.org/#getting-started) to see how to setup your cytoscape container.

```ts
import {cytoscapeGetConfig, cytoscapeShowNodeOnClick, cytoscapeHighlightConnectedEdges} from '@nanopub/display';
import cytoscape, { Core } from 'cytoscape';
import popper from 'cytoscape-popper';
import COSEBilkent from 'cytoscape-cose-bilkent';

// Get the cytoscape div container, and nanopub RDF
const cyContainer?: HTMLDivElement;
const nanopubTrigRdfString?: string;

// Generate the cytoscape config for a given nanopub RDF
const cytoscapeConfig = getCytoscapeConfig(nanopubTrigRdfString),

// Provide the generated config and cytoscape container to the cytoscape builder
const cy = cytoscape({
    ...cytoscapeConfig,
    container: cyContainer
})

// Hightlight connected and show a card with the content of the node on click
cy.on('tap', "node", (e: any) => cytoscapeHighlightConnectedEdges(e, cy))
cy.on('tap', 'node', cytoscapeShowNodeOnClick);
```
