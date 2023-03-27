import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import gltf from 'vite-plugin-gltf';

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [gltf(), tsconfigPaths()],
    define: {
      __ISPRODUCTION__: mode !== 'development',
    },
  };
});
