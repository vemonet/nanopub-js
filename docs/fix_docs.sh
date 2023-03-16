
# Remove contribute links from the module nav, keep it only in main navbar
find ./docs-dist/ -type f -exec sed -i "s/<li .*>Contributing<.*li>//g" {} +

# Import nanopub-display.js
# find ./docs-dist/ -type f -exec sed -i 's/display"\/><meta name="viewport/display"\/><script type="module" src="https:\/\/cdn.jsdelivr.net\/npm\/@nanopub\/display\/dist\/nanopub-display.bundle.js"><\/script><meta name="viewport/g' {} +
