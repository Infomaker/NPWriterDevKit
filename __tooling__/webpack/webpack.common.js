const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')

module.exports = () => {
    const entry = './src/index.ts'
    const outputPath = path.join(__dirname, '..', '..', 'dist')

    return {
        entry,
        devtool: 'source-map',
        output: {
            filename: 'index.js',
            path: outputPath
        },
        externals: {
            writer: 'writer',
            substance: 'substance'
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                }
            ]
        },
        optimization: {
            removeEmptyChunks: true,
            mergeDuplicateChunks: true,
            removeAvailableModules: true
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            new ESLintPlugin({
                failOnError: false
            })
        ]
    }

}