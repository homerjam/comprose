import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import copy from 'rollup-plugin-copy';
import { main } from './package.json';

const name = main.replace(/\.js$/, '');

const external = new Set(['./data/data.js']);

const bundle = (config) => ({
  ...config,
  input: 'src/index.ts',
  external: (id) => {
    return external.has(id) || !/^[./]/.test(id);
  },
});

export default [
  bundle({
    output: [
      {
        file: `${name}.js`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `${name}.mjs`,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      esbuild(),
      copy({ targets: [{ src: 'src/data/data.js', dest: 'dist/data' }] }),
    ],
  }),
  bundle({
    output: {
      file: `${name}.d.ts`,
      format: 'es',
    },
    plugins: [dts()],
  }),
];
