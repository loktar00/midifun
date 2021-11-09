import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

// Static assets will vary depending on the application
const copyConfig = {
  targets: [
    { src: 'node_modules/@webcomponents', dest: 'dist/node_modules' },
    { src: 'public/index.html', dest: 'dist' },
  ],
};

const config = {
  input: 'src/index.ts',
  output: {
    dir: 'dist/src',
    outDir: "dist",
    format: 'es',
  },
  plugins: [
    copy(copyConfig),
    resolve(),
    typescript()
  ],
  watch: { include: 'src/*' },
  preserveEntrySignatures: false,
};

export default config;