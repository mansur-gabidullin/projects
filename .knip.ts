const projectPatterns = ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,json}"];

const entryCommon = [
    "src/{index,main}.{ts,tsx}",
    "**/*.{test,test-d,spec}.{ts,tsx}",
    "*.{ts,mjs,cjs}",
    ".*.{ts,mjs,cjs}",
];

const ignoreCommonDeps = ["@mansur-gabidullin/config-typescript"];

const ignoreCommonBins = ["prettier", "tsc", "vite", "vitest"];

const ignoreRootDevToolingDeps = [
    "@mansur-gabidullin/config-vite",
    "@mansur-gabidullin/config-vitest",
    "@mansur-gabidullin/config-eslint",
    "@mansur-gabidullin/config-prettier",
    "@commitlint/cli",
    "@commitlint/config-conventional",
    "cz-conventional-changelog",
];

export default {
    $schema: "https://unpkg.com/knip@5/schema.json",

    workspaces: {
        ".": {
            entry: [".*.{ts,mjs,cjs,json}", "scripts/**/*.mjs"],
            project: projectPatterns,
            ignoreDependencies: [...ignoreCommonDeps, ...ignoreRootDevToolingDeps],
        },

        "packages/config/*": {
            entry: ["*.{cts,mts,json}", ".*.{ts,mjs,cjs,json}"],
            project: projectPatterns,
        },

        "packages/*/*": {
            entry: entryCommon,
            project: projectPatterns,
            ignoreDependencies: [...ignoreCommonDeps, "vitest"],
            ignoreBinaries: [...ignoreCommonBins, "eslint"],
        },

        "apps/*": {
            entry: [
                "src/app/*.{ts,tsx}",
                "**/*.{test,test-d,spec}.{ts,tsx}",
                "*.{ts,mjs,cjs,json}",
                ".*.{ts,mjs,cjs,json}",
            ],
            project: projectPatterns,
            ignoreDependencies: [...ignoreCommonDeps, "tailwindcss", "@mansur-gabidullin/config-prettier"],
            ignoreBinaries: ignoreCommonBins,
        },
    },
};
