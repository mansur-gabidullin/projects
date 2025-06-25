import { mergeConfig, defineConfig } from "vite";

import baseConfig from "./base.mjs";

export default mergeConfig(
    baseConfig,
    defineConfig({
        build: {
            lib: {
                entry: "src/index.ts",
                formats: ["es"],
                fileName: "index",
            },
        },
    }),
);
