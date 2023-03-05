// https://lit.dev/docs/tools/production/
// https://github.com/rollup/plugins/tree/master/packages/commonjs

import summary from 'rollup-plugin-summary';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'dist/nanopub-display.js',
  output: [
    {
      file: 'dist/nanopub-display.js',
      format: 'esm',
    },
  ],
  // No external for testing, evything needs to be bundled
  external: process.env.BUNDLE ? [] : [/lit/, /n3/],
  plugins: [
    replace({
      preventAssignment: true,
      'Reflect.decorate': 'undefined',
    }),
    commonjs({
      // include: 'node_modules/**',
    }),
    // Resolve bare module specifiers to relative paths
    resolve({preferBuiltins: true, browser: true}),
    // Minify HTML template literals
    // minifyHTML(),
    summary(),
  ],
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
};
