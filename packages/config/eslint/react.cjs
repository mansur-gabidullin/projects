/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [
        "./index.сjs",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
    ],
    plugins: ["react", "react-hooks", "jsx-a11y"],
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        "react/react-in-jsx-scope": "off", // не нужен для React 17+ или Next.js
        "react/prop-types": "off", // не нужен с TypeScript
    },
};
