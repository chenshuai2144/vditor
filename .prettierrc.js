module.exports = {
    printWidth: 80,
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 100,
    proseWrap: 'never',
    tabWidth: 2,
    endOfLine: 'lf',
    overrides: [
        {
            files: 'document.ejs',
            options: {
                parser: 'html',
            },
        },
    ],
    plugins: [require.resolve('prettier-plugin-organize-imports')],
};
