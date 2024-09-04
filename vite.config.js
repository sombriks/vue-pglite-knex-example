import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), nodePolyfills({
        include: ['EventEmitter']
    })],
    optimizeDeps: {
        exclude: ['@electric-sql/pglite'],
    },
})
