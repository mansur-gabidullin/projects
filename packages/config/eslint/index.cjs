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
    rules: {
        "prettier/prettier": "error",
        "import/order": [
            "warn",
            {
                groups: [["builtin", "external"], "internal", ["parent", "sibling", "index"]],
                alphabetize: { order: "asc", caseInsensitive: true },
                "newlines-between": "always",
            },
        ],
        "unused-imports/no-unused-imports": "warn",
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        // "import/no-unresolved": "off",
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
