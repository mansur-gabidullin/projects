/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [require.resolve("./index.cjs")],
    env: {
        browser: false,
        node: true,
    },
    rules: {
        "@typescript-eslint/explicit-module-boundary-types": ["error"],
    },
};
