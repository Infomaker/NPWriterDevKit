// eslint-disable-next-line
module.exports = {
    'root': true,
    'parser': '@typescript-eslint/parser',
    'env': {
        'browser': true,
        'commonjs': true,
        'node': true
    },
    'plugins': [
        '@typescript-eslint'
    ],
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'rules': {
        'no-console': [2, {allow: ['warn', 'info', 'error', 'assert']}],
        '@typescript-eslint/ban-ts-comment': [2, {'ts-ignore': 'allow-with-description'}],
        '@typescript-eslint/no-explicit-any': 2,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        'indent': [2, 4, {'SwitchCase': 1}],
        'comma-dangle': ['error', 'never']
    }
}
