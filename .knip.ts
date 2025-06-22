const projectPatterns = ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,json,css}"];

const entryCommon = ["src/{index,main}.{ts,tsx}", "**/*.{test,test-d,spec}.ts", "vitest.config.mjs", ".eslintrc.cjs"];

const ignoreCommonDeps = ["@mansur-gabidullin/config-prettier", "@mansur-gabidullin/config-typescript"];

const ignoreCommonBins = ["prettier", "tsc", "vitest"];

export default {
    $schema: "https://unpkg.com/knip@5/schema.json",
    workspaces: {
        ".": {
            ignoreDependencies: [...ignoreCommonDeps, "@commitlint/cli", "cz-conventional-changelog"],
            entry: ["scripts/gen-commit/bin.mjs", "vitest.config.mjs", ".eslintrc.cjs"],
            project: projectPatterns,
        },
        "packages/config/*": {
            entry: ["*.{cts,mts,json}"],
            project: projectPatterns,
        },
        "packages/*/*": {
            ignoreDependencies: [...ignoreCommonDeps, "vitest"],
            ignoreBinaries: ["prettier", "eslint", "tsc", "vitest"],
            entry: entryCommon,
            project: projectPatterns,
        },
        "apps/*": {
            ignoreDependencies: [...ignoreCommonDeps, "tailwindcss", "vitest"],
            ignoreBinaries: ignoreCommonBins,
            entry: entryCommon,
            project: projectPatterns,
        },
    },
};
