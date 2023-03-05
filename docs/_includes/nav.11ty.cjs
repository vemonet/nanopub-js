const relative = require('./relative-path.cjs');

module.exports = function ({page}) {
  return `
<nav>
  <a href="${relative(page.url, '/')}">Home</a>
  <a href="${relative(page.url, '/install/')}">Install</a>
  <a href="${relative(page.url, '/api/')}">API</a>
  <a href="https://github.com/vemonet/nanopub-display" target="_blank">GitHub</a>
</nav>`;
};
