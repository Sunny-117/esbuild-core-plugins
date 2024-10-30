import { defineConfig } from "rollup";
import postcss from "rollup-plugin-postcss";

export default defineConfig({
    input: './demo/Button.js',
    output: {
        dir: './rollup-dist',
        format: 'esm'
    },
    plugins: [
        postcss()
    ]
})