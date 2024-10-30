import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "./demo/Button.js",
            formats: ['es'],
        },
        outDir: 'vite-dist'
    }
})