import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import gltf from 'vite-plugin-gltf';
import wasm from 'vite-plugin-wasm';
import top_await from 'vite-plugin-top-level-await';

export default defineConfig(({ command, mode }) => {
  return {
    assetsInclude: ['**/*.tflite'],
    plugins: [gltf(), tsconfigPaths()],
    define: {
      __ISPRODUCTION__: mode !== 'development',
    },
  };
});
