import typescript from '@rollup/plugin-typescript';

const external = ['react', 'react-dom', 'tslib'];

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist/',
      entryFileNames: '[name].js',
      chunkFileNames: '[name]-[hash].js',
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
  ],
  external: (id) => external.includes(id) || id.startsWith('@peculiar/certificates-viewer'),
};
