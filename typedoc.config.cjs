/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  // entryPoints: ["./src/index.ts", "./src/secondary-entry.ts"],
  // out: "doc",
  entryPointStrategy: "packages",
  entryPoints: ["nanopub-display", "nanopub-utils"],
  out: "docs-dist",
  exclude: ["**/*.spec.ts"],
  visibilityFilters: {
    protected: true,
    private: true,
    inherited: false,
    external: true
  },
  navigationLinks: {
    "✒️ Contribute": "/nanopub-display/pages/CONTRIBUTING.html",
    "🛸 GitHub": "https://github.com/vemonet/nanopub-display"
  },
  customCss: "docs/style.css",
  // https://knodescommunity.github.io/typedoc-plugins/_knodes_typedoc_plugin_pages/pages/pages-tree.html
  pluginPages: {
    source: ".",
    pages: [
      {
        title: "Contributing",
        source: "CONTRIBUTING.md"
      }
    ]
  }
}
