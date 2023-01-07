module.exports = {
    root: true,
    extends: ['@ixth/eslint-config-base'],
    rules: {
        'consistent-return': 'warn',
    },
    overrides: [
        {
            files: ['*.ts'],
            extends: [
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            parserOptions: {
                project: './tsconfig.json',
            },
        },
    ],
    settings: {
        'import/resolver': {
            webpack: {
                config: './webpack.common.js',
            },
        },
    },
};
