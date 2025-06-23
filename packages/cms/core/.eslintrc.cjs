module.exports = {
    extends: [require.resolve("@mansur-gabidullin/config-eslint")],
    settings: {
        "import/resolver": {
            typescript: {
                project: "./tsconfig.json",
            },
        },
    },
};
