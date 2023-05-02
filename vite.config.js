import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import gltf from 'vite-plugin-gltf';
import wasm from 'vite-plugin-wasm';
import top_await from 'vite-plugin-top-level-await';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ command, mode }) => {
  return {
    assetsInclude: ['**/*.tflite', '**/*.babylon'],
    plugins: [
      gltf(),
      wasm(),
      top_await(),
      visualizer({
        filename: './dist/report.html',
        open: false,
        brotliSize: true,
      }),
      tsconfigPaths(),
    ],
    define: {
      __ISPRODUCTION__: mode !== 'development',
    },
  };
});
