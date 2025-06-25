import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    root: ".",
    plugins: [tsconfigPaths(), externalizeDeps(), dts({ include: ["src"], exclude: ["**/*.test.ts", "**/test/**"] })],
});
