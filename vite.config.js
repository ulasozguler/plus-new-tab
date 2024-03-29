import { defineConfig } from "vite"
import path from "path"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import mpa from "vite-plugin-mpa"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [svelte(), mpa.default()],
})
