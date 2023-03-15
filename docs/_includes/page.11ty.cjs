const header = require('./header.11ty.cjs');
const footer = require('./footer.11ty.cjs');
const nav = require('./nav.11ty.cjs');
const relative = require('./relative-path.cjs');

// <link href="${relative(page.url, '/prism-okaidia.css')}" rel="stylesheet" />
// <link href="https://unpkg.com/prismjs@1.29.0/themes/prism-okaidia.css" rel="stylesheet" />

// <link href="${relative(page.url, '/prism-solarizeddark.css')}" rel="stylesheet" />

{
  /* <script src="/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
<script src="/node_modules/lit/polyfill-support.js"></script> */
}
module.exports = function (data) {
  const {title, page, content} = data;
  return `
<!doctype html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="icon" href="https://nanopub.net/img/icon.png" />
    <link rel="stylesheet" href="${relative(page.url, '/docs.css')}">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600|Roboto+Mono">

    <link href="${relative(page.url, '/prism-solarizeddark.css')}" rel="stylesheet" />

    <script type="module" src="${relative(page.url, '/dist/nanopub-display.js')}"></script>
  </head>
  <body>
    ${header()}
    ${nav(data)}
    <div id="main-wrapper">
      <main>
        ${content}
      </main>
    </div>
    ${footer()}
  </body>
</html>`;
};
