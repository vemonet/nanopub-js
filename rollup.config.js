import summary from 'rollup-plugin-summary';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
// import minifyHTML from 'rollup-plugin-minify-html-literals';

// https://lit.dev/docs/tools/production/
export default {
  input: 'dist/nanopub-display.js',
  output: [
    {
      file: 'dist/nanopub-display.js',
      format: 'esm'
    },
    {
      file: 'dist/nanopub-display.min.js',
      format: 'iife',
      // format: "esm", // NOTE: apparently esm is not supported by firefox web workers
      plugins: [
        terser({
          ecma: 2020,
          module: true,
          warnings: true
        })
      ]
    }
  ],
  // No external for testing, everything needs to be bundled
  external: process.env.BUNDLE ? [] : [/^lit/, /^n3/],
  plugins: [
    replace({
      preventAssignment: true,
      'Reflect.decorate': 'undefined'
    }),
    commonjs(), // https://github.com/rollup/plugins/tree/master/packages/commonjs
    // Resolve bare module specifiers to relative paths
    resolve({preferBuiltins: true, browser: true}),
    // minifyHTML(), // Minify HTML template literals
    summary()
  ],
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  }
};
