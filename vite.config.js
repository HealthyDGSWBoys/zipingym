import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ command, mode }) => {
  return {
    assetsInclude: ['**/*.gltf', '**/*.glb'],
    plugins: [tsconfigPaths()],
    define: {
      __ISPRODUCTION__: mode !== 'development',
    },
  };
});
