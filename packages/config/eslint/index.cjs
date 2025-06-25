/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "import", "unused-imports", "prettier"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:prettier/recommended",
    ],
    env: {
        browser: true,
        node: true,
        es2024: true,
    },
    settings: {
        "import/resolver": {
            typescript: {
                project: "./tsconfig.json",
            },
        },
    },
    rules: {
        "prettier/prettier": "error",
        "import/no-cycle": "warn",
        "import/order": [
            "warn",
            {
                groups: [["builtin", "external"], "internal", ["parent", "sibling", "index"]],
                alphabetize: { order: "asc", caseInsensitive: true },
                "newlines-between": "always",
            },
        ],
        "unused-imports/no-unused-imports": "warn",
        "unused-imports/no-unused-vars": [
            "warn",
            { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
        "@typescript-eslint/explicit-module-boundary-types": "off",
    },
    ignorePatterns: ["dist", "node_modules", "*.d.ts"],
    overrides: [
        {
            files: ["*.d.ts"],
            rules: {
                "import/no-unused-modules": "off",
                "@typescript-eslint/no-empty-interface": "off",
            },
        },
    ],
};
