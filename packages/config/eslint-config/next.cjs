/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: ["./react.cjs", "next", "next/core-web-vitals"],
    rules: {
        // Здесь можно отключать или переопределять специфичные правила Next.js
        // Пример:
        // "next/no-img-element": "off",
    },
};
