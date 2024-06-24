import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: "dist",
        minify: "esbuild",
        terserOptions: {
            compress: {
                drop_console: true,
            },
            format: {
                comments: false,
            },
            mangle: true,
        }
    },
});
