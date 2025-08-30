import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@db": path.resolve(__dirname, "../db"),
      "@server": path.resolve(__dirname, "../server"),
    },
  },
})
