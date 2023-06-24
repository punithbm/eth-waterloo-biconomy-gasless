/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  build: {
		rollupOptions: {
			plugins: [
				inject({
					process: "process"
				})
			]
		}
	},
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
      util: 'util',
    },
  },
});