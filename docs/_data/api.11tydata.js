const fs = require('fs');

module.exports = () => {
  const customElements = JSON.parse(
    fs.readFileSync('dist/custom-elements.json', 'utf-8')
  );
  return {
    customElements,
  };
};
