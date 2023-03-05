import {defineConfig} from 'vite';
import {terser} from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import dts from 'vite-plugin-dts';

// NOTE: vite build not used, we use rollup directly

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    target: ['esnext'],
    lib: {
      entry: 'src/nanopub-display.ts',
      name: 'nanopub-rdf',
      // fileName: (format) => `nanopub-rdf.${format}.js`,
      dir: 'dist',
      // formats: ["es"],
    },
    minify: true,
    sourcemap: true,
    cssCodeSplit: true,
    // commonjsOptions: {
    //     include: [/node_modules/, /n3/],
    //     extensions: ['.js', '.cjs']
    // },
    rollupOptions: {
      input: 'src/nanopub-display.ts',
      output: [
        {
          // file: "dist/nanopub-display.js",
          // dir: "dist",
          entryFileNames: '[name].js',
          format: 'esm',
        },
        {
          // file: "dist/nanopub-display.min.js",
          // dir: "dist",
          entryFileNames: '[name].min.js',
          format: 'esm',
          plugins: [terser()],
        },
      ],
      rollupPlugins,
      // external: [/lit/, /n3/]
    },
  },
  optimizeDeps: {
    include: ['lit', 'n3'],
  },
  // plugins: [
  //     // dts(),
  //     // ViteMinifyPlugin({}),
  // ],
  // define: {
  //     global: {},
  // },
});

const rollupPlugins = [
  typescript({
    compilerOptions: {
      target: 'esnext',
      declaration: true,
      module: 'CommonJS',
      // declarationDir: "types/",
    },
  }),
  // nodeGlobals(),
  commonjs({
    extensions: ['.js', '.ts'],
    // include: [/n3/],
  }),
  nodeResolve(),
];
