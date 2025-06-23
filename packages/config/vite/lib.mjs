import { mergeConfig, defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";

import baseConfig from "./base.mjs";

export default mergeConfig(
    baseConfig,
    defineConfig({
        plugins: [dts({ include: ["src"], exclude: ["**/*.test.ts", "**/test/**"] }), externalizeDeps()],
        build: {
            lib: {
                entry: "src/index.ts",
                formats: ["es"],
                fileName: "index",
            },
        },
    }),
);
