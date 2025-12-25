import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()],
server: {
  proxy: {
    "/sanity": {
      target: "https://5u95fyl0.api.sanity.io",
      changeOrigin: true,
      rewrite: (p) => p.replace(/^\/sanity/, ""),
    },
  },
}


})
