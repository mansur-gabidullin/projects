const projectPatterns = ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,json}"];

const entryCommon = [
    "src/{index,main}.{ts,tsx}",
    "**/*.{test,test-d,spec}.{ts,tsx}",
    "*.{ts,mjs,cjs}",
    ".*.{ts,mjs,cjs}",
];

const ignoreCommonDeps = ["@mansur-gabidullin/config-prettier", "@mansur-gabidullin/config-typescript"];

const ignoreCommonBins = ["prettier", "tsc", "vitest"];

export default {
    $schema: "https://unpkg.com/knip@5/schema.json",

    workspaces: {
        ".": {
            entry: [".*.{ts,mjs,cjs}", "scripts/**/*.mjs"],
            project: projectPatterns,
            ignoreDependencies: [
                ...ignoreCommonDeps,
                "@mansur-gabidullin/config-vitest",
                "@commitlint/cli",
                "@commitlint/config-conventional",
                "cz-conventional-changelog",
            ],
        },

        "packages/config/*": {
            entry: ["*.{cts,mts,json}"],
            project: projectPatterns,
        },

        "packages/*/*": {
            entry: entryCommon,
            project: projectPatterns,
            ignoreDependencies: [...ignoreCommonDeps, "vitest"],
            ignoreBinaries: [...ignoreCommonBins, "eslint"],
        },

        "apps/*": {
            entry: entryCommon,
            project: projectPatterns,
            ignoreDependencies: [...ignoreCommonDeps, "tailwindcss", "vitest"],
            ignoreBinaries: ignoreCommonBins,
        },
    },
};
