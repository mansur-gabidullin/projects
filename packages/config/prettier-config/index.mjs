/**
 * Prettier config to ensure consistency regardless of EditorConfig.
 * See: https://prettier.io/docs/en/configuration.html#editorconfig
 * @type {import("prettier").Config}
 */
export default {
    endOfLine: "lf",
    tabWidth: 4,
    useTabs: false,
    printWidth: 120,
    semi: true,
    singleQuote: false,
    trailingComma: "all",
    arrowParens: "avoid",
    bracketSpacing: true,
    plugins: ["prettier-plugin-packagejson"],
    overrides: [
        {
            files: ["*.json", "*.yml", "*.yaml"],
            options: {
                tabWidth: 4,
                printWidth: 120,
            },
        },
    ],
};
