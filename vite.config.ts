import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { CommonServerOptions, UserConfig, defineConfig } from "vite";

const userConfig: UserConfig = {
    plugins: [react()],
    root: resolve("gui"),
    base: "/",
    build: {
        outDir: resolve("build/gui"),
        emptyOutDir: true,
        rollupOptions: {
            output: {
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`,
            },
        },
    },
    resolve: {
        alias: {
            css: resolve("gui/css"),
        },
    },
};

const commonServerOptions: CommonServerOptions = {};

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    switch (command) {
        case "serve": {
            return {
                ...userConfig,
                server: { ...commonServerOptions },
                preview: { ...commonServerOptions },
            };
        }
        default: {
            return {
                ...userConfig,
            };
        }
    }
});
