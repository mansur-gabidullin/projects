import baseConfig from "./index.mjs";

/** @type {import("prettier").Config} */
export default {
    ...baseConfig,
    overrides: [
        ...(baseConfig.overrides || []),
        {
            files: ["*.ts", "*.tsx"],
            options: {
                parser: "typescript",
            },
        },
        {
            files: ["*.jsx", "*.tsx"],
            options: {
                bracketSameLine: false,
            },
        },
    ],
};
