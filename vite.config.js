import { defineConfig } from "vite";

export default defineConfig({
    base: "/",
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                computationalArt: './computationalArtist/computationalArt.html',
                ameobas: './computationalArtist/Amoebas.html',
                codeincode: './computationalArtist/codeincode.html',
                flyingBooks: './computationalArtist/flyingBooks.html',
                noaa: './computationalArtist/NOAA.html',
                randomFractals: './computationalArtist/RandomFractals.html',
                theLensOfAi: './computationalArtist/TheLensOfAI.html',
                about: "./about/aboutMe.html"
            }
        },
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
