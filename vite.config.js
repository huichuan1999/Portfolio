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
                pixelOfTheSea: './computationalArtist/PixelOfTheSea.html',
                thePool:'./computationalArtist/thePool.html',
                about: "./about/aboutMe.html",
                exhibition: "./exhibitions/exhibitions.html",
                gameDev: "./gameDev/gamedevelopment.html",
                blushingStars: "./graphicDesign/BlushingStars.html",
                bookplate: "./graphicDesign/bookplate.html",
                genkiForest: "./graphicDesign/genkiForest.html",
                graphicDesign: "./graphicDesign/graphicDesign.html",
                petGloves: "./graphicDesign/petGloves.html",
                underGroundShelters: ".//graphicDesign/UndergroundShelters.html",
                gallery: "./Illustrations/gallery.html",
                silentCalcite: "./Illustrations/SilentCalcite.html",
                tangibleIllusions: "./TangibleIllusions/tangibleIllusions.html",
                weeklyBlog: "./WeeklyBlog/weeklyBlog.html"
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
