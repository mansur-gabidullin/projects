import baseConfig from "./index.mjs";
import { defineConfig } from "vitest/config";

export default defineConfig({
    ...baseConfig,
    test: {
        ...baseConfig.test,
        passWithNoTests: true,
    },
});
