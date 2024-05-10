import react from "@vitejs/plugin-react-swc";
import { join, resolve } from "path";
import { CommonServerOptions, UserConfig, defineConfig } from "vite";

const project = resolve("projects/apps/gui");

const userConfig: UserConfig = {
    plugins: [react()],
    root: project,
    build: {
        outDir: resolve("build/apps/gui"),
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
            components: join(project, "components"),
            css: join(project, "css"),
            data: join(project, "data"),
            images: join(project, "images"),
            modules: join(project, "modules"),
            public: join(project, "public"),
            src: join(project, "src"),
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
