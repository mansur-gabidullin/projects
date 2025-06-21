import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
        include: ["**/*.{test,spec}.{ts,tsx}"],
        exclude: ["node_modules", "dist", "coverage", "**/.{git,cache,output,temp,idea}/**"],
        reporters: ["default"],
        passWithNoTests: true,
    },
});
