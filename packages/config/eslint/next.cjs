/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [require.resolve("./react.cjs"), "next/typescript", "next/core-web-vitals"],
    rules: {
        // Здесь можно отключать или переопределять специфичные правила Next.js
        // Пример:
        // "next/no-img-element": "off",
    },
};
