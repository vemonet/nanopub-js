import { defineConfig } from "vite";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
// import dts from 'vite-plugin-dts';

// NOTE: vite build not used, we use rollup directly

const rollupPlugins = [
    typescript({
        compilerOptions: {
            target: 'esnext',
            declaration: true,
            module: 'CommonJS',
            // declarationDir: "types/",
        },
    }),
    // TODO: resolves imports, but fail due to N3.js https://github.com/rdfjs/N3.js/issues/257
    // nodeGlobals(),
    commonjs({
        extensions: ['.js', '.ts'],
        include: [/n3/],
    }),
    nodeResolve(),
    // filesize({
    //     showMinifiedSize: false,
    //     showBrotliSize: true,
    // }),
];

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: "dist",
        target: ['esnext'],
        lib: {
            entry: "src/nanopub-display.ts",
            name: "nanopub-rdf",
            // fileName: (format) => `nanopub-rdf.${format}.js`,
            dir: "dist",
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
            input: "src/nanopub-display.ts",
            output: [
                {
                    // file: "dist/nanopub-display.js",
                    // dir: "dist",
                    entryFileNames: '[name].js',
                    format: "esm",
                },
                {
                    // file: "dist/nanopub-display.min.js",
                    // dir: "dist",
                    entryFileNames: '[name].min.js',
                    format: "esm",
                    plugins: [terser()],
                },
            ],
            rollupPlugins,
            // external: /^@microsoft\/fast-(element|components)/
            // external: /^@microsoft\/fast-element/,
            // Added from rollup.config.js
            // input: "src/index.ts",
            // output: [
            //     {
            //         // file: "dist/nanopub-display.js",
            //         dir: "dist",
            //         format: "esm",
            //     },
            //     {
            //         // file: "dist/nanopub-display.min.js",
            //         dir: "dist",
            //         format: "esm",
            //         plugins: [terser()],
            //     },
            // ],
            // plugins,
        },
    },
    optimizeDeps: {
        include: [ 'lit', 'n3' ]
    },
    // plugins: [
    //     // dts(),
    //     // terser(),
    //     // input https://www.npmjs.com/package/html-minifier-terser options
    //     // ViteMinifyPlugin({}),
    // ],
    // define: {
    //     global: {},
    // },
});
