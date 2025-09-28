import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// ถ้าจะใช้ Tailwind plugin
// import tailwindcss from 'tailwindcss'  

export default defineConfig({
  plugins: [react(), ],
})
